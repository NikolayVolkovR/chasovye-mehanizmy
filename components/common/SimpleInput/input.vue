<template>
    <div>
        <input
                type="text"
                ref="input"
                :placeholder="placeholder"
                @keyup="onKeyup"
                class="my-input"
                :class="inputClass"
        />
        <font-awesome-icon
                :icon="iconName"
                :class="iconClass"
                size="lg"

        />
    </div>
</template>
<script>
    export default {
        props: {
            mode: {
                type: String,
                default: 'string'
            }
        },
        data() {
            return {
                isValid: false
            }
        },
        computed: {
            placeholder() {
                if (this.mode === 'email') {
                    return 'email'
                }
                return '';
            },
            inputClass() {
                return this.isValid ? 'my-input_valid' : '';
            },
            iconName() {
                return this.isValid ? 'check-circle' : 'exclamation-circle'
            },
            iconClass() {
                return this.isValid ? 'success-icon' : 'error-icon'
            },
        },
        methods: {
            onKeyup() {
                this.validate()
            },
            validate() {
                if (this.mode === 'email') {
                    this.validateEmail();
                }
            },
            validateEmail() {
                let value = this.$refs.input.value;
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (re.test(value)) {
                    this.isValid = true;
                    this.$emit('isValid');
                } else {
                    this.isValid = false;
                    this.$emit('not-isValid');
                }

            }
        }
    }
</script>
<style lang="stylus">
    my-input {
        outline: none;
        transition: all .3s;

        &.my-input_valid {
            border: solid 1px #3f6b30;
            background: #ebf4e9;
        }

        .success-icon {
            color: #41AD27;
        }

        .error-icon {
            color: #AF4925;
        }
    }
</style>