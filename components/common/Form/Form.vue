<template>
    <form
            @submit.prevent="onSubmit"
            enctype="multipart/form-data"
    >
        <fieldset>
            <app-input
                    v-for="(column, index) in columns"
                    :item="column"
                    :index="index"
                    :key="index"
                    :action="action"
                    :entityName="entityName"
                    :itemIndex="itemIndex"
                    @valid-change="onInputValidChange"
                    @validate-by-unique="onInputValidateByUnique"
                    @delete-photo="onDeletePhoto"
                    @delete-single-photo="onDeleteSinglePhoto"
                    @add-photo="onAddPhoto"
                    @add-single-photo="onAddSinglePhoto"
            ></app-input>
        </fieldset>
        <div class="button-block">
            <button :disabled="!isComplete">{{ submitText }}</button>

            <transition name="errors-fade">
                <div v-if="showErrors" class="errors">
                    <font-awesome-icon
                            icon="exclamation-circle"
                            size="lg"
                    />
                    <div>
                        <div v-for="error in errors" class="form-error">{{ error }}</div>
                    </div>
                </div>
            </transition>
        </div>
    </form>
</template>

<script>
    import AppInput from '../Input/Input.vue'

    export default {
        props: {
            columns: Array,
            item: {
                type: Object,
                default: null
            },
            items: {
                type: Array,
                default: null
            },
            submitText: {
                type: String,
                default: 'Готово'
            },
            action: {
                type: String,
                default: 'create'
            },
            entityName: String,
            itemIndex: Number
        },
        data() {
            return {
                isValid: false,
                hasNewValue: false,
                validationStarted: false
            }
        },
        beforeCreate() {
            let columns = this.$options.propsData.columns,
                item = this.$options.propsData.item,
                action = this.$options.propsData.action;

            for (let column of columns) {
                this.$set(column, 'isValid', false);
                this.$set(column, 'isValidByRequire', false);
                this.$set(column, 'isValidByPattern', false);
                this.$set(column, 'isValidByUnique', false);

                if(column.default === undefined) {
                    let defaultValue = ''

                    if (column.type === 'number') {
                        if (column.float) {
                            if (column.precision) {
                                defaultValue = '0'.toFixed(column.precision)
                            } else {
                                defaultValue = '0.0'
                            }
                        } else {
                            defaultValue = 0
                        }
                    }

                    this.$set(column, 'default', defaultValue);
                }

                if(column.value === undefined) {
                    this.$set(column, 'value', '');
                }

                if (action === 'create') {
                    column.value = column.default
                } else if (action === 'edit') {
                    this.$set(column, 'value', item[column.attribute]);
                    //column.value = item[column.attribute]
                }

                if (column.type === 'number') {
                    this.$set(column, 'isValidByRequire', true);
                    this.$set(column, 'isValidByPattern', true);

                    if (column.float) {
                        if (!column.precision) {
                            column.precision = 1
                        }
                        this.$set(column, 'value', parseFloat(column.value).toFixed(column.precision));
                    } else {
                        if (column.value === undefined) {
                            if (typeof column.min === 'number') {
                               this.$set(column, 'value', column.min);
                           } else {
                               this.$set(column, 'value', 0);
                           }
                        }
                    }
                }
                else if (column.type === 'select') {
                    this.$set(column, 'isValidByRequire', true);
                    this.$set(column, 'isValidByPattern', true);
                    this.$set(column, 'isValidByUnique', true);
                    this.$set(column, 'isValidByUnique', true);
                }
                else if (column.type === 'photo') {
                    this.$set(column, 'isValidByRequire', true);
                    this.$set(column, 'isValidByPattern', true);
                    this.$set(column, 'isValidByUnique', true);
                    this.$set(column, 'isValidByUnique', true);

                    if (action === 'create') {
                        if (!column.value){
                            column.value = []
                        }
                    } else {
                        //column.value = this.$store.getters.itemPhotos(this.entityName)
                    }
                }
                else if (column.type === 'composite') {
                    this.$set(column, 'isValidByPattern', true)
                }
            }
        },
        mounted() {
            if (this.action === 'create') {
                this.validate()
            }
        },
        computed: {
            isComplete() {
                return this.action === 'create' ? this.isValid : this.isValid && this.hasNewValue;
            },
            errors() {
                let errors = [];
                if (this.action !== 'create' && !this.hasNewValue) {
                    errors.push('Значения не изменились. Нет смысла сохранять данные.')
                } else {
                    errors = []
                }
                return errors;
            },
            showErrors() {
                return this.validationStarted && this.errors.length > 0;
            }
        },
        methods: {
            computeCompositeColumns() {
                for (let column of this.columns) {
                    if (column.type === 'composite') {
                        let value = '';
                        for (let part of column.scheme) {
                            if (typeof part === 'object') {
                                if (part.type === 'value') {
                                    if (part.entity) {
                                        let entityName = part.entity,
                                            itemId = this.getColumnValueByOptionsEntity(entityName),
                                            item = this.$store.getters.itemById(entityName, itemId);

                                        if (item) {
                                            value += item[part.attribute]
                                        }
                                    } else {
                                        value += this.getColumnByAttribute(part.attribute).value
                                    }

                                } else if (part.type === 'if') {
                                    let column = this.getColumnByAttribute(part.attribute)
                                    if (column.value) {
                                        value += part.text
                                    }
                                }
                            } else if (typeof part === 'string') {
                                value += part
                            }
                        }

                        this.$set(column, 'value', value);
                        this.$set(column, 'isValidByRequire', column.required ? column.value != '' : true);
                        this.$set(column, 'isValidByUnique', this.isColumnUnique(column));
                        this.$set(column, 'isValid', column.isValidByRequire && column.isValidByUnique);

                        column.oldValue = column.value;
                    }
                }
            },
            getColumnValueByOptionsEntity(entityName) {
                for (let column of this.columns) {
                    if (column.optionsEntity === entityName) {
                        return column.value
                    }
                }
            },
            getColumnByAttribute(attribute) {
                for (let column of this.columns) {
                    if (column.attribute === attribute) {
                        return column;
                    }
                }
                return false;
            },
            validate() {
                this.computeCompositeColumns()
                let count = 0;
                for (let column of this.columns) {
                    if (column.isValid) {
                        count ++;
                    }
                }
                this.isValid = this.columns.length === count;

                if (this.action === 'edit') {
                    this.hasNewValue = this.checkNewValue()
                }

                this.validationStarted = true;
            },
            checkNewValue() {
                for (let column of this.columns) {
                    if (column.type === 'photo'
                        || column.type === 'params-list'
                    ) {
                        continue;
                    }

                    if (column.oldValue != column.value) {
                        return true;
                    }
                }
                return false;
            },
            onInputValidChange() {
                this.validate();
            },
            onInputValidateByUnique({index}) {
                this.validateColumnByUnique(index);
            },
            onSubmit($event) {
                let data = this.getFormData();
                if (this.action === 'create') {
                    this.$emit('submit', data)
                } else if (this.action === 'edit') {
                    this.$emit('submit', {data: data, id: this.item.id})
                }

            },
            onDeletePhoto(photoIndex) {
                this.$emit('delete-photo', photoIndex)
            },
            onDeleteSinglePhoto(attribute) {
                this.$emit('delete-single-photo', attribute)
            },
            onAddPhoto(params) {
                this.$emit('add-photo', params)
            },
            onAddSinglePhoto(params) {
                this.$emit('add-single-photo', params)
            },
            getFormData() {
                let data = {};
                for (let column of this.columns) {
                    if (this.action === 'edit' && column.type === 'photo') {
                        continue;
                    }
                    data[column.attribute] = column.value
                }
                return data;
            },
            isColumnUnique(column) {
                for (let item of this.items) {
                    if (item !== this.item) {
                        if (item[column.attribute] === column.value) {
                            return false;
                        }
                    }
                }

                return true;
            },
            validateColumnByUnique(index) {
                let column = this.columns[index];
                column.isValidByUnique = this.isColumnUnique(column)
            }
        },
        components: {
            AppInput
        }
    }
</script>

<style scoped>
    * {
        outline: none;
        user-select: none;
    }
    fieldset {
        border: none;
        margin: 0;
        padding: 0;
    }
    .button-block {
        display: flex;

    }

    button {
        border: none;
        border-radius: 4px;
        background: #635D56;
        cursor: pointer;
        padding: 14px 28px;
        color: #fff;
        font-size: 16px;
        transition: all 0.3s;
    }
    .errors {
        display: flex;
        margin-left: 20px;
        color: #AF4925;
        font-size: 14px;
    }
    .errors svg {
        margin-right: 10px;
    }

    button:disabled,
    button[disabled] {
        background: #AFA598;
        cursor: default;
    }

    .errors-fade-enter-active {
        transition: all .3s ease;
    }
    .errors-fade-leave-active {
        transition: all .3s ease;
    }
    .errors-fade-enter, .errors-fade-leave-to{
        //transform: translateX(-20px);
        opacity: 0;
    }
</style>