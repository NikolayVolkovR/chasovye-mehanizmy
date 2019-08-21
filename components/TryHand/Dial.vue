<template>
    <div class="try-hand__clock">
        <div v-if="clockCase" class="try-hand__case" :style="rootStyle">
            <img :src="clockCase.photo_id[0].src" />
        </div>
        <div v-if="dial" class="try-hand__dial">
            <img :src="dial.photo_id[0].src" />
        </div>
        <div class="try-hand__hand">
            <img :src="handSrc" />
        </div>
        <div class="try-hand__second">
            <img :src="secondSrc" />
        </div>
    </div>
</template>
<script>
    export default {
        created() {

        },
        props: {
            clockCase: Object,
            dial: Object,
            dialColor: String,
            hand: Object,
            second: Object
        },
        computed: {
            rootStyle() {
                return {
                    background: this.dialColor
                }
            },
            handSrc() {
                if (this.hand.photo_try_id.length > 0) {
                    return this.hand.photo_try_id[0].src
                } else {
                    return '/images/common/no_try_photo.png'
                }
            },
            secondSrc() {
                if (this.second.photo_try_id.length > 0) {
                    return this.second.photo_try_id[0].src
                } else if (this.second.photo_big_id.length > 0) {
                    return this.second.photo_big_id[0].src
                }
                else {
                    return '/images/common/no_try_photo.png'
                }
            }
        }
    }
</script>