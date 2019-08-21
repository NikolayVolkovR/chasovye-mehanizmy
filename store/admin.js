import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

import CamelToKebab from '../helpers/camelToKebab'

Vue.use(Vuex);

axios.defaults.baseURL = getCorsBaseUrl();
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'include';
axios.defaults.responseType = 'json';
axios.defaults.withCredentials = true;

export const store = new Vuex.Store({
    state: {
        menuItems : [
            {
                label: "Заказы",
                url: "/orders"
            },
            {
                label: "Товары",
                items: [
                    {
                        label: "Механизмы",
                        items: [
                            {
                                label: "Модели",
                                url: "/movements"
                            },
                            {
                                label: "Типы",
                                url: "/movement-types"
                            },
                            {
                                label: "Серии",
                                url: "/movement-series"
                            },
                            {
                                label: "Типы хода",
                                url: "/stroke-types"
                            },
                            {
                                label: "Шумность",
                                url: "/noisines-types"
                            }
                        ]
                    },
                    {
                        label: "Стрелки",
                        items: [
                            {
                                label: "Часовая и минутная",
                                url: "/hands/hands"
                            },
                            {
                                label: "Секундная",
                                url: "/hands/seconds"
                            },
                            {
                                label: "Типы",
                                url: "/hands/types"
                            },
                            {
                                label: "Цвета",
                                url: "/hands/colors"
                            },{
                                label: "Материалы",
                                url: "/hands/materials"
                            },{
                                label: "Профили",
                                url: "/hands/profiles"
                            },{
                                label: "Формы",
                                url: "/hands/forms"
                            }
                        ]
                    },
                    {
                        label: "Крепёж",
                        items: [
                            {
                                label: "Модели",
                                url: "/fastener/fasteners"
                            },
                            {
                                label: "Типы",
                                url: "/fastener/types"
                            },
                        ]
                    },
                    {
                        label: "Накладные знаки",
                        items: [
                            {
                                label: "Модели",
                                url: "/sign/signs"
                            },
                            {
                                label: "Типы",
                                url: "/sign/types"
                            }
                        ]
                    },
                    {
                        label: "Капсулы",
                        items: [
                            {
                                label: "Модели",
                                url: "/capsule/capsules"
                            },
                            {
                                label: "Циферблаты",
                                url: "/capsule/dials"
                            }
                        ]
                    },
                    {
                        label: "Штоки",
                        items: [
                            {
                                label: "Модели",
                                url: "/shafts"
                            },
                            {
                                label: "Типы",
                                url: "/shaft-types"
                            }
                        ]
                    },
                    {
                        label: "Производители",
                        url: "/brands"
                    }
                ]
            },
            {
                label: "Примерка стрелок",
                items: [
                    {
                        label: "Корпуса",
                        url: "/clock-cases"
                    },
                    {
                        label: "Циферблаты",
                        url: "/clock-dials"
                    }
                ]
            },
            {
                label: "Пользователи",
                url: "/users"
            },
            {
                label: "Доставка",
                items: [
                    {
                        label: 'Типы',
                        url: "/delyvery-types"
                    }
                ]
            }
        ],
        items: {}
    },
    getters: {
        menuItems(state) {
            return state.menuItems;
        },
        data(state) {
            return entityName => {
                let dataName = entityName + 's';
                if(!state.items.hasOwnProperty(dataName)) {
                    store.commit('setItems', {entityName: dataName, data: null})
                }
                return state.items[dataName];
            }
        },
        item(state) {
            return (entityName, itemIndex) => {
                let dataName = entityName + 's';
                return state.items[dataName][itemIndex];
            }
        },
        itemById(state) {
            return (entityName, id) => {
                let dataName = entityName + 's',
                    items = state.items[dataName];

                if (Array.isArray(items)) {
                    for (let item of items) {
                        if (item.id == id) {
                            return item
                        }
                    }
                }
            }
        },
        itemSinglePhoto(state) {
            return (entityName, itemIndex, attribute) => {
                let dataName = entityName + 's';
                return state.items[dataName][itemIndex][attribute];
            }
        },
        itemPhotos(state) {
            return (entityName, itemIndex) => {
                let dataName = entityName + 's';
                return state.items[dataName][itemIndex].photos;
            }
        },
        itemNameById(state) {
            return (entityName, id) => {
                let dataName = entityName + 's',
                    items = state.items[dataName];

                if (Array.isArray(items)) {
                    for (let item of items) {
                        if (item.id == id) {
                            return item.name
                        }
                    }
                }
            }
        },
        orders(state) {
            return state.orders ? state.orders : null
        }
    },
    mutations: {
        setItems(state, {entityName, data}) {
            let dataName = entityName + 's';
            Vue.set(state.items, dataName, data);
        },
        setItem(state,{entityName, itemIndex, data}) {
            let dataName = entityName + 's';
            Vue.set(state.items[dataName], itemIndex, data);
        },
        setItemPhotos(state, {entityName, itemIndex, photos}) {
            let dataName = entityName + 's';
            //state.items[dataName][itemIndex]['photos'] = photos;
            Vue.set(state.items[dataName][itemIndex], 'photos', photos);
        },
        setOrders(state, {orders}) {
            Vue.set(state, 'orders', orders);
        },
        handleError(state, {error}) {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //console.log(1, error.response.data);
                console.log(1, error.response.data.message);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(2, error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(3, 'Error', error.message);
            }
            //console.log(error.config);
        },
        setOrder(state, {orderIndex, order}) {
            Vue.set(state.orders, orderIndex, order)
        },
        setOrderParam(state, {orderIndex, param, value}) {
            Vue.set(state.orders[orderIndex], param, value)
        },
        deleteOrder(state, {orderIndex}) {
            state.orders.splice(orderIndex, 1);
        }
    },
    actions: {
        createItem(store, {entityName, data}) {
            let url = '/' + CamelToKebab(entityName),
                itemsBuffer = JSON.parse(JSON.stringify(store.getters.data(entityName)));

            store.commit('setItems', {entityName: entityName, data: null})

            axios.post(url, {
                data: data
            })
                .then(response => {
                    store.commit('setItems', {entityName: entityName, data: response.data})
                })
                .catch(error => {
                    store.commit('setItems', {entityName: entityName, data: itemsBuffer})
                    store.commit('handleError', {error: error})
                });
        },
        updateItem(store, {entityName, data, id}) {
            let url = '/' + CamelToKebab(entityName),
                itemsBuffer = JSON.parse(JSON.stringify(store.getters.data(entityName)));

            store.commit('setItems', {entityName: entityName, data: null})

            axios.put(url, {
                id: id,
                data: data
            })
                .then(response => {
                    store.commit('setItems', {entityName: entityName, data: response.data})
                })
                .catch(error => {
                    store.commit('setItems', {entityName: entityName, data: itemsBuffer})
                    store.commit('handleError', {error: error})
                });
        },
        getItems(store, {entityName}) {
            let url = '/' + CamelToKebab(entityName);
            axios.get(url)
                .then(response => {
                    store.commit('setItems', {entityName: entityName, data: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        deleteItem(store, {entityName, itemId}) {
            let url = '/' + CamelToKebab(entityName),
                itemsBuffer = JSON.parse(JSON.stringify(store.getters.data(entityName)))

            store.commit('setItems', {entityName: entityName, data: null})
            axios({
                method: 'DELETE',
                url: url,
                data: {id: itemId},
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.commit('setItems', {entityName: entityName, data: response.data})
            }).catch(error => {
                store.commit('setItems', {entityName: entityName, data: itemsBuffer})
                store.commit('handleError', {error: error})
            });
        },
        deleteItemsPhoto(store, {entityName, itemIndex, photoIndex}) {
            let url = '/' + CamelToKebab(entityName) + '/photo',
                item = store.getters.data(entityName)[itemIndex],
                photo = item.photos[photoIndex];

            store.commit('setItemPhotos', {
                entityName: entityName,itemIndex: itemIndex, photos: null
            })

            axios({
                method: 'DELETE',
                url: url,
                data: {id: item.id, photo_id: photo.id},
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.commit('setItemPhotos', {entityName: entityName,itemIndex: itemIndex, photos: response.data})
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        deleteItemSinglePhoto(store, {entityName, itemIndex, attribute}) {
            let url = '/' + CamelToKebab(entityName) + '/single-photo',
                item = store.getters.data(entityName)[itemIndex];

            axios({
                method: 'DELETE',
                url: url,
                data: {id: item.id, attribute: attribute},
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.commit('setItem', {entityName: entityName,itemIndex: itemIndex, data: response.data})
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        addItemsPhoto(store, {entityName, itemIndex, photoParams}) {
            let url = '/' + CamelToKebab(entityName) + '/photo',
                item = store.getters.data(entityName)[itemIndex];

            store.commit('setItemPhotos', {
                entityName: entityName,itemIndex: itemIndex, photos: null
            })

            axios({
                method: 'POST',
                url: url,
                data: {id: item.id, photo_params: photoParams},
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.commit('setItemPhotos', {entityName: entityName,itemIndex: itemIndex, photos: response.data})
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        addItemSinglePhoto(store, {entityName, itemIndex, attribute, photoParams}) {
            let url = '/' + CamelToKebab(entityName) + '/single-photo',
                item = store.getters.data(entityName)[itemIndex];

            axios({
                method: 'POST',
                url: url,
                data: {
                    id: item.id,
                    attribute: attribute,
                    photoParams: photoParams
                },
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.commit('setItem', {
                    entityName: entityName,
                    itemIndex: itemIndex,
                    data: response.data
                })
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        sortItemPhotos(store, {entityName, itemIndex, photos}) {
            let url = '/' + CamelToKebab(entityName) + '/photo/sort',
                item = store.getters.data(entityName)[itemIndex],
                sortedPhotos = [];

            for (let i = 0; i < photos.length; i++) {
                let photo = photos[i],
                    sortedPhoto = {
                        id: photo.id,
                        name: photo.name,
                        src: photo.src,
                        description: photo.description,
                        sort: i,
                        orientation: photo.orientation
                    }
                sortedPhotos.push(sortedPhoto)
            }

            store.commit('setItemPhotos', {
                entityName: entityName,
                itemIndex: itemIndex,
                photos: sortedPhotos
            })

            axios({
                method: 'PUT',
                url: url,
                data: {id: item.id, photos: sortedPhotos},
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.commit('setItemPhotos', {
                    entityName: entityName,itemIndex: itemIndex, photos: response.data
                })
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        hideItem(store, {entityName, itemId, itemIndex}) {
            let url = '/' + CamelToKebab(entityName) + '/' + itemId + '/hide';

            axios.put(url, {
                id: itemId
            })
                .then(response => {
                    store.commit('setItem', {entityName: entityName, itemIndex: itemIndex, data: response.data})
                    //store.commit('setItems', {entityName: entityName, data: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        showItem(store, {entityName, itemId, itemIndex}) {
            let url = '/' + CamelToKebab(entityName) + '/' + itemId + '/show';

            axios.put(url, {
                id: itemId
            })
                .then(response => {
                    store.commit('setItem', {entityName: entityName, itemIndex: itemIndex, data: response.data})
                    //store.commit('setItems', {entityName: entityName, data: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },

        getOrders(store, {dateFrom, dateTo, common_status}) {
            store.commit('setOrders', {orders: null})

            const url = '/order'
            axios.get(url, {params: {
                dateFrom,
                dateTo,
                common_status
            }})
                .then(response => {
                    store.commit('setOrders', {orders: response.data})
                })
                .catch(error => {
                    store.commit('setItems', {entityName: entityName, data: itemsBuffer})
                    store.commit('handleError', {error: error})
                });
        },
        orderPayStatusChange(store, {value, id, orderIndex}) {
            const url = '/order/pay-status'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {value, id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderDeliveryStatusChange(store, {value, id, orderIndex}) {
            const url = '/order/delivery-status'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {value, id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderInvoiceChange(store, {value, id, orderIndex}) {
            const url = '/order/invoice'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {value, id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderPaymentChange(store, {value, id, orderIndex}) {
            const url = '/order/payment'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {value, id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        reservePlus(store, {id, index}) {
            const url = '/order/reserve-plus'
            store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: true})
            axios.put(url, {id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: index, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        reserveReset(store, {id, index}) {
            const url = '/order/reserve-reset'
            store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: true})
            axios.put(url, {id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: index, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        reserveSet(store, {id, index}) {
            const url = '/order/reserve-set'
            store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: true})
            axios.put(url, {id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: index, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        editCustomerFromOrder(store, {form, entityName, itemId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            let formData = new FormData();
            for (let field of form) {
                if ((field.value || field.value == 0)
                    &&
                    !(field.name === 'details_file' && typeof field.value !== 'object')
                ) {
                    formData.append(field.name, field.value);
                }
            }

            let url = '/' + CamelToKebab(entityName) + '/update';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                    store.commit('setOrderParam', {orderIndex: orderIndex, param: 'customer', value: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        editDeliveryFromOrder(store, {fields, itemId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            let formData = new FormData();
            formData.append('id', itemId);
            for (let field of fields) {
                if (field.value || field.value == 0) {
                    formData.append(field.name, field.value);
                }
            }

            let url = '/delivery/update';
            axios.post(url, formData)
                .then(response => {
                    store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                    store.commit('setOrderParam', {orderIndex: orderIndex, param: 'delivery', value: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        editRecipientFromOrder(store, {form, entityName, itemId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            let formData = new FormData();
            for (let field of form) {
                if ((field.value || field.value == 0)
                    &&
                    !(field.name === 'details_file' && typeof field.value !== 'object')
                ) {
                    formData.append(field.name, field.value);
                }
            }

            let url = '/' + CamelToKebab(entityName) + '/update';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                    store.commit('setOrderParam', {orderIndex: orderIndex, param: 'recipient', value: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderSetDeliveryScheduled(store, {orderIndex, orderId, value}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            let url = '/order/delivery-scheduled';
            axios.put(url, {id: orderId, value: value})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderDeliveryNumberChange(store, {value, id, orderIndex}) {
            const url = '/order/delivery-number'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {value, id})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderAddProduct(store, {entityName, itemId, quantity, orderId, orderIndex}) {
            const url = '/order/product-add'
            axios.put(url, {
                orderId: orderId,
                entity: entityName,
                productId: itemId,
                quantity: quantity
            })
                .then(response => {
                    //console.log(response.data)
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderRemoveProduct(store, {orderId, orderIndex, productIndex}) {
            const url = '/order/product-remove'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {orderId, productIndex})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderEditProduct(store, {orderId, orderIndex, productIndex, productQuantity, productPrice}) {
            const url = '/order/product-edit'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {orderId, productIndex, productQuantity, productPrice})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderSendNotice(store, {orderId, orderIndex, noticeType}) {
            const url = '/order/notice'
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            axios.put(url, {orderId, orderIndex, noticeType})
                .then(response => {
                    store.commit('setOrder', {orderIndex: orderIndex, order: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderSetFinished(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            const url = '/order/set-finished'
            axios.put(url, {orderId})
                .then(response => {
                    store.commit('deleteOrder', {orderIndex: orderIndex});
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderSetActive(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            const url = '/order/set-active'
            axios.put(url, {orderId})
                .then(response => {
                    store.commit('deleteOrder', {orderIndex: orderIndex});
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderSetUnfinished(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            const url = '/order/set-unfinished'
            axios.put(url, {orderId})
                .then(response => {
                    store.commit('deleteOrder', {orderIndex: orderIndex});
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        orderDelete(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            const url = '/order'
            axios({
                method: 'DELETE',
                url: url,
                data: {orderId: orderId},
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    store.commit('deleteOrder', {orderIndex: orderIndex});
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
    },
    strict: process.env.NODE_ENV !== 'production'
});

function getCorsBaseUrl() {
    if (location.hostname.indexOf('movements.ru') > 0) {
        return 'http://api.movements.ru';
    } else {
        return 'http://dev-api.chasovye-mehanizmy.ru';
    }


    /* else if (location.hostname.indexOf('dev-admin') > 0) {
        console.log('dev-api.chasovye-mehanizmy.ru')
        return 'http://dev-api.chasovye-mehanizmy.ru';
    } else if (location.hostname.indexOf('admin.chasovye-mehanizmy.ru') > 0) {
        console.log('api.chasovye-mehanizmy.ru')
        return 'http://api.chasovye-mehanizmy.ru';
    }*/

}