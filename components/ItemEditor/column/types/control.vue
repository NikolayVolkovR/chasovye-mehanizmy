<template>
    <td>
        <div class="control">
            <div v-if="actions.includes('edit')" @click="$emit('edit-click')">
                <icon-base width="32"
                           height="32"
                           iconName="Редактировать"
                >
                    <icon-edit />
                </icon-base>
            </div>
            <div v-if="actions.includes('hide')"
                 @click="$emit('hide-show-click')"
                 :class="item.show ? 'hide' : 'show'"
            >
                <icon-base
                        width="32"
                        height="32"
                        :iconName="item.show ? 'Спрятать' : 'Показать'"
                        @click="$emit('hide-click')"
                >
                    <icon-hide v-if="item.show" />
                    <icon-show v-else="!item.show" />
                </icon-base>
            </div>
            <div
                    v-if="actions.includes('delete')"
                    @click="onDeleteClick"
                    :class="deleteClass"
            >
                <icon-base
                        width="32"
                        height="32"
                        :iconName="deleteTitle"
                >
                    <icon-delete />
                </icon-base>
            </div>
        </div>
    </td>
</template>

<script>
    import IconBase from '../../../../components/icons/IconBase.vue'
    import IconEdit from '../../../../components/icons/edit.vue'
    import IconDelete from '../../../../components/icons/delete.vue'
    import IconHide from '../../../../components/icons/hide.vue'
    import IconShow from '../../../../components/icons/show.vue'

    export default {
        props: {
            item: Object,
            actions: Array
        },
        computed: {
            deleteClass() {
                return this.item.actions.delete.allow ? '' : 'disabled';
            },
            deleteTitle() {
                return this.item.actions.delete.allow ? 'Удалить' : this.item.actions.delete.message;
            }
        },
        methods: {
            onDeleteClick() {
                if (this.item.actions.delete.allow) {
                    this.$emit('delete-click')
                }
            }
        },
        components: {
            IconBase, IconEdit, IconDelete, IconHide, IconShow
        }
    }
</script>

<style scoped>
    .control {
        color: #494846;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
        justify-content: center;
    }

    .control svg {
        transition: all 0.3s;
        margin: 5px;
    }
    .control div:hover {
        color: #7A7977;
    }

    .control div.disabled:hover {
        color: #AAA9A7;
    }

    .control div.disabled {
        min-width: 120px;
        color: #AAA9A7;
        cursor: default;
    }

    .show {
        color: #AF4925;
    }
</style>