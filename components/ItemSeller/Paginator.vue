<template>
    <div class="paginator">
        <div class="paginator__main">
            <div
                    class="paginator__prev"
                    :class="prevIsAvailable ? 'paginator__prev_available' : ''"
                    @click="onPrevClick"
            >
                <icon-base width="26" height="26" iconName="Предыдущая">
                    <icon-left />
                </icon-base>
                Предыдущая
            </div>

            <transition-group
                    name="slide-right"
                    tag="div"
                    class="paginator__pages"
                    :style="pagesStyle"
                    ref="pages"
            >
                <div
                        class="paginator__page"
                        v-for="page, index in pages"
                        :class="page.value === activePage ? 'paginator__page_active' : ''"
                        @click="onPageClick(page.offset)"
                        :key="page.key"
                >
                    {{ page.value }}
                    <icon-base
                            v-if="page.type === 'hidden'"
                            class="paginator__page-icon-down"
                            width="7"
                            height="7"
                            iconName=""
                    >
                        <icon-down />
                    </icon-base>
                </div>
            </transition-group>

            <div
                    class="paginator__next"
                    :class="nextIsAvailable ? 'paginator__next_available' : ''"
                    @click="onNextClick">
                Следующая
                <icon-base width="26" height="26" iconName="Следующая">
                    <icon-right />
                </icon-base>
            </div>
        </div>
        <div class="paginator__settings">
            Показывать по
            <select :value="limit" @change="onLimitChange">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="0">все</option>
            </select>
        </div>
    </div>
</template>

<script>
    import IconBase from 'Components/icons/IconBase.vue'
    import IconLeft from 'Components/icons/arrowLeft2.vue'
    import IconRight from 'Components/icons/arrowRight2.vue'
    import IconDown from 'Components/icons/arrowDown.vue'

    export default {
        data() {
            return {
                pageWidth: 26
            }
        },
        props: {
            limit: {
                type: Number,
                default: 10
            },
            offset: {
                type: Number,
                default: 0
            },
            items: Array
        },
        computed: {
            pagesCount() {
                return this.limit === 0
                    ? 1
                    : Math.ceil(this.items.length / this.limit);
            },
            hiddenPagesCount() {
                if (this.pagesCount > 4) {
                    return this.pagesCount - 3
                } else {
                    return null
                }
            },
            pages() {
                if (this.limit === 0 || this.items.length === 0) {
                    return [{
                        type: 'page',
                        offset: 0,
                        value: 1,
                        key: 1
                    }]
                } else {
                    let iFrom;

                    if (this.offset === 0) {
                        iFrom = this.offset / this.limit + 1
                    } else if (!this.nextIsAvailable && this.pagesCount > 2) {
                        iFrom = this.offset / this.limit - 1
                    } else {
                        iFrom = this.offset / this.limit
                    }
                    let iTo = this.pagesCount > 3 ? iFrom + 3 :  iFrom + this.pagesCount;

                    let pages = [];

                    for (let i = iFrom; i < iTo; i++) {
                        let offset = i * this.limit - this.limit;

                        pages.push({
                            type: 'page',
                            offset: offset,
                            value: i,
                            key: i
                        })
                    }

                    if (pages[0].value > 1) {
                        pages.unshift({
                            type: 'ellipsis',
                            offset: null,
                            value: '...',
                            key: 'min'
                        })
                    }

                    if (pages[pages.length - 1].value !== this.pagesCount) {
                        pages.push({
                            type: 'ellipsis',
                            offset: null,
                            value: '...',
                            key: 'max'
                        })
                    }

                    return pages;
                }
            },
            activePage() {
                return this.offset > 0 ? this.offset / this.limit + 1 : 1;
            },
            nextIsAvailable() {
                return this.offset + this.limit < this.items.length && this.limit > 0;
            },
            prevIsAvailable() {
                return this.offset > 0
            },
            pagesStyle() {
                return {
                    width: (this.pageWidth + 3) * this.pages.length + 6 + 'px'
                }
            }
        },
        methods: {
            onLimitChange($event) {
                this.$emit('limit-change', $event.target.value)
            },
            onNextClick() {
                if (this.nextIsAvailable) {
                    this.$emit('next-click');
                }
            },
            onPrevClick() {
                if (this.prevIsAvailable) {
                    this.$emit('prev-click');
                }
            },
            onPageClick(offset) {
                if (offset !== null) {
                    this.$emit('page-click', offset)
                }
            }
        },
        components: {
            IconBase,
            IconLeft,
            IconRight,
            IconDown
        }
    }
</script>

<style lang="stylus">
    .paginator {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
        box-sizing: border-box;

        @media only screen and (max-width:650px) {
            flex-direction: column;
            align-items: flex-end;
        }
        .paginator__main {
            display: flex;
            margin: 0 10px;
            justify-content space-around;
            align-self: center;

            .paginator__prev, .paginator__next {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #c1b6a7;
                font-family: "Century Gothic";
                font-size: 14px;
                transition: all .3s;
                cursor: default;
                svg {
                    color: #dbcfbd;
                }

                &.paginator__next_available, &.paginator__prev_available {
                    color: #938a7d;
                    cursor: pointer;
                    &:hover {
                        color: #b7ac9e;
                        svg {
                            color: #b7ac9e;
                        }
                    }
                    svg {
                        color: #938a7d;
                        transition: all .3s;
                    }
                }
                @media only screen and (max-width:440px) {
                    order: 2;
                    flex-basis: 45%;
                }
            }
            .paginator__pages {
                display: flex;
                align-items: center;
                margin: 0 10px;
                transition: all .3s;
                position: relative;
                justify-content: center;

                .paginator__page {
                    padding: 3px 0;
                    width: 26px;
                    border: solid 1px #938a7d;
                    border-radius: 5px;
                    color: #938a7d;
                    font-family: "Century Gothic";
                    font-size: 14px;
                    min-width: 26px;
                    text-align: center;
                    margin: 0 2px;
                    cursor: pointer;
                    position: relative;
                    //transition: all .3s;

                    &:hover {
                        background: #fcf3e8;
                    }
                    &.paginator__page_active {
                        background: #938a7d;
                        color: #efe1cb;
                        cursor: default;
                    }
                    .paginator__page-icon-down {
                        position: absolute;
                        right: 3px;
                        top: 3px;
                    }
                }

                @media only screen and (max-width:440px) {
                    order: 1;
                    flex-basis: 100%;
                }
            }

            @media only screen and (max-width:650px) {
                margin: 10px 0 0 0;
                order: 2;
            }
            @media only screen and (max-width:440px) {
                flex-wrap: wrap;
            }
        }
        .paginator__settings {
            font-family: "Century Gothic";
            font-size: 14px;
            color: #938a7d;

            select {
                margin-left: 5px;
                padding: 3px;
                border: solid 1px #938a7d;
                border-radius: 5px;
                color: #938a7d;
                font-family: "Century Gothic";
                font-size: 14px;

                option {
                    color: #938a7d;
                }
            }

            @media only screen and (max-width:650px) {
                order: 1;
            }
        }
    }
</style>