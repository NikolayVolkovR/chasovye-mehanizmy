<template>
    <div class="item-editor" @keydown.esc="onCloseModal">
        <button class="create" @click="onCreateClick">
            Создать<icon-base width="14" height="14" iconName="plus-icon">
            <icon-plus /></icon-base>
        </button>
        <table>
            <table-header :columns="columns"></table-header>
            <transition name="items-fade" mode="out-in">
                <div v-if="loading" key="loading">
                    <font-awesome-icon icon="spinner" spin  size="lg"/>
                </div>
                <tbody v-else-if="!items || items.length === 0">
                <tr>
                    <td
                            :colspan="columns.length + 1"
                            class="loading">
                        Нет элементов
                    </td>
                </tr>
                </tbody>
                <tbody v-else key="items">
                    <item
                        v-for="(item, index) in items"
                        :loading="loading"
                        :item="item"
                        :key="index"
                        :index="index"
                        :columns="columns"
                        :actions="actions"
                        :entity-name="entityName"
                        @item-edit-click="onItemEditClick"
                        @item-delete-click="onItemDeleteClick"
                >
                </item>
                </tbody>
            </transition>
        </table>
        <modal
                v-if="showModal"
                :title="formTitle"
                @close="onCloseModal"
        >
            <app-form
                    :columns="columns"
                    :action="formAction"
                    :item="editableItem"
                    :items="items"
                    :submitText="formSubmitText"
                    :entityName="entityName"
                    :itemIndex="editableItemIndex"
                    @submit="onFormSubmit"
                    @delete-photo="onPhotoDelete"
                    @delete-single-photo="onDeleteSinglePhoto"
                    @add-photo="onAddPhoto"
                    @add-single-photo="onAddSinglePhoto"
            ></app-form>
        </modal>
    </div>
</template>
<script>
    import IconBase from '../../components/icons/IconBase.vue'
    import IconPlus from '../../components/icons/plus.vue'

    import Modal from '../common/Modal/modal.vue'
    import TableHeader from './tableHeader.vue'

    import AppForm from '../common/Form/Form.vue'
    import Item from './item.vue'

    export default {
        data() {
            return {
                showModal: false,
                formAction: 'create',
                editableItemIndex: null,
                itemsLoaded: false,
                subItemsLoaded: false
            }
        },
        beforeCreate() {
            let columns = this.$options.propsData.columns;

            let subItems = [],
                viewColumns = [],
                editColumns = [];
            for(let column of columns) {
                if (column.type === 'select' && !column.options ) {
                    if (!column.optionsEntity) {
                        console.log('Не указана сущность для загрузки опций.')
                        return;
                    }
                    subItems.push(column.optionsEntity);
                }
            }

            this.$options.propsData.subItemsEnityNames = subItems;
        },
        created() {
            this.loadItems()
            this.loadItemsForSelectOptions()
        },
        props: {
            titleName: {
                type: String,
                default: ''
            },
            entityName: String,
            columns: Array,
            actions: Array,
            subItemsEnityNames: Array
        },
        computed: {
            items() {
                return this.$store.getters.data(this.entityName)
            },
            subItems() {
                let subItems = [];
                if (Array.isArray(this.subItemsEnityNames)) {
                    for (let entityName of this.subItemsEnityNames) {
                        subItems.push(this.$store.getters.data(entityName))
                    }
                }
                return subItems;
            },
            formTitle() {
                return this.formAction === 'create' ? 'Создать ' + this.titleName : 'Редактировать ' + this.titleName;
            },
            formSubmitText() {
                return this.formAction === 'create' ? 'Создать' : 'Сохранить';
            },
            editableItem() {
                return this.editableItemIndex >= 0 ? this.items[this.editableItemIndex] : null
            },
            loading() {
                return !(this.itemsLoaded && this.subItemsLoaded)
            }
        },
        watch: {
            items(value, oldValue) {
                if (value!== null) {
                    this.itemsLoaded = true
                }
            },
            subItems(value) {
                if (Array.isArray(this.subItemsEnityNames)) {
                    let count = 0;
                    for (let item of this.subItemsEnityNames) {
                        if (item !== null) {
                            count ++
                        }
                    }
                    if (this.subItemsEnityNames.length === count) {
                        this.subItemsLoaded = true;
                    }
                }
            }
        },
        methods: {
            onCreateClick() {
                this.formAction = 'create'
                this.showModal = true
            },
            onItemEditClick({index}) {
                this.editableItemIndex = index
                this.formAction = 'edit'
                //this.setColumnsValues()
                this.showModal = true
            },
            onCloseModal() {
                this.showModal = false
            },
            onFormSubmit(data) {
                if (this.formAction === 'create') {
                    this.createItem(data)
                } else if (this.formAction === 'edit') {
                    this.updateItem({data: data.data, id: data.id})
                }
                this.enableBodyScroll();

            },
            enableBodyScroll() {
                document.body.style.overflowY = 'auto';
            },
            onItemDeleteClick({index}){
                let name = this.items[index].name ? this.items[index].name : ''
                let confirmDeletion = confirm("Удалить " + name + '?');

                if ( confirmDeletion ) {
                    this.$store.dispatch('deleteItem', {entityName: this.entityName, itemId: this.items[index].id});
                }
            },
            onPhotoDelete(photoIndex) {
                let data = {entityName: this.entityName, itemIndex: this.editableItemIndex, photoIndex: photoIndex}
                this.$store.dispatch('deleteItemsPhoto', data)
            },
            onDeleteSinglePhoto(attribute) {
                let data = {entityName: this.entityName, itemIndex: this.editableItemIndex, attribute: attribute}
                this.$store.dispatch('deleteItemSinglePhoto', data)
            },
            onAddPhoto(params) {
                let data = {entityName: this.entityName, itemIndex: this.editableItemIndex, photoParams: params}
                this.$store.dispatch('addItemsPhoto', data)
            },
            onAddSinglePhoto(params) {
                let data = {
                    entityName: this.entityName,
                    itemIndex: this.editableItemIndex,
                    attribute: params.attribute,
                    photoParams: params.photoParams};

                this.$store.dispatch('addItemSinglePhoto', data)
            },
            createItem(data) {
                this.$store.dispatch('createItem', {entityName: this.entityName, data: data})
                this.showModal = false
            },
            updateItem({data, id}) {
                this.$store.dispatch('updateItem', {entityName: this.entityName, data: data, id: id})
                this.showModal = false
            },
            loadItems() {
                this.$store.dispatch('getItems', {entityName: this.entityName});
            },
            loadItemsForSelectOptions() {
                let subItemsCount = 0;
                for(let column of this.columns) {
                    if (column.type === 'select' && !column.options ) {
                        if (!column.optionsEntity) {
                            console.log('Не указана сущность для загрузки опций.')
                            return;
                        }
                        subItemsCount++;
                        this.$store.dispatch('getItems', {entityName: column.optionsEntity});
                    }
                }

                if (subItemsCount === 0) {
                    this.subItemsLoaded = true
                }
            }
        },
        components: {
            TableHeader, Modal, IconBase, IconPlus, AppForm, Item
        }
    }
</script>
<style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    /*.icon img {
        width: 100%;
    }*/

    button.create {
        padding: 8px 16px;
        background: #494846;
        color:#fff;
        border: none;
        border-radius: 5px;
        margin-bottom: 15px;
        font-size: 16px;
        box-shadow: 0 3px 2px #5B5A59;
        cursor: pointer;
        transition: box-shadow 0.2s, background 0.2s, transform 0.2s;
        outline:none;

        display: flex;
        align-items: center;
    }

    button.create:hover {
        box-shadow: 0 2px 2px #494846;
        background: #5B5A59;
        transform: translateY(1px);
    }
    .create svg {
        margin-left: 12px;
    }

    .loading{
        text-align: center;
        padding: 20px;
    }
    .loading svg {
        color: #7F786E;
    }

    .items-fade-enter-active {
        transition: all .3s ease;
    }
    .items-fade-leave-active {
        transition: all .3s ease;
    }
    .items-fade-enter, .items-fade-leave-to{
        opacity: 0;
    }
</style>