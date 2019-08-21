<template>
    <figure class="wrap" :style="styles">
        <transition name="fade" mode="out-in">
            <div v-if="!loaded" class="dummy"></div>
            <img v-else :src="src" />
        </transition>
    </figure >
</template>
<script>
    export default {
        created() {
            this.load();
        },
        props: {
            maxWidth: {
                type: Number,
                default: null
            },
            marginTop: {
                type: Number,
                default: null
            },

            src: String
        },
        data() {
            return {
                loaded: false
            }
        },
        computed: {
            styles() {
                let arr = [];

                if (this.maxWidth) {
                    arr.push({maxWidth: this.maxWidth + 'px'})
                }
                if (this.marginTop) {
                    arr.push({marginTop: this.marginTop + 'px'})
                }

                return arr;
            }
        },
        methods: {
            load() {
                let img = new Image();
                img.src = this.src;

                img.addEventListener('load', ()=>{
                    this.loaded = true
                })
            }
        }
    }
</script>
<style scoped lang="stylus">
    .wrap {
        margin: 0 auto;
        text-align: center;

        img {
            width: 100%;
        }
    }
</style>