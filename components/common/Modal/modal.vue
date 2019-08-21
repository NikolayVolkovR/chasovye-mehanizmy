<template>
    <transition name="modal">
        <div class="modal">
            <div class="modal__shadow" :style="shadowStyle"></div>
            <div class="modal__container" @click.self="onCloseClick">
                <div class="modal__window" :class="windowClass">
                    <div class="modal__close" @click="onCloseClick" :class="windowClass">
                        <icon-base width="24" height="24" icon-name="Закрыть"><icon-close /></icon-base>
                    </div>
                    <header>{{ title }}</header>
                    <slot>Контент</slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import IconBase from '../../icons/IconBase.vue'
    import IconClose from '../../icons/close.vue'

    export default {
        created() {
            this.disableBodyScroll();
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            shadowStyle: {
                default: function () {
                    return {background: '#000', opacity: '0.9'}
                },
                type: Object
            },
            mode: {
                type: String,
                default: 'half_width'
            }
        },
        data(){
            return {

            }
        },
        computed: {
            windowClass() {
                return this.mode;
            }
        },
        methods: {
            onCloseClick() {
                this.enableBodyScroll();
                this.$emit('close');
            },
            disableBodyScroll() {
                document.body.style.overflowY = 'hidden';
            },
            enableBodyScroll() {
                document.body.style.overflowY = 'auto';
            }
        },
        components: {
            IconBase, IconClose
        }
    }
</script>
<style scoped lang="stylus">
    * {
        box-sizing: border-box;
    }

    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999999;
    }
    .modal__shadow {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
    }
    .modal__container {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        cursor: pointer;

        align-items: center;
        align-content: center;
        justify-content: center;
        overflow: auto;

        transition: all .3s ease;
    }
    .modal__window {
        background: #fff;
        position: relative;
        padding: 40px;
        cursor: default;
        overflow: auto;

        &.half_width {
            width: 50vw;
            max-height: 90vh;
            @media only screen and (min-width:1000px) {
                width: 600px;
            }
            @media only screen and (max-width: 780px) {
                width:70vw;
            }
            @media only screen and (max-width: 650px) {
                width:80vw;
            }
            @media only screen and (max-width: 480px) {
                width:90vw;
            }
        }
        &.full_screen {
            width: 98vw;
            max-height: 98vh;
        }
        &.try_hand {
            width: 96vw;
            max-height: 98vh;
        }
    }
    .modal__close {
        position: absolute;
        right: 20px;
        top: 20px;
        color: #494846;
        cursor: pointer;
        transition: all 0.3s;
        &.try_hand {
            position: fixed;
            right: 30px;
        }
    }
    .modal__close:hover {
        color: #605F5D;
        transform: scale(1.4);
    }

    header{
        font-size: 24px;
        color: #494846;
        text-transform: uppercase;
        margin-bottom: 20px;
        padding-right: 40px;
    }



    .modal-enter-active, .modal-leave-active {
        position: absolute;
        transition: all .3s ease;
    }
    .modal-enter, .modal-leave-to{
        opacity: 0;
    }

    .modal-leave-active .modal__container {
        transform: translateY(-40px);
    }

</style>