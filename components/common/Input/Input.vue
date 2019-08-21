<template>
    <label v-if="item.type === 'text' && show">
        {{ item.label }} <span v-if="item.required" class="required">*</span>
        <transition name="icon-slide" mode="out-in">
            <span v-if="showIcon" :key="iconClass">
                <font-awesome-icon
                        :icon="iconName"
                        :class="iconClass"
                        size="lg"

                />
                <span v-if="showErrorMessage" class="error-message">{{ errorMessage }}</span>
            </span>
        </transition>
        <input
                :name="item.attribute"
                :value="item.value"
                :maxlength="item.maxLength"
                :class="className"
                @blur="onBlur($event)"
                @input="onInput($event)"
        />
    </label>
    <label v-else-if="item.type === 'textarea'">
        {{ item.label }} <span v-if="item.required" class="required">*</span>
        <transition name="icon-slide" mode="out-in">
            <span v-if="showIcon" :key="iconClass">
                <font-awesome-icon
                        :icon="iconName"
                        :class="iconClass"
                        size="lg"

                />
                <span v-if="showErrorMessage" class="error-message">{{ errorMessage }}</span>
            </span>
        </transition>
        <textarea
                :name="item.attribute"
                :value="item.value"
                :class="className"
                @blur="onBlur($event)"
                @input="onInput($event)"
        >
        </textarea>
    </label>
    <label v-else-if="item.type === 'number'">
        {{ item.label }} <span v-if="item.required" class="required">*</span>
        <transition name="icon-slide" mode="out-in">
            <span v-if="showIcon" :key="iconClass">
                <font-awesome-icon
                        :icon="iconName"
                        :class="iconClass"
                        size="lg"

                />
                <span v-if="showErrorMessage" class="error-message">{{ errorMessage }}</span>
            </span>
        </transition>
        <input-number
                :item="item"
                @valid-change="onNumberChange">

        </input-number>
    </label>
    <label v-else-if="item.type === 'select'">
        {{ item.label }} <span v-if="item.required" class="required">*</span>
        <transition name="icon-slide" mode="out-in">
            <span v-if="showIcon" :key="iconClass">
                <font-awesome-icon
                        :icon="iconName"
                        :class="iconClass"
                        size="lg"

                />
                <span v-if="showErrorMessage" class="error-message">{{ errorMessage }}</span>
            </span>
        </transition>
        <input-select
                :item="item"
                :action="action"
                @valid-change="onSelectChange">
        </input-select>
    </label>
    <input-photo
            v-else-if="item.type === 'photo'"
            :item="item"
            :action="action"
            :entityName="entityName"
            :itemIndex="itemIndex"
            @value-change="onPhotoChange"
            @delete-photo="onDeletePhoto"
            @delete-single-photo="onDeleteSinglePhoto"
            @add-photo="onAddPhoto"
            @add-single-photo="onAddSinglePhoto"
    ></input-photo>
    <checkbox
            v-else-if="item.type === 'checkbox'"
            :item="item"
            :disabled="false"
            @valid-change="onCheckboxValidChange"
    >
    </checkbox>
    <label v-else-if="item.type === 'composite'">
        {{ item.label }} <span v-if="item.required" class="required">*</span>
        <transition name="icon-slide" mode="out-in">
            <span v-if="showIcon" :key="iconClass">
                <font-awesome-icon
                        :icon="iconName"
                        :class="iconClass"
                        size="lg"

                />
                <span v-if="showErrorMessage" class="error-message">{{ errorMessage }}</span>
            </span>
        </transition>
        <input
                :name="item.attribute"
                :value="item.value"
                :maxlength="item.maxLength"
                :class="className"
                disabled="disabled"
        />
    </label>

</template>

<script>
    import InputNumber from './types/number.vue'
    import InputSelect from './types/select.vue'
    import InputPhoto from './types/photo/photo.vue'
    import Checkbox from './types/checkbox.vue'

    export default {
        props: {
            item: Object,
            index: Number,
            action: String,
            entityName: String,
            itemIndex: Number
        },
        data() {
            return {
                isValidationStarted: false,
                isValidByRequire: false,
                isValidByPattern: false,
                isValid: false
            }
        },
        created() {
            if (this.item.type === 'composite') {
                this.isValidationStarted = true;
            }
            this.validate()
            this.item.oldValue = this.item.value; // Фиксируем первоначальное значение. Перенести в форму?
        },
        computed: {
            className() {
                if (this.isValidationStarted) {
                    return this.item.isValid ? 'success' : 'error';
                }

                return '';
            },
            showIcon() {
                return this.isValidationStarted;
            },
            iconName() {
                return this.item.isValid ? 'check-circle' : 'exclamation-circle'
            },
            iconClass() {
                return this.item.isValid ? 'success-icon' : 'error-icon'
            },
            errorMessage() {
                if (!this.item.isValidByRequire) {
                    return 'Обязательное поле';
                } else if (!this.item.isValidByPattern) {
                    return this.item.patternMessage;
                } else if (!this.item.isValidByUnique) {
                    return 'Значение должно быть уникальным';
                }
            },
            showErrorMessage() {
                return this.isValidationStarted && !this.item.isValid;
            },
            show() {
                return true;
                //return !!this.item.editOnly
            }
        },
        methods: {
            onBlur(event) {
                if (!this.isValidationStarted) {
                    this.isValidationStarted = true;
                    this.handleValidation()
                }
            },
            onInput(event) {
                let value = event.target.value;
                this.item.value = value;
                if (this.isValidationStarted) {
                    this.handleValidation();
                }
            },
            onNumberChange() {
                this.isValidationStarted = true;
                this.validate();
                this.$emit('valid-change')
            },
            onSelectChange() {
                /*this.isValidationStarted = true;
                this.validate();*/
                this.$emit('valid-change')
            },
            onCheckboxValidChange() {
                this.$emit('valid-change')
            },
            onPhotoChange(images) {
                this.$emit('valid-change')
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
            handleValidation() {
                let oldIsValid = this.item.isValid;
                this.validate();
                if ((oldIsValid !== this.item.isValid) || this.action === 'edit') {
                    this.$emit('valid-change')
                }
            },
            validate() {
                if (this.item.type === 'number') {
                    this.validateByUnique();
                } else {
                    this.validateByRequire();

                    if (this.item.isValidByRequire) {
                        this.validateByPattern();
                    }

                    if (this.item.isValidByPattern) {
                        this.validateByUnique();
                    }
                }

                if (this.item.isValidByRequire
                    && this.item.isValidByPattern
                    && this.item.isValidByUnique
                ) {
                    this.item.isValid = true;
                } else {
                    this.item.isValid = false;
                }
            },
            validateByRequire() {
                this.item.isValidByRequire = this.item.required ? this.item.value != '' : true;
            },
            validateByPattern() {
                this.item.isValidByPattern = this.item.pattern ? this.item.pattern.test(this.item.value) : true;
            },
            validateByUnique() {
                if (this.item.unique) {
                    this.$emit('validate-by-unique', {index: this.index});
                } else {
                    this.item.isValidByUnique = true
                }
            }
        },
        components: {
            InputNumber, InputSelect, InputPhoto, Checkbox
        }
    }
</script>

<style scoped>
    * {
        outline: none;
        box-sizing: border-box;
    }

    label {
        display: block;
        margin-bottom: 21px;
        font-weight: bold;
        color: #635D56;
    }

    input, textarea {
        display: block;
        margin-top: 7px;
        padding: 7px 14px;
        border-radius: 4px;
        border: solid 1px #AFA598;
        font-size: 14px;
        width: 100%;
        min-width: 250px;
        transition: all 0.3s;
    }

    input:focus, textarea:focus {
        border-color: #605B55;
    }

    input.success, textarea.success {
        border-color: #41AD27;
    }

    input.error, textarea.error {
        border-color: #AF4925;
    }

    .success-icon {
        color: #41AD27;
    }

    .error-icon {
        color: #AF4925;
    }
    .error-message {
        font-size: 14px;
        font-weight: normal;
        color: #AF4925;
    }

    .required {
        color: #999;
        font-weight: normal;
    }

    .icon-slide-enter-active {
        display: inline-block;
        transition: all .3s ease;
    }
    .icon-slide-leave-active {
        display: inline-block;
        transition: all .3s ease;
    }
    .icon-slide-enter, .icon-slide-leave-to{
        transform: translateX(-20px);
        opacity: 0;
    }
</style>
