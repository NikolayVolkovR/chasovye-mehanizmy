<template>
    <div
            class="thumb"
    >
        <div class="delete-photo" @click="onDeletePhotoClick($event, index)">
            <icon-base width="24" height="24" iconName="Удалить фото">
                <icon-close />
            </icon-base>
        </div>
        <img :src="image.src" :class="image.orientation"/>
    </div>
</template>
<script>
    import IconBase from '../../../../icons/IconBase.vue'
    import IconClose from '../../../../icons/close.vue'

    export default {
        props: {
            image: Object,
            index: Number
        },
        methods: {
            onDeletePhotoClick($event, index) {
                this.$emit('delete-photo', index)
            }
        },
        components: {
            IconBase, IconClose
        }
    }
</script>

<style scoped>
    .thumb {
        width: 100px;
        height: 100px;
        border: solid 2px #AFA598;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
    }
    .thumb img.vertical {
        width: 100%;
    }
    .thumb img.horizontal {
        height: 100%;
    }

    .delete-photo {
        position: absolute;
        top: 5px;
        right: 2px;
        background: #fff;
        width: 32px;
        height: 32px;
        border-radius: 5px;
        color: #AFA598;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>