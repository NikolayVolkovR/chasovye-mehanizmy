<template>
    <div class="root">
        <transition name="fade" mode="out-in">
            <div class="thumbs" v-if="!loading" key="thumbs">
                <div class="label">{{ item.label }}</div>
                <draggable
                        v-model="photos"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                >
                    <transition-group :name="!drag ? 'flip-list' : null">
                        <thumb
                                v-for="(photo, index) in photos"
                                :key="action === 'create' ? photo.name : photo.id"
                                :image="photo"
                                :index="index"
                                @delete-photo="onDeletePhotoClick"
                        ></thumb>
                    </transition-group>
                </draggable>
                <transition name="thumb-appear">
                    <label class="photo" v-if="showAddPhotoButton">
                        <icon-base width="60" height="60" iconName="Добавить фото">
                            <icon-add-photo />
                        </icon-base>
                        <input
                                type="file"
                                hidden="hidden"
                                @change="onInputChange"
                                accept="image/x-png,image/gif,image/jpeg"
                                :multiple="multiple"
                        >
                    </label>
                </transition>
            </div>
            <div
                    v-else class="loading"
                    key="loading"
            >
                <font-awesome-icon icon="spinner" spin  size="lg"/>
            </div>
        </transition>
    </div>
</template>
<script>
    import IconBase from '../../../../icons/IconBase.vue'
    import IconAddPhoto from '../../../../icons/addPhoto.vue'
    import Thumb from './thumb.vue';
    import draggable from 'vuedraggable'

    export default {
        props:{
            item: Object,
            action: String,
            entityName: String,
            itemIndex: Number
        },
        data() {
            return {
                drag: false
            }
        },
        computed: {
            multiple() {
                if (this.action === 'edit') {
                    return false;
                }
                return !this.item.photosQuantity || this.item.photosQuantity > 1
            },
            showAddPhotoButton() {
                let quantity = this.item.photosQuantity,
                    length = this.photos.length;

                return !quantity || quantity > length;
                /* показывать кнопку если количество фото не ограничено
                * или не превышено
                */
            },
            photos: {
                get() {
                    if (this.action === 'create') {
                        return this.item.value;
                    } else if (this.action === 'edit') {
                        if (this.item.single) {
                            return this.$store.getters.itemSinglePhoto(
                                this.entityName, this.itemIndex, this.item.attribute)
                        } else {
                            return this.$store.getters.itemPhotos(this.entityName, this.itemIndex)
                        }
                    }
                },
                set(value) {
                    if (this.action === 'create') {
                        value = this.setSort(value);
                        this.item.value = value;
                    } else if (this.action === 'edit') {
                        if (this.item.single) {

                        } else {
                            this.$store.dispatch('sortItemPhotos', {
                                entityName: this.entityName,
                                itemIndex: this.itemIndex,
                                photos: value
                            })
                        }
                    }

                }
            },
            loading() {
                if (this.action === 'create') {
                    return false;
                }

                return !(!!this.photos);
            },
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        },
        methods: {
            onInputChange($event) {
                let input = $event.target;

                if (this.item.single) {
                    this.handleSetSinglePhoto(input.files[0])
                } else if (input.files && input.files.length > 0) {
                    this.handleAddPhotos(input.files)
                }
            },
            handleSetSinglePhoto(file) {
                let reader = new FileReader();

                reader.onload = (event) => {
                    let image = new Image(),
                        src = event.target.result;

                    image.src = src;

                    image.onload = () => {
                        this.addPhoto({
                            name: file.name,
                            extension: file.name.split('.').pop().toLowerCase(),
                            src: src,
                            sort: 0,
                            orientation: image.width >= image.height ? 'horizontal' : 'vertical'
                        })
                    };
                };

                reader.readAsDataURL(file);
            },
            handleAddPhotos(files) {
                for (let i = 0; i < files.length/*&& i < this.item.photosQuantity*/; i++) {

                    let file = files[i],
                        reader = new FileReader();

                    reader.onload = (event) => {
                        let image = new Image(),
                            src = event.target.result;

                        image.src = src;

                        image.onload = () => {
                            this.addPhoto({
                                name: file.name,
                                extension: file.name.split('.').pop().toLowerCase(),
                                src: src,
                                sort: i,
                                orientation: image.width >= image.height ? 'horizontal' : 'vertical'
                            })
                        };
                    };

                    reader.readAsDataURL(file);
                }
            },
            addPhoto(params) {
                if (this.item.value.length === this.item.photosQuantity) {
                    return false;
                }

                if (this.action === 'create') {
                    if (this.checkPhotoExists(params.name)) {
                        return false;
                    }
                    this.item.value.push(params);

                    this.$emit('value-change');
                } else {
                    if (this.item.single) {
                        this.$emit('add-single-photo', {
                            photoParams: params,
                            attribute: this.item.attribute
                        })
                    } else {
                        this.$emit('add-photo', params)
                    }
                }

            },
            checkPhotoExists(photoName) {
                for (let image of this.item.value) {
                    if (image.name === photoName) {
                        return true
                    }
                }
                return false;
            },
            onDeletePhotoClick(index) {
                if (this.action === 'create') {
                    this.item.value.splice(index, 1)
                    this.$emit('value-change');
                } else {
                    if (this.item.single) {
                        this.$emit('delete-single-photo', this.item.attribute)
                    } else {
                        this.$emit('delete-photo', index)
                    }
                }
            },
            setSort(photos) {
                for (let i = 0; i < photos.length; i++) {
                    photos[i].sort = i;
                }

                return photos;
            }
        },
        components: {
            IconBase, IconAddPhoto, Thumb, draggable
        }
    }
</script>
<style scoped>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 114px;
    }
    .loading svg {
        color: #7F786E;
    }

    .root {
        margin-bottom: 11px;
    }
    .photo {
        border: solid 2px #AFA598;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        cursor: pointer;
        transition: all 0.3s;
        color: #AFA598;
        margin-bottom: 10px;
    }
    .label {
        font-weight: bold;
        color: #635D56;
        flex-basis: 100%;
        margin-bottom: 7px;
    }

    .photo:hover {
        background: #F7EADF;
    }

    .thumbs {
        display: flex;
        flex-wrap: wrap;
        position: relative;
    }

    .thumbs span {
        display: flex;
        flex-wrap: wrap;
    }

    .thumb-appear-enter-active {
        display: inline-block;
        transition: all .3s ease;
    }
    .thumb-appear-leave-active {
        display: inline-block;
        transition: all .3s ease;
    }
    .thumb-appear-enter, .thumb-appear-leave-to{
        opacity: 0;
    }

    .fade-enter-active {
        transition: all .3s ease;
    }
    .fade-leave-active {
        transition: all .3s ease;
    }
    .fade-enter, .thumb-appear-leave-to{
        opacity: 0;
    }

    .flip-list-move {
        transition: transform 0.5s;
    }

</style>