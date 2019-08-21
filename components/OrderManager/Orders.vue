<template>
    <div class="order-manager">
        <div class="order-manager__controls">
            <div class="controls__filters">
                <div class="filters__date-range">
                    <date-picker
                            v-model="filter.dateRange"
                            lang="ru"
                            range
                            :shortcuts="[]"
                            @input="onDateRangeInput"
                    />
                </div>
                <div class="filters__common-status">
                    <select v-model="filter.commonStatus" @change="onCommonStatusChange">
                        <option value="0">В работе</option>
                        <option value="1">Выполненые</option>
                        <option value="2">Не выполненые</option>
                    </select>
                </div>
            </div>

            <paginator
                    v-if="!loading"
                    :limit="paginator.limit"
                    :offset="paginator.offset"
                    :items="orders"
                    @limit-change="onLimitChange"
                    @prev-click="onPrevPageClick"
                    @next-click="onNextPageClick"
                    @page-click="onPageClick"
            />
        </div>
        <div class="order-manager__headers">
            <div class="column id-date">Дата и ID</div>
            <div class="column client">Клиент</div>
            <div class="column products">
                <div class="header">Товары</div>
                <div class="name">Название</div>
                <div class="quantity">шт</div>
                <div class="price">р</div>
            </div>
            <div class="column pay">Оплата</div>
            <div class="column delivery">Доставка<br/>и получатель</div>
        </div>
        <transition name="fade" mode="out-in">
            <div class="order-manager__loading" v-if="loading" key="loading"><font-awesome-icon icon="spinner" spin  size="lg"/></div>
            <div class="order-manager__orders" v-else key="orders">
                <order
                        v-for="order, index in paginator.items"
                        :order="order"
                        :deliveryTypes="deliveryTypes"
                        :index="index"
                        :key="order.id"
                        @get-delivery-types="onGetDeliveryTypes"
                />
            </div>
        </transition>
    </div>
</template>

<script>
    import order from './order.vue';
    import DatePicker from 'vue2-datepicker'
    import IconBase from 'Components/icons/IconBase.vue'
    import Paginator from 'Components/ItemSeller/Paginator.vue'

    export default {
        created() {
            this.getOrders();
        },
        data() {
            return {
                filter: {
                    dateRange: ['', ''],
                    commonStatus: 0
                },
                paginator: {
                    limit: 10,
                    offset: 0,
                    items: null
                }
            }
        },
        computed: {
            orders() {
                return this.$store.getters.orders
            },
            deliveryTypes() {
                let types = this.$store.getters.data('delivery-type')

                if (types) {
                    return types.map(type => {
                        let message = type.pickup ? 'Москва, м. Дмитровская' : '';
                        return {
                            value: type.id,
                            label: type.name,
                            message: message,
                            pickup: type.pickup
                        }
                    })
                }

                return null;
            },
            loading() {
                return this.orders === null;
            }
        },
        watch: {
            orders(value, oldValue) {
                if (value !== null) {
                    this.setPaginatedOrders();
                }
            }
        },
        methods: {
            getOrders() {
                this.$store.dispatch('getOrders', {
                    dateFrom: this.filter.dateRange[0],
                    dateTo: this.filter.dateRange[1],
                    common_status: this.filter.commonStatus
                });
            },
            onGetDeliveryTypes() {
                this.$store.dispatch('getItems',  {entityName: 'delivery-type'})
            },
            onDateRangeInput(value) {
                this.getOrders();
            },
            onCommonStatusChange() {
                this.getOrders();
            },

            //Pagination
            setPaginatedOrders() {
                if (this.paginator.limit === 0) {
                    this.paginator.items = this.orders;
                } else {
                    let arr = [],
                        limit = this.paginator.limit,
                        offset = this.paginator.offset,
                        items = this.orders,
                        innerLimit = offset + limit > items.length
                        ? limit - ((offset + limit) - items.length)
                        : limit;

                    for (let i = offset; i < offset + innerLimit; i++) {
                        arr.push(items[i])
                    }

                    this.paginator.items = arr;
                }
            },
            onLimitChange(value) {
                this.paginator.offset = 0;
                this.paginator.limit = parseInt(value);
                this.setPaginatedOrders();
            },
            onPrevPageClick() {
                this.paginator.offset -= this.paginator.limit;
                this.setPaginatedOrders();
            },
            onNextPageClick() {
                this.paginator.offset += this.paginator.limit;
                this.setPaginatedOrders();
            },
            onPageClick(offset) {
                this.paginator.offset = offset;
                this.setPaginatedOrders();
            },
        },
        components: {
            order,
            DatePicker,
            IconBase,
            Paginator,
        }

    }
</script>

<style lang="stylus">
    button()
        cursor pointer
        transition all .2s
        &:hover
            transform scale(1.1)

    .order-manager {
        position: relative;
        max-width: 1200px;
        select {
            box-sizing: border-box;
            border: solid 1px #494846;
            padding: 7px 5px;
            border-radius: 5px;
        }
        input {
            box-sizing: border-box;
        }
        button {
            cursor: pointer;
            display: block;
            border-radius: 5px;
            background: #635e59;
            color: #f7f2ed;
        //font-family: "Alegreya Sans";
            font-size: 14px;
            text-transform: uppercase;
            border: none;
            padding: 10px 15px;
        }
        .order-manager__controls {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            .controls__filters {
                display: flex;
                .filters__date-range {
                    .mx-datepicker {
                        max-width: 200px;
                        input {
                            padding: 7px 30px 7px 5px;
                            border-radius: 5px;
                            border-color: #aaa;

                        }
                    }
                }
                .filters__common-status {
                    margin: 0 12px;
                    select {
                        color: #555;
                        border-color: #aaa;
                    }
                }
            }
            .paginator {
                margin: 0;
                align-self: flex-end;
                .paginator__prev, .paginator__next {
                    color: #adaba8;
                    svg {
                        color: #adaba8;
                    }
                    &.paginator__next_available, &.paginator__prev_available {
                        color: #494846;
                        svg {
                            color: #494846;
                        }
                        &:hover {
                            color: #7a7977;
                            svg {
                                color: #7a7977;
                            }
                        }
                    }
                }
                .paginator__page {
                    border: solid 1px #494846;
                    color: #4d4d4d;
                    &:hover {
                        background: #efece8;
                    }
                    &.paginator__page_active {
                        background: #494846;
                        color: #cccccc;
                    }
                }
            }
        }
        .order-manager__headers {
            display: flex;
            background: #494846;
            color: #cccccc;
            font-size: 14px;
            font-weight: bold;
            .column {
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 12px;
                box-sizing: border-box;
            }
            .id-date {
                width: 10%;
            }
            .client {
                width: 18.5%;
            }
            .products {
                padding: 12px 0;
                width: 30%;
                flex-wrap: wrap;
                .header {
                    width: 100%;
                    padding-bottom: 6px;
                    border-bottom: solid 1px #ccc;
                    margin-bottom: 6px;
                }
                .name {
                    width: 65%;
                    font-weight: normal;
                    text-align: left;
                    padding-left: 12px;
                    box-sizing: border-box;
                }
                .quantity {
                    width: 25%;
                    font-weight: normal;
                }
                .price {
                    width: 10%;
                    box-sizing: border-box;
                    padding-right: 12px
                    font-weight: normal;
                }
            }
            .pay {
                width: 18.5%;
            }
            .delivery {
                width: 23%;
            }
        }
        .order-manager__loading {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #494846;
            padding: 30px;
        }
        .s-form {
            margin: 30px auto 0;
            .s-form__inputs {
                .s-input, .s-input-file {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                    position: relative;
                    .s-input__label, .s-input-file__label {
                        flex-basis: 20%;
                        text-align: right;
                        margin-top: 9px;
                    }
                    .s-input__input-message, .s-input-file__input-message {
                        flex-basis: 80%;
                        max-width: 200px;
                        padding: 0 10px;
                        input {
                            box-sizing: border-box;
                            width: 100%;
                            padding: 7px 10px;
                            border: solid 1px #3f6b30;
                            border-radius: 5px;
                            font-size: 16px;
                            color: #444;
                        }
                        .s-input__message, .s-input-file__message {
                            margin: 5px 0 20px;
                            font-size: 13px;
                            font-family: "Century Gothic";
                            color: #AF4925;
                        }
                    }
                    .s-input__icon-wrap, .s-input-file__icon-wrap {
                        width: 21px;
                        height: 21px;
                        margin-top: 5px;
                    }
                    .s-input__hint {
                        font-size: 13px;
                        margin-top: 5px;
                    }
                }
            }
            .s-input-file {
                .s-input-file__replacer {
                    box-sizing: border-box;
                    border: solid 1px #777;
                    border-radius: 5px;
                    padding: 10px 10px;
                    text-align: center;
                    background: #eee;
                    cursor: pointer;
                    font-size: 14px;
                    &.s-input-file__replacer_valid {
                        border: solid 1px #3f6b30;
                        background: #ebf4e9;
                    }
                    &.s-input-file__replacer_not-valid {
                        border: solid 1px #AF4925;
                        background: #f2e9e9;
                    }
                }
                .s-input-file__download {
                    margin-top: 10px;
                    svg {
                        color: #567f96;
                        cursor: pointer;
                        transition: all .3s;
                        margin-right: 10px;
                        &:hover {
                            transform: scale(1.1)
                        }
                    }
                }
            }
        }
        .s-form__buttons {
            margin-top: 50px;
            display: flex;
            justify-content: center
            .s-form__button {
                display: block;
                color: #888;
                transition: all .3s;
                margin: 0 20px;
                &.s-form__button_active {
                    background: #639355;
                    color: #fff;
                    cursor: pointer;
                }
            }
            .s-form__cancel-button {
                background: #567f96;
                color: #fff;
                cursor: pointer;
            }
        }
    }


    .edit-delivery {
        position: relative;
        header {
            color: #333333;
            font-family: "Alegreya Sans";
            font-size: 20px;
            text-transform: uppercase;
            text-align: center;
            margin: 50px 0 0;
            font-weight: bold;
            &.soft {
                font-weight: normal;
                text-transform: none;
                font-size: 22px;
            }
            &.sub {
                font-weight: normal;
                text-transform: none;
                font-size: 22px;
                margin-top: 15px;
            }
        }

        .create-delivery__fields, .edit-delivery__fields {
            margin: 20px auto 0;
            position: relative;
            .s-input, .s-select {
                display: flex;
                justify-content: center;
                margin: 10px 0;
                position: relative;
                .s-input__label, .s-select__label {
                    flex-basis: 30%;
                    text-align: right;
                    margin-top: 9px;
                }
                .s-input__input-message, .s-select__input-message {
                    flex-basis: 70%;
                    max-width: 200px;
                    padding: 0 10px;
                    input, select {
                        width: 100%;
                        padding: 7px 10px;
                        border: solid 1px #3f6b30;
                        border-radius: 5px;
                        font-size: 16px;
                        outline: none;
                    }
                    .s-input__hint {
                        font-size: 13px;
                        color: #888;
                    }
                    .s-input__message {
                        margin: 5px 0 20px;
                        font-size: 13px;
                        font-family: "Century Gothic";
                        color: #AF4925;
                    }
                    .s-select__message {
                        margin: 10px 0;
                        font-size: 13px;
                        font-family: "Century Gothic";
                        color: #333;
                    }
                }
                .s-select__input-message {
                    margin-right: 21px;
                }
                .s-input__icon-wrap {
                    width: 21px;
                    height: 21px;
                    margin-top: 5px;
                }
            }
        }
    }


    .fade-enter-active {
        transition: all .3s;
        position: absolute;
    }
    .fade-leave-active {
        transition: all .3s;
        position: absolute;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
        position: absolute;
    }
    .fade-move {
        transition: all .3s;
        position: absolute;
    }


    .fade-slide-enter-active {
        transition: all .3s;
    }
    .fade-slide-leave-active {
        transition: all .3s;
        position: absolute;
    }
    .fade-slide-enter, .fade-slide-leave-to{
        opacity: 0;
        transform: translateY(-20)
    }
    .fade-slide-move {
        transition: all .3s;
    }
</style>