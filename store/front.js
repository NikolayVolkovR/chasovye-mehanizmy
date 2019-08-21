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
        items: {},
        cart: null
    },
    getters: {
        items(state) {
            return entityName => {
                let dataName = entityName + 's';
                if(!state.items.hasOwnProperty(dataName)) {
                    store.commit('setItems', {entityName: dataName, data: null})
                }
                return state.items[dataName];
            }
        },
        matchingSeconds(state) {
            return length => {
                if (state.items.handForSales) {
                    let arr = []

                    for (let hand of state.items.handForSales) {
                        if (hand.type.slug === 'second' &&
                            (hand.length_m >= length - 5 && hand.length_m <= length + 5))
                        {
                            let index = arrayContainsHand(arr, hand);

                            if (index !== false) {
                                let arrIndex = arr[index];

                                if (Array.isArray(arrIndex)) {
                                    arrIndex.push(hand)
                                } else {
                                    const buffer = JSON.parse(JSON.stringify(arrIndex));
                                    arr[index] = [];
                                    arr[index].push(buffer);
                                    arr[index].push(hand)
                                }
                            } else {
                                arr.push([hand])
                            }
                        }
                    }

                    return arr;
                } else {
                    //store.dispatch('getMatchingHands', {length})
                }
            }
        },
        cart(state) {
            return state.cart;
        },
        userStatus(state) {
            return state.userStatus ? state.userStatus : null
        },
        userCustomers(state) {
            return state.userCustomers ? state.userCustomers : null
        },
        userDeliveries(state) {
            return state.userDeliveries ? state.userDeliveries : null
        },
        deliveryTypes(state) {
            return state.deliveryTypes ? state.deliveryTypes : null
        },
        userOrdersQuantity(state) {
            return state.userOrdersQuantity ? state.userOrdersQuantity : null
        },
        userActiveOrdersQuantity(state) {
            return state.userActiveOrdersQuantity ? state.userActiveOrdersQuantity : null
        },
        standardFastenerId(state) {
            return state.standardFastenerId ? state.standardFastenerId : null
        }
    },
    mutations: {
        setItems(state, {entityName, data}) {
            let dataName = entityName + 's';
            Vue.set(state.items, dataName, data);
        },
        setItemParam(state, {entityName, itemId, paramName, value}) {
            const dataName = entityName + 'ForSales';
            const items = state.items[dataName];
            if (items) {
                const itemIndex = items.findIndex(item=>item.id === itemId);
                Vue.set(state.items[dataName][itemIndex], paramName, value);
            }
        },
        setCartItemParam(state, {entityName, itemId, paramName, value}) {
            let itemIndex = state.cart[entityName].findIndex(item => item.id === itemId)
            Vue.set(state.cart[entityName][itemIndex], paramName, value);
        },
        setCart(state, {data}) {
            Vue.set(state, 'cart', data)
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
        setUserStatus(state, status) {
            Vue.set(state, 'userStatus', status);
        },
        setUserCustomers(state, customers) {
            Vue.set(state, 'userCustomers', customers);
        },
        setDeliveryTypes(state, deliveryTypes) {
            Vue.set(state, 'deliveryTypes', deliveryTypes);
        },
        setUserDeliveries(state, deliveries) {
            Vue.set(state, 'userDeliveries', deliveries);
        },
        setUserOrdersQuantity(state, quantity) {
            Vue.set(state, 'userOrdersQuantity', quantity);
        },
        setUserActiveOrdersQuantity(state, quantity) {
            Vue.set(state, 'userActiveOrdersQuantity', quantity);
        },
        setStandardFastenerId(state, id) {
            Vue.set(state, 'standardFastenerId', id);
        }
    },
    actions: {
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
        getCart(store) {
            axios.get('/cart/items')
                .then(response => {
                    store.commit('setCart', {data: response.data})
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        addToCart(store, {entityName, itemId, quantity}) {
            store.commit('setItemParam',{
                entityName: entityName,
                itemId: itemId,
                paramName: 'loading',
                value: true,
            });

            const url = '/cart/add'
            axios.post(url, {
                entityName: entityName,
                itemId: itemId,
                quantity: quantity
            }).then(response => {
                const inCart = response.data
                store.commit('setItemParam',{
                    entityName: entityName,
                    itemId: itemId,
                    paramName: 'cart',
                    value: inCart,
                })
                store.commit('setItemParam',{
                    entityName: entityName,
                    itemId: itemId,
                    paramName: 'loading',
                    value: false,
                })
                store.dispatch('getCartQuantity');
            }).catch(error => {
                //store.commit('setItems', {entityName: entityName, data: itemsBuffer})
                store.commit('handleError', {error: error})
            });
        },
        saveCartQuantity(store, {entityName, itemId, quantity}) {
            store.commit('setCartItemParam',{
                entityName: entityName,
                itemId: itemId,
                paramName: 'loading',
                value: true,
            });
            const url = '/cart/set'
            axios.post(url, {
                entityName: entityName,
                itemId: itemId,
                quantity: quantity
            }).then(response => {
                const inCart = response.data
                store.commit('setCartItemParam',{
                    entityName: entityName,
                    itemId: itemId,
                    paramName: 'cart',
                    value: inCart,
                })
                store.commit('setCartItemParam',{
                    entityName: entityName,
                    itemId: itemId,
                    paramName: 'loading',
                    value: false,
                });

                if (entityName === 'movement') {
                    store.dispatch('setStandatdFastener');
                } else {
                    store.dispatch('getCartQuantity');
                }

            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        removeCartItem(store, {entityName, itemId}) {
            store.commit('setCartItemParam',{
                entityName: entityName,
                itemId: itemId,
                paramName: 'loading',
                value: true,
            });

            axios.post('/cart/remove', {
                entityName: entityName,
                itemId: itemId
            }).then(response => {
                if (entityName === 'movement') {
                    store.dispatch('setStandatdFastener')
                }
            }).then(()=>{
                store.dispatch('getCart');
                store.dispatch('getCartQuantity');
            }).catch(error => {
                //store.commit('setItems', {entityName: entityName, data: itemsBuffer})
                store.commit('handleError', {error: error})
            });
        },
        clearCart(store) {
            const url = '/cart/clear'
            axios.post(url).then(response => {
                store.dispatch('getCart');
                store.dispatch('getCartQuantity');
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        getCartQuantity(store) {
            axios.get('/cart/quantity')
                .then((response) => {
                    refreshCart(response.data)
                })
        },
        getMatchingHands(store, {length}) {
            console.log(length)
        },
        getUserStatus(store) {
            let url = '/user/status';
            store.commit('setUserStatus', null)
            axios.get(url)
                .then(response => {
                    store.commit('setUserStatus', response.data.status)
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        getUserCustomers(store) {
            const url = '/customer';
            store.commit('setUserCustomers', null)
            axios.get(url)
                .then(response => {
                    store.commit('setUserCustomers', response.data)
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        getDeliveryTypes(store) {
            const url = '/delivery-type';
            store.commit('setDeliveryTypes', null)
            axios.get(url)
                .then(response => {
                    store.commit('setDeliveryTypes', response.data)
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        customerCreate(store, {form, entityName}) {
            store.commit('setUserCustomers', null)

            let formData = new FormData();
            for (let field of form) {
                if (field.value || field.value == 0) {
                    formData.append(field.name, field.value);
                }
            }

            let url = '/' + CamelToKebab(entityName);
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                store.dispatch('getUserCustomers');
            })
            .catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        customerEdit(store, {form, entityName, itemId}) {
            store.commit('setUserCustomers', null)

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
                    store.dispatch('getUserCustomers');
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        customerDelete(store, {entityName, itemId}) {
            store.commit('setUserCustomers', null)

            let url = '/' + CamelToKebab(entityName)

            store.commit('setItems', {entityName: entityName, data: null})
            axios({
                method: 'DELETE',
                url: url,
                data: {id: itemId},
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.dispatch('getUserCustomers');
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        getUserDeliveries(store) {
            const url = '/delivery';
            store.commit('setUserDeliveries', null)
            axios.get(url)
                .then(response => {
                    store.commit('setUserDeliveries', response.data)
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        deliveryCreate(store, fields) {
            store.commit('setUserDeliveries', null)
            
            let formData = new FormData();
            for (let field of fields) {
                if (field.value || field.value == 0) {
                    formData.append(field.name, field.value);
                }
            }

            let url = '/delivery';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                store.dispatch('getUserDeliveries');
            })
            .catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        deliveryUpdate(store, {itemId, fields}) {
            store.commit('setUserDeliveries', null)

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
                store.dispatch('getUserDeliveries');
            })
            .catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        deliveryDelete(store, {itemId}) {
            store.commit('setUserDeliveries', null)

            let url = '/delivery';

            axios({
                method: 'DELETE',
                url: url,
                data: {id: itemId},
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                store.dispatch('getUserDeliveries');
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        saveIndividualPassport(store, {itemId, value}) {
            let url = '/individual/passport';

            axios.put(url, {itemId, value})
            .then(response => {
                store.dispatch('getUserCustomers');
            })
            .catch(error => {
                store.commit('handleError', {error: error})
            });
        },
        makeOrder(store, data) {
            const url = '/order';
            axios.post(url, data)
                .then(response => {
                    this.dispatch('getUserOrdersQuantity')
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                })
        },
        getUserOrdersQuantity(store) {
            const url = '/order/quantity';
            store.commit('setUserOrdersQuantity', null)
            axios.get(url)
                .then(response => {
                    store.commit('setUserOrdersQuantity', response.data)
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        getUserActiveOrdersQuantity(store) {
            const url = '/order/active-quantity';
            store.commit('setUserActiveOrdersQuantity', null)
            axios.get(url)
                .then(response => {
                    store.commit('setUserActiveOrdersQuantity', response.data)
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        getStandardFastenerId(store) {
            const url = '/fastener/standard-id';
            store.commit('setStandardFastenerId', null)
            axios.get(url)
                .then(response => {
                    store.commit('setStandardFastenerId', response.data)
                })
                .catch(error => {
                    store.commit('handleError', {error: error})
                });
        },
        setStandatdFastener(store) {
            const url = '/fastener/set-standard';
            axios.post(url).then(response => {
                const inCart = response.data.cart,
                    itemId = response.data.id;

                store.commit('setCartItemParam',{
                    entityName: 'fastener',
                    itemId: itemId,
                    paramName: 'cart',
                    value: inCart,
                })

                store.dispatch('getCartQuantity');
            }).catch(error => {
                store.commit('handleError', {error: error})
            });
        }
    },
    strict: process.env.NODE_ENV !== 'production'
});

function arrayContainsHand (array, hand) {
    let i = 0;
    for (let item of array) {
        if (Array.isArray(item)) {
            for (let subItem of item) {
                if (subItem.article === hand.article) {
                    return i
                }
            }
        }
        if (item.article === hand.article) {
            return i
        }
        i++;
    }
    return false;
}
function getCorsBaseUrl() {
    if (location.hostname.indexOf('movements.ru') >= 0) {
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
function refreshCart(value) {
    let cartPcElem = document.getElementById('cart-header-pc-value');
    let cartMobileElem = document.getElementById('cart-header-mobile-value');
    cartPcElem.innerHTML = value;
    cartMobileElem.innerHTML = value;
}
function getCartGroupIndex(cart, entityName) {
    for (let i = 0; i < cart.length; i++) {
        let group = cart[i];
        if (group.name === entityName) {
            return i;
        }
    }
}
function getCartItemIndex(items, itemId) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
            return i;
        }
    }
}


