<template>
    <svg    @mouseenter="startAnim"
            @mouseleave="enableAnim"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
    >
        <rect ref="leftRect" x="-4.2" y="11.23" width="32.39" height="1.55" transform="translate(-4.97 12) rotate(-45)"/>
        <rect ref="rightRect" x="11.23" y="-4.2" width="1.55" height="32.39" transform="translate(-4.97 12) rotate(-45)"/>
    </svg>
</template>

<script>
    import { TweenMax, Sine } from 'gsap'
    export default {
        data() {
            return {
                animEnabled: true
            }
        },
        methods: {
            startAnim() {
                if (this.animEnabled){
                    this.rotateAnim(this.$refs.leftRect, 15)
                    this.rotateAnim(this.$refs.rightRect, -15)
                    this.animEnabled = false
                }
            },
            rotateAnim(el, rot) {
                TweenMax.to(el, 0.25, {
                    rotation: rot,
                    repeat: 1,
                    yoyo: true,
                    svgOrigin: '12 12',
                    ease: Sine.easeInOut
                })
            },
            enableAnim() {
                //this.animEnabled = true
            }
        }
    }
</script>