<template>
    <div class="hand-slider noSelect" :style="sliderStyle">
        <div class="hand-slider__arrow-left" @click="onSlideLeft">
            <img src="/images/common/arrow-left.svg" />
        </div>
        <div class="hand-slider__items-wrap" ref="itemsWrap">
            <div class="hand-slider__items" :style="itemsStyle" ref="items">
                <div
                        class="hand-slider__item"
                        :style="itemStyle"
                        v-if="items.length > 1"
                        v-for="item in itemsToRender"
                        :class="item.id === activeItemId ? 'hand-slider__item_active' : ''"
                        @click="onItemClick(item.id)"
                >
                    <div class="demo-hand__photo">
                        <img :src="getPhotoSrc(item)" />
                    </div>
                    <div class="demo-hand__params">
                        <div v-if="item.type.slug === 'hand'">Размер: {{item.length_h}}-{{item.length_m}} мм</div>
                        <div v-else-if="item.type.slug === 'second'">Размер: {{item.length_m}} мм</div>
                        <div>Арт: {{item.article}}</div>
                        <div :class="item.shaftType.name === 'S2' ? 'shaft-s2' : ''">Шток: {{item.shaftType.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hand-slider__arrow-right" @click="onSlideRight">
            <img src="/images/common/arrow-right.svg" />
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            window.addEventListener('resize', this.onResize)
        },
        mounted() {
            setTimeout(()=>{
                this.countParams();
                this.setItemsToRender();
            }, 1000)
        },
        props: {
            activeItemId: Number,
            marginTop: {
                type: Number,
                default: 20
            },
            items: Array,
            step: {
                type: Number,
                default: 3
            }
        },
        data() {
            return {
                width: null,
                elemWidth: null,
                offset: 0,
                itemsMarginLeft: 0,
                animationTimeout: 300,
                itemsTransition: '',
                itemsToRender: [],
                slidingNow: false,
                resizeTimeout: null,
                minElemWidth: 150,
                elemMargin: 20,
                quantity: null
            }
        },
        watch: {
            items(value, oldValue) {
                this.setItemsToRender();
            }
        },
        computed: {
            sliderStyle() {
                return {
                    marginTop: this.marginTop + 'px'
                }
            },
            itemsStyle() {
                return {
                    width: this.width + this.elemWidth + this.elemMargin + 100 + 'px',
                    marginLeft: this.itemsMarginLeft + 'px',
                    transition: this.itemsTransition
                }
            },
            itemStyle() {
                return {
                    width: this.elemWidth + 'px',
                    marginRight: this.elemMargin + 'px'
                }
            }
        },
        methods: {
            getItemClass(id) {
                return id === this.activeItemId ? 'hand-slider__item_active' : '';
            },
            setMinElemWidth() {
                if (window.innerWidth > 700) {
                    this.minElemWidth = 170;
                    this.elemMargin = 20;
                } else if (window.innerWidth > 500) {
                    this.minElemWidth = 110;
                    this.elemMargin = 10;
                } else {
                    this.minElemWidth = 70;
                    this.elemMargin = 8;
                }
            },
            countParams() {
                this.setMinElemWidth();
                if (this.$refs.itemsWrap) {
                    this.width = this.$refs.itemsWrap.clientWidth;
                }
                this.quantity = Math.floor(this.width / this.minElemWidth);

                this.elemWidth = Math.floor(
                    (this.width / this.quantity) - this.elemMargin
                    + this.elemMargin / (this.quantity) - 1
                );
            },
            onSlideRight() {
                if (this.slidingNow) {
                    return false;
                }
                this.slidingNow = true;
                this.enableTransition();
                this.itemsMarginLeft = -(this.elemWidth + this.elemMargin);
                setTimeout(()=>{
                    this.disableTransition();
                    this.itemsMarginLeft = 0;

                    if(this.offset > this.items.length -2) {
                        this.offset = 0
                    } else {
                        this.offset++;
                    }

                    this.setItemsToRender();
                    this.slidingNow = false;
                }, this.animationTimeout)
            },
            onSlideLeft() {
                if (this.slidingNow) {
                    return false;
                }
                this.slidingNow = true;

                if(Math.abs(this.offset) > this.items.length -2) {
                    this.offset = 0
                } else {
                    this.offset--;
                }

                this.setItemsToRender();
                this.itemsMarginLeft = -(this.elemWidth + this.elemMargin);

                setTimeout(()=>{
                    this.enableTransition();
                    this.itemsMarginLeft = 0;

                    setTimeout(()=>{
                        this.disableTransition();
                        this.slidingNow = false;
                    }, this.animationTimeout)
                }, 0)
            },
            enableTransition() {
                this.itemsTransition = 'all .3s'
            },
            disableTransition() {
                this.itemsTransition = ''
            },
            setItemsToRender() {
                let arr = [];
                let limit = this.items.length > this.quantity ? this.quantity : this.items.length;

                for ( let i = 0; i <= limit; i++ ) {
                    let index;

                    if (this.offset >= 0) {
                        index = this.offset + i;

                        if (index > this.items.length - 1) {
                            index = index - this.items.length
                        }
                    } else {
                        index = this.items.length + this.offset + i;

                        if (index > this.items.length - 1) {
                            index = index - this.items.length;
                        }
                    }

                    arr.push(this.items[index])
                }

                this.itemsToRender = arr;
            },
            getPhotoSrc(item) {
                return item.photo_main_id.length > 0 ? item.photo_main_id[0].src : '/images/common/no-hand-photo.png'
            },
            onResize() {
                clearTimeout(this.resizeTimeout);

                this.resizeTimeout = setTimeout(()=>{
                    this.countParams();
                    this.setItemsToRender();
                }, 300);
            },
            onItemClick(id) {
                this.$emit('item-click', id)
            }
        },
        components: {

        }
    }
</script>
<style lang="stylus">
    .hand-slider {
        display: flex;
        box-sizing: border-box;

        .hand-slider__arrow-left, .hand-slider__arrow-right {
            flex-basis: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all .3s;
            &:hover {
                transform: scale(1.08);
            }

            img {
                width: 90%;
            }
            @media only screen and (max-width: 500px) {
                flex-basis: 30px;
            }
        }
        .hand-slider__arrow-left {
            padding-right: 10px;
        }
        .hand-slider__arrow-right {
            padding-left: 10px;
        }

        .hand-slider__items-wrap {
            flex-basis: 100%;
            //width: calc(100% - 110px);
            overflow: hidden;

            .hand-slider__items {
                display: flex;

                .hand-slider__item {
                    border: solid 1px #b3b3b3;
                    border-radius: 5px;
                    box-sizing: border-box;
                    overflow: hidden;
                    min-height: 185px;
                    cursor: pointer;
                    &:hover {
                        border-color: #898079;
                        .demo-hand__params{
                            background: #d6d6d6;
                        }
                    }
                    &.hand-slider__item_active {
                        border-color: #898079;
                        border-width: 2px;

                        .demo-hand__params {
                            background: #898079;
                            color: #fff;
                        }
                    }

                    .demo-hand__photo {
                        padding: 10px;
                        height: 60%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all .3s;
                        img {
                            width: 100%;
                        }
                        @media only screen and (max-width: 700px) {
                            height: 40%;
                            padding: 5px;
                        }
                    }
                    .demo-hand__params {
                        height: 40%;
                        padding: 10px 0;
                        background: #f2f2f2;
                        font-size: 13px;
                        font-family: "Century Gothic";
                        div {
                            padding: 0 10px;
                            &.shaft-s2 {
                                background: #ffdf85;
                            }
                            @media only screen and (max-width: 700px) {
                                padding: 0 5px;
                            }
                        }
                        @media only screen and (max-width: 700px) {
                            height: 60%;
                            font-size: 12px;
                        }
                        @media only screen and (max-width: 500px) {
                            font-size: 10px;
                        }
                    }
                    @media only screen and (max-width: 700px) {
                        min-height: 140px;
                    }
                    @media only screen and (max-width: 500px) {
                        min-height: 120px;
                    }
                }
            }
        }
    }
</style>