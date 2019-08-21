<template>
    <div
            class="range"
            ref="range"
            @mouseleave="onMouseleave"
            @mousedown.prevent="onMousedown"
            @touchstart.prevent="onMousedown"
            @mousemove="onMousemove"
            @touchmove="onMousemove"
            @mouseup="onMouseup"
            @touchend="onMouseup"
    >
        <div class="range__line"></div>
        <div
                class="range__line-active"
                :style="lineActiveStyle"
        ></div>
        <div
                class="range__from slider"
                :style="fromStyle"
                ref="fromSlider"
        ></div>
        <div
                class="range__to slider"
                :style="toStyle"
                ref="toSlider"
        ></div>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.setSystemParams();
            this.setLineActiveStyle();
            this.setFromStyle();
            this.setToStyle();

            window.addEventListener('resize', this.onResize)
        },
        props: {
            min: Number,
            max: Number,
            from: Number,
            to: Number
        },
        data() {
            return {
                fromStyle: {
                    left: 0
                },
                toStyle: {
                    left: 0
                },
                lineActiveStyle: {
                    left: 0,
                    width: 0
                },
                fromIsMoving: false,
                toIsMoving: false,
                shiftX: null,
                pointsInPixel: null,
                pixelsInPoint: null,
                sliderWidth: null,
                rangeWidth: null,
                rangePixels: null,
                rangePoints: null,
                rangeCoords: null,
                resizeTimeout: null
            }
        },
        watch: {
            from() {
                this.setFromStyle();
                this.setLineActiveStyle();
            },
            to() {
                this.setToStyle();
                this.setLineActiveStyle();
            }
        },
        methods: {
            setSystemParams() {
                this.sliderWidth = this.$refs.fromSlider.offsetWidth;
                this.rangePoints = this.max - this.min;
                this.rangeWidth = this.$refs.range.clientWidth;
                this.rangePixels = this.rangeWidth - (this.sliderWidth * 2);

                this.pointsInPixel =  this.rangePoints / this.rangePixels;
                this.pixelsInPoint =  this.rangePixels / this.rangePoints;
                this.rangeCoords =  this.$refs.range.getBoundingClientRect();


            },
            setFromStyle() {
                this.fromStyle = {
                    left:  Math.round(this.pixelsInPoint * (this.from - this.min)) + 'px'
                }
            },
            setToStyle() {
                let value = Math.round(this.pixelsInPoint * (this.to - this.min)) + this.sliderWidth;
                this.toStyle = {
                    left: value + 'px'
                }
            },
            setLineActiveStyle() {
                this.lineActiveStyle.width = Math.round(this.pixelsInPoint * (this.to - this.from)) + 'px';
                this.lineActiveStyle.left =
                    Math.round(this.pixelsInPoint * (this.from - this.min))
                        + this.sliderWidth
                        + 'px';
            },

            onMousedown($event) {
                const target = $event.target;
                const clientX = $event.type === 'touchstart' ? $event.touches[0].clientX : $event.clientX;

                if (target === this.$refs.fromSlider) {
                    this.fromIsMoving = true;
                    this.shiftX = clientX - target.getBoundingClientRect().left;
                } else if (target === this.$refs.toSlider) {
                    this.toIsMoving = true;
                    this.shiftX = clientX - target.getBoundingClientRect().left;
                }
            },
            onMousemove($event) {
                const clientX = $event.type === 'touchmove' ? $event.touches[0].clientX : $event.clientX;
                const xCoord = clientX - this.rangeCoords.left - this.shiftX;

                if (this.fromIsMoving) {
                    const coordMin = 0;
                    const coordMax = parseInt(this.toStyle.left) - (this.sliderWidth + 2);

                    if (xCoord >= coordMin && xCoord <= coordMax) {
                        const movedBy = parseInt(xCoord * this.pointsInPixel);
                        this.$emit('from-move', movedBy)
                    }
                } else if (this.toIsMoving) {
                    const coordMax = this.rangePixels + this.sliderWidth;
                    const coordMin = parseInt(this.fromStyle.left) + 4;

                    if (xCoord <= coordMax && xCoord >= coordMin) {
                        const movedBy = parseInt((xCoord - this.sliderWidth) * this.pointsInPixel);
                        this.$emit('to-move', movedBy)
                    }
                }
            },
            onMouseup() {
                this.fromIsMoving = false;
                this.toIsMoving = false;
            },
            onMouseleave() {
                this.fromIsMoving = false;
                this.toIsMoving = false;
            },

            onResize() {
                if (!this.$refs.range) {
                    return false;
                }
                clearTimeout(this.resizeTimeout);

                this.resizeTimeout = setTimeout(()=>{
                    this.setSystemParams();
                    this.setFromStyle();
                    this.setToStyle();
                    this.setLineActiveStyle();
                }, 500);
            }
        }
    }
</script>
<style scoped lang="stylus">
    .range {
        margin: 20px 0;
        position: relative;
        height: 26px;

        .range__line {
            position: absolute;
            top: 10px;
            width: 100%;
            height: 6px;
            background: #cccccc;
        }
        .range__line-active {
            position: absolute;
            left: 0;
            top: 10px;
            height: 6px;
            background: #e89e0c;
            //transition: all .1s;
        }
        .slider {
            width: 10px
            background: #e89e0c;
            border: solid 1px #fff;
            height: 26px;
            position: absolute;
            top: 0px;
            cursor: pointer;
            //box-shadow: 0 1px 1px #b2760b;
            transition:transform .1s, background .3s;

            @media only screen and (max-width: 700px) {
                width: 20px;
            }
            &:hover {
                background: #f2ad3d;
                box-shadow: 0 1px 1px #bf7f0c;
                transform: scale(1.2);
            }
        }
    }
</style>