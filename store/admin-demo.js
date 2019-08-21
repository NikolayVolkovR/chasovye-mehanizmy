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
        timeout: 800,
        menuItems : [
            {
                label: "Заказы",
                //url: "/orders"
            },
            {
                label: "Товары",
                items: [
                    {
                        label: "Механизмы",
                        items: [
                            {
                                label: "Модели",
                                //url: "/movements"
                            },
                            {
                                label: "Типы",
                                //url: "/movement-types"
                            },
                            {
                                label: "Серии",
                                //url: "/movement-series"
                            },
                            {
                                label: "Типы хода",
                                //url: "/stroke-types"
                            },
                            {
                                label: "Шумность",
                                //url: "/noisines-types"
                            }
                        ]
                    },
                    {
                        label: "Стрелки",
                        items: [
                            {
                                label: "Часовая и минутная",
                                //url: "/hands/hands"
                            },
                            {
                                label: "Секундная",
                                //url: "/hands/seconds"
                            },
                            {
                                label: "Типы",
                                //url: "/hands/types"
                            },
                            {
                                label: "Цвета",
                                //url: "/hands/colors"
                            },{
                                label: "Материалы",
                                //url: "/hands/materials"
                            },{
                                label: "Профили",
                                //url: "/hands/profiles"
                            },{
                                label: "Формы",
                                //url: "/hands/forms"
                            }
                        ]
                    },
                    {
                        label: "Крепёж",
                        items: [
                            {
                                label: "Модели",
                                //url: "/fastener/fasteners"
                            },
                            {
                                label: "Типы",
                                //url: "/fastener/types"
                            },
                        ]
                    },
                    {
                        label: "Накладные знаки",
                        items: [
                            {
                                label: "Модели",
                                //url: "/sign/signs"
                            },
                            {
                                label: "Типы",
                                //url: "/sign/types"
                            }
                        ]
                    },
                    {
                        label: "Капсулы",
                        items: [
                            {
                                label: "Модели",
                                //url: "/capsule/capsules"
                            },
                            {
                                label: "Циферблаты",
                                //url: "/capsule/dials"
                            }
                        ]
                    },
                    {
                        label: "Штоки",
                        items: [
                            {
                                label: "Модели",
                                //url: "/shafts"
                            },
                            {
                                label: "Типы",
                                //url: "/shaft-types"
                            }
                        ]
                    },
                    {
                        label: "Производители",
                        //url: "/brands"
                    }
                ]
            },
            {
                label: "Примерка стрелок",
                items: [
                    {
                        label: "Корпуса",
                        //url: "/clock-cases"
                    },
                    {
                        label: "Циферблаты",
                        //url: "/clock-dials"
                    }
                ]
            },
            {
                label: "Пользователи",
                //url: "/users"
            },
            {
                label: "Доставка",
                items: [
                    {
                        label: 'Типы',
                        //url: "/delyvery-types"
                    }
                ]
            }
        ],
        items: {},
        ordersDemoServer: [
            {
                "id": 22,
                "created_at": "2019-08-01 09:11:23",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":49,\"quantity\":\"60\",\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":58},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":\"60\",\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"fastener\",\"type\":null,\"id\":2,\"quantity\":10,\"name\":\"\\u041c\\u0435\\u0442\\u0430\\u043b\\u043b\\u0438\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u043f\\u0435\\u0442\\u043b\\u044f\",\"price\":8},{\"entity\":\"fastener\",\"type\":null,\"id\":4,\"quantity\":10,\"name\":\"\\u0424\\u0438\\u0433\\u0443\\u0440\\u043d\\u0430\\u044f \\u0433\\u0430\\u0439\\u043a\\u0430 4.2 \\u043c\\u043c\",\"price\":5},{\"entity\":\"sign\",\"type\":null,\"id\":35,\"quantity\":1,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 20\\u043c\\u043c \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":25},{\"entity\":\"sign\",\"type\":null,\"id\":36,\"quantity\":1,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 20\\u043c\\u043c \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439 \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":25},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 3660,
                "pay_status": 0,
                "invoice": " ",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": " ",
                "delivery": {
                    "id": 10,
                    "user_id": 5,
                    "delivery_type_id": 2,
                    "deliveryType": {
                        "id": 2,
                        "name": "СДЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Калуга, ул. Оптинская, д.1",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": "2019-08-15 00:00:00",
                "delivery_number": " ",
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 23,
                "created_at": "2019-08-02 09:49:57",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":52,\"quantity\":50,\"name\":\"Sangtai 5168 12\\/6 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":51},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":50,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1773,\"quantity\":50,\"name\":\"335 JL \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1719,\"quantity\":10,\"name\":\"173 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1720,\"quantity\":10,\"name\":\"204 JL \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1723,\"quantity\":10,\"name\":\"224 JL \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1726,\"quantity\":20,\"name\":\"C-1 LZ \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":3},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 3050,
                "pay_status": 1,
                "invoice": "254 от 14.10.2019",
                "reserved_to": "2019-08-25 13:02:40",
                "is_reserved": 1,
                "payment": "5 от 10.11.2019",
                "delivery": {
                    "id": 9,
                    "user_id": 5,
                    "delivery_type_id": 1,
                    "deliveryType": {
                        "id": 1,
                        "name": "Самовывоз",
                        "pickup": 1,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "2",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": "2019-08-01 00:00:00",
                "delivery_number": null,
                "is_packing_notice": 1,
                "is_packed_notice": 1,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 24,
                "created_at": "2019-08-04 00:00:00",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 7,
                    "name": "Чапаев Василий Иванович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "passport": "1",
                    "phone": "+7 (111) 122-23-34",
                    "site": "1111",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"capsule\",\"type\":null,\"id\":11,\"quantity\":10,\"name\":\"33\\/28 \\u041c\\u0435\\u0442\\u0430\\u043b\\u043b \\u0421\\u0435\\u0440\\u0435\\u0431\\u0440\\u043e \\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439\",\"price\":298},{\"entity\":\"sign\",\"type\":null,\"id\":32,\"quantity\":100,\"name\":\"\\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439 15\\u043c\\u043c \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439 \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":16},{\"entity\":\"sign\",\"type\":null,\"id\":27,\"quantity\":100,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 10\\u043c\\u043c \\u0414\\u0435\\u0440\\u0435\\u0432\\u043e\",\"price\":16},{\"entity\":\"movement\",\"type\":null,\"id\":53,\"quantity\":500,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":46},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":500,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"plastic\",\"id\":1753,\"quantity\":500,\"name\":\"LZ-04 plastic \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 32680,
                "pay_status": 2,
                "invoice": "515 от 05.06.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "421 от 3.03.2019",
                "delivery": {
                    "id": 12,
                    "user_id": 5,
                    "delivery_type_id": 5,
                    "deliveryType": {
                        "id": 5,
                        "name": "Почта России",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "Республика Чувашия, ул. Партизанская, д1",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 7,
                    "name": "Чапаев Василий Иванович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "passport": "1",
                    "phone": "+7 (111) 122-23-34",
                    "site": "1111",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 1,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 25,
                "created_at": "2019-08-05 00:00:00",
                "user": {
                    "id": 19,
                    "username": null,
                    "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                    "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                    "password_reset_token": null,
                    "email": "1@1.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1562484927,
                    "updated_at": 1566156111
                },
                "customer": {
                    "id": 2,
                    "name": "ООО \"Прекрасные подарки\"",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": "111",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-76",
                    "site": "1",
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":55,\"quantity\":420,\"name\":\"JL 6262 \\u041f\\u0440\\u043e\\u0437\\u0440\\u0430\\u0447\\u043d\\u044b\\u0439 15\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":78},{\"entity\":\"movement\",\"type\":null,\"id\":58,\"quantity\":260,\"name\":\"JH 1668 HTSA 15\\/6 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0423\\u0441\\u0438\\u043b\\u0435\\u043d\\u043d\\u044b\\u0439\",\"price\":92},{\"entity\":\"movement\",\"type\":null,\"id\":49,\"quantity\":200,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":45},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":880,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"fastener\",\"type\":null,\"id\":2,\"quantity\":500,\"name\":\"\\u041c\\u0435\\u0442\\u0430\\u043b\\u043b\\u0438\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u043f\\u0435\\u0442\\u043b\\u044f\",\"price\":8},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1779,\"quantity\":1000,\"name\":\"313 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1726,\"quantity\":60,\"name\":\"C-1 LZ \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1726,\"quantity\":100,\"name\":\"C-1 LZ \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":1200}]",
                "amount": 78310,
                "pay_status": 2,
                "invoice": "121 от 11.11.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "3 от 23.11.2019",
                "delivery": {
                    "id": 11,
                    "user_id": 19,
                    "delivery_type_id": 3,
                    "deliveryType": {
                        "id": 3,
                        "name": "СДЭК по Москве",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "ул. Гоголя, д.1б, кв. 50",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 2,
                    "name": "ООО \"Прекрасные подарки\"",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": "111",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-76",
                    "site": "1",
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 1,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 26,
                "created_at": "2019-08-06 10:44:15",
                "user": {
                    "id": 19,
                    "username": null,
                    "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                    "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                    "password_reset_token": null,
                    "email": "1@1.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1562484927,
                    "updated_at": 1566156111
                },
                "customer": {
                    "id": 4,
                    "name": "Петров Иван Васильевич",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": null,
                    "bank_name": null,
                    "bik": null,
                    "rs": null,
                    "phone": null,
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/4/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":50,\"quantity\":100,\"name\":\"JL 6262 16\\/9 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":47},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"sign\",\"type\":null,\"id\":35,\"quantity\":100,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 20\\u043c\\u043c \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":18},{\"entity\":\"hand\",\"type\":\"plastic\",\"id\":1754,\"quantity\":100,\"name\":\"BL-52 plastic \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 7200,
                "pay_status": 2,
                "invoice": "123 от 31.05.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "60 от 9.04.2019",
                "delivery": {
                    "id": 13,
                    "user_id": 19,
                    "delivery_type_id": 1,
                    "deliveryType": {
                        "id": 1,
                        "name": "Самовывоз",
                        "pickup": 1,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 4,
                    "name": "Петров Иван Васильевич",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": null,
                    "bank_name": null,
                    "bik": null,
                    "rs": null,
                    "phone": null,
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/4/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 2,
                "delivery_scheduled": "2019-08-14 00:00:00",
                "delivery_number": " ",
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 27,
                "created_at": "2019-08-07 11:38:13",
                "user": {
                    "id": 19,
                    "username": null,
                    "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                    "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                    "password_reset_token": null,
                    "email": "1@1.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1562484927,
                    "updated_at": 1566156111
                },
                "customer": {
                    "id": 8,
                    "name": "Иванов Пётр Михайлович",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "passport": "111",
                    "phone": "+7 (543) 212-34-45",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":52,\"quantity\":100,\"name\":\"Sangtai 5168 12\\/6 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":42},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"plastic\",\"id\":1753,\"quantity\":100,\"name\":\"LZ-04 plastic \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 4900,
                "pay_status": 2,
                "invoice": "443 от 01.02.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "33 от 22.12.2019",
                "delivery": {
                    "id": 14,
                    "user_id": 19,
                    "delivery_type_id": 4,
                    "deliveryType": {
                        "id": 4,
                        "name": "Деловые Линии",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Астрахань, ул. Победы, д. 50, кв. 18",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 8,
                    "name": "Иванов Пётр Михайлович",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "passport": "111",
                    "phone": "+7 (543) 212-34-45",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 3,
                "delivery_scheduled": null,
                "delivery_number": "75829КОЩЕ",
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 28,
                "created_at": "2019-08-11 11:48:19",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":53,\"quantity\":200,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":48},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":200,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1766,\"quantity\":10,\"name\":\"9124 JH \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":75},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1750,\"quantity\":200,\"name\":\"3199 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1719,\"quantity\":200,\"name\":\"173 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":100}]",
                "amount": 12550,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 15,
                    "user_id": 22,
                    "delivery_type_id": 6,
                    "deliveryType": {
                        "id": 6,
                        "name": "ПЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Челябинск, ул. Профсоюзная, д15, офис 275",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 1
            },
            {
                "id": 29,
                "created_at": "2019-08-12 11:55:01",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"sign\",\"type\":null,\"id\":30,\"quantity\":100,\"name\":\"\\u0418\\u043d\\u0434\\u0435\\u043a\\u0441 10\\u043c\\u043c \\u0414\\u0435\\u0440\\u0435\\u0432\\u043e\",\"price\":16},{\"entity\":\"movement\",\"type\":null,\"id\":59,\"quantity\":50,\"name\":\"JH 1668 HTSA 17\\/8 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0423\\u0441\\u0438\\u043b\\u0435\\u043d\\u043d\\u044b\\u0439\",\"price\":103},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":50,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1763,\"quantity\":50,\"name\":\"9187 JH \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":65},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 10000,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 16,
                    "user_id": 22,
                    "delivery_type_id": 4,
                    "deliveryType": {
                        "id": 4,
                        "name": "Деловые Линии",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Екатеринбург, ул. 5-я Промышленная, д.8, офис 4",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 2
            },
            {
                "id": 30,
                "created_at": "2019-08-15 12:03:03",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"capsule\",\"type\":null,\"id\":11,\"quantity\":10,\"name\":\"33\\/28 \\u041c\\u0435\\u0442\\u0430\\u043b\\u043b \\u0421\\u0435\\u0440\\u0435\\u0431\\u0440\\u043e \\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439\",\"price\":298},{\"entity\":\"capsule\",\"type\":null,\"id\":12,\"quantity\":1,\"name\":\"37\\/32.5 \\u041c\\u0435\\u0442\\u0430\\u043b\\u043b \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439\",\"price\":302},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 3282,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 17,
                    "user_id": 22,
                    "delivery_type_id": 3,
                    "deliveryType": {
                        "id": 3,
                        "name": "СДЭК по Москве",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "Цветной б-р, 13, Москва",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 31,
                "created_at": "2019-08-15 12:45:37",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":53,\"quantity\":100,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":48},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1776,\"quantity\":100,\"name\":\"319 JL \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":6},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1720,\"quantity\":100,\"name\":\"204 JL \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 5650,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 16,
                    "user_id": 22,
                    "delivery_type_id": 4,
                    "deliveryType": {
                        "id": 4,
                        "name": "Деловые Линии",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Екатеринбург, ул. 5-я Промышленная, д.8, офис 4",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 32,
                "created_at": "2019-08-16 12:46:43",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":51,\"quantity\":300,\"name\":\"JL 6262 18\\/12 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":49},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":300,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1750,\"quantity\":200,\"name\":\"3199 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1748,\"quantity\":100,\"name\":\"820 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1699,\"quantity\":100,\"name\":\"112 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3.5},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1696,\"quantity\":100,\"name\":\"215 JL \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3.5},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1697,\"quantity\":100,\"name\":\"6 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3.5},{\"entity\":\"sign\",\"type\":null,\"id\":30,\"quantity\":100,\"name\":\"\\u0418\\u043d\\u0434\\u0435\\u043a\\u0441 10\\u043c\\u043c \\u0414\\u0435\\u0440\\u0435\\u0432\\u043e\",\"price\":16},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 19750,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 15,
                    "user_id": 22,
                    "delivery_type_id": 6,
                    "deliveryType": {
                        "id": 6,
                        "name": "ПЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Челябинск, ул. Профсоюзная, д15, офис 275",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 33,
                "created_at": "2019-08-18 12:47:55",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":55,\"quantity\":100,\"name\":\"JL 6262 \\u041f\\u0440\\u043e\\u0437\\u0440\\u0430\\u0447\\u043d\\u044b\\u0439 15\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":78},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"fastener\",\"type\":null,\"id\":2,\"quantity\":100,\"name\":\"\\u041c\\u0435\\u0442\\u0430\\u043b\\u043b\\u0438\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u043f\\u0435\\u0442\\u043b\\u044f\",\"price\":8},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1751,\"quantity\":100,\"name\":\"619 \\u0427\\u041c \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1719,\"quantity\":100,\"name\":\"173 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 9650,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 17,
                    "user_id": 22,
                    "delivery_type_id": 3,
                    "deliveryType": {
                        "id": 3,
                        "name": "СДЭК по Москве",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "Цветной б-р, 13, Москва",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 34,
                "created_at": "2019-08-19 12:48:44",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"sign\",\"type\":null,\"id\":33,\"quantity\":300,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 15\\u043c\\u043c \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":16},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 4800,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 9,
                    "user_id": 5,
                    "delivery_type_id": 1,
                    "deliveryType": {
                        "id": 1,
                        "name": "Самовывоз",
                        "pickup": 1,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "2",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 35,
                "created_at": "2019-08-20 12:49:27",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":49,\"quantity\":100,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":45},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 4500,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 10,
                    "user_id": 5,
                    "delivery_type_id": 2,
                    "deliveryType": {
                        "id": 2,
                        "name": "СДЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Калуга, ул. Оптинская, д.1",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            }
        ],
        ordersSource: [
            {
                "id": 22,
                "created_at": "2019-08-01 09:11:23",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":49,\"quantity\":\"60\",\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":58},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":\"60\",\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"fastener\",\"type\":null,\"id\":2,\"quantity\":10,\"name\":\"\\u041c\\u0435\\u0442\\u0430\\u043b\\u043b\\u0438\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u043f\\u0435\\u0442\\u043b\\u044f\",\"price\":8},{\"entity\":\"fastener\",\"type\":null,\"id\":4,\"quantity\":10,\"name\":\"\\u0424\\u0438\\u0433\\u0443\\u0440\\u043d\\u0430\\u044f \\u0433\\u0430\\u0439\\u043a\\u0430 4.2 \\u043c\\u043c\",\"price\":5},{\"entity\":\"sign\",\"type\":null,\"id\":35,\"quantity\":1,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 20\\u043c\\u043c \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":25},{\"entity\":\"sign\",\"type\":null,\"id\":36,\"quantity\":1,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 20\\u043c\\u043c \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439 \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":25},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 3660,
                "pay_status": 0,
                "invoice": " ",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": " ",
                "delivery": {
                    "id": 10,
                    "user_id": 5,
                    "delivery_type_id": 2,
                    "deliveryType": {
                        "id": 2,
                        "name": "СДЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Калуга, ул. Оптинская, д.1",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": "2019-08-15 00:00:00",
                "delivery_number": " ",
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 23,
                "created_at": "2019-08-02 09:49:57",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":52,\"quantity\":50,\"name\":\"Sangtai 5168 12\\/6 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":51},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":50,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1773,\"quantity\":50,\"name\":\"335 JL \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1719,\"quantity\":10,\"name\":\"173 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1720,\"quantity\":10,\"name\":\"204 JL \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1723,\"quantity\":10,\"name\":\"224 JL \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1726,\"quantity\":20,\"name\":\"C-1 LZ \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":3},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 3050,
                "pay_status": 1,
                "invoice": "254 от 14.10.2019",
                "reserved_to": "2019-08-25 13:02:40",
                "is_reserved": 1,
                "payment": "5 от 10.11.2019",
                "delivery": {
                    "id": 9,
                    "user_id": 5,
                    "delivery_type_id": 1,
                    "deliveryType": {
                        "id": 1,
                        "name": "Самовывоз",
                        "pickup": 1,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "2",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": "2019-08-01 00:00:00",
                "delivery_number": null,
                "is_packing_notice": 1,
                "is_packed_notice": 1,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 24,
                "created_at": "2019-08-04 10:38:26",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 7,
                    "name": "Чапаев Василий Иванович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "passport": "1",
                    "phone": "+7 (111) 122-23-34",
                    "site": "1111",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"capsule\",\"type\":null,\"id\":11,\"quantity\":10,\"name\":\"33\\/28 \\u041c\\u0435\\u0442\\u0430\\u043b\\u043b \\u0421\\u0435\\u0440\\u0435\\u0431\\u0440\\u043e \\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439\",\"price\":298},{\"entity\":\"sign\",\"type\":null,\"id\":32,\"quantity\":100,\"name\":\"\\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439 15\\u043c\\u043c \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439 \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":16},{\"entity\":\"sign\",\"type\":null,\"id\":27,\"quantity\":100,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 10\\u043c\\u043c \\u0414\\u0435\\u0440\\u0435\\u0432\\u043e\",\"price\":16},{\"entity\":\"movement\",\"type\":null,\"id\":53,\"quantity\":500,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":46},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":500,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"plastic\",\"id\":1753,\"quantity\":500,\"name\":\"LZ-04 plastic \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 32680,
                "pay_status": 2,
                "invoice": "515 от 05.06.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "421 от 3.03.2019",
                "delivery": {
                    "id": 12,
                    "user_id": 5,
                    "delivery_type_id": 5,
                    "deliveryType": {
                        "id": 5,
                        "name": "Почта России",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "Республика Чувашия, ул. Партизанская, д1",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 7,
                    "name": "Чапаев Василий Иванович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "passport": "1",
                    "phone": "+7 (111) 122-23-34",
                    "site": "1111",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 1,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 25,
                "created_at": "2019-08-20 10:42:25",
                "user": {
                    "id": 19,
                    "username": null,
                    "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                    "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                    "password_reset_token": null,
                    "email": "1@1.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1562484927,
                    "updated_at": 1566156111
                },
                "customer": {
                    "id": 2,
                    "name": "ООО \"Прекрасные подарки\"",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": "111",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-76",
                    "site": "1",
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":55,\"quantity\":420,\"name\":\"JL 6262 \\u041f\\u0440\\u043e\\u0437\\u0440\\u0430\\u0447\\u043d\\u044b\\u0439 15\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":78},{\"entity\":\"movement\",\"type\":null,\"id\":58,\"quantity\":260,\"name\":\"JH 1668 HTSA 15\\/6 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0423\\u0441\\u0438\\u043b\\u0435\\u043d\\u043d\\u044b\\u0439\",\"price\":92},{\"entity\":\"movement\",\"type\":null,\"id\":49,\"quantity\":200,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":45},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":880,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"fastener\",\"type\":null,\"id\":2,\"quantity\":500,\"name\":\"\\u041c\\u0435\\u0442\\u0430\\u043b\\u043b\\u0438\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u043f\\u0435\\u0442\\u043b\\u044f\",\"price\":8},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1779,\"quantity\":1000,\"name\":\"313 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1726,\"quantity\":60,\"name\":\"C-1 LZ \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":3},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1726,\"quantity\":100,\"name\":\"C-1 LZ \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":1200}]",
                "amount": 78310,
                "pay_status": 2,
                "invoice": "121 от 11.11.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "3 от 23.11.2019",
                "delivery": {
                    "id": 11,
                    "user_id": 19,
                    "delivery_type_id": 3,
                    "deliveryType": {
                        "id": 3,
                        "name": "СДЭК по Москве",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "ул. Гоголя, д.1б, кв. 50",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 2,
                    "name": "ООО \"Прекрасные подарки\"",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": "111",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-76",
                    "site": "1",
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 1,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 26,
                "created_at": "2019-08-20 10:44:15",
                "user": {
                    "id": 19,
                    "username": null,
                    "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                    "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                    "password_reset_token": null,
                    "email": "1@1.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1562484927,
                    "updated_at": 1566156111
                },
                "customer": {
                    "id": 4,
                    "name": "Петров Иван Васильевич",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": null,
                    "bank_name": null,
                    "bik": null,
                    "rs": null,
                    "phone": null,
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/4/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":50,\"quantity\":100,\"name\":\"JL 6262 16\\/9 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":47},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"sign\",\"type\":null,\"id\":35,\"quantity\":100,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 20\\u043c\\u043c \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":18},{\"entity\":\"hand\",\"type\":\"plastic\",\"id\":1754,\"quantity\":100,\"name\":\"BL-52 plastic \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 7200,
                "pay_status": 2,
                "invoice": "123 от 31.05.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "60 от 9.04.2019",
                "delivery": {
                    "id": 13,
                    "user_id": 19,
                    "delivery_type_id": 1,
                    "deliveryType": {
                        "id": 1,
                        "name": "Самовывоз",
                        "pickup": 1,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 4,
                    "name": "Петров Иван Васильевич",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "inn": null,
                    "bank_name": null,
                    "bik": null,
                    "rs": null,
                    "phone": null,
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/4/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 2,
                "delivery_scheduled": "2019-08-14 00:00:00",
                "delivery_number": " ",
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 27,
                "created_at": "2019-08-20 11:38:13",
                "user": {
                    "id": 19,
                    "username": null,
                    "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                    "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                    "password_reset_token": null,
                    "email": "1@1.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1562484927,
                    "updated_at": 1566156111
                },
                "customer": {
                    "id": 8,
                    "name": "Иванов Пётр Михайлович",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "passport": "111",
                    "phone": "+7 (543) 212-34-45",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":52,\"quantity\":100,\"name\":\"Sangtai 5168 12\\/6 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":42},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"plastic\",\"id\":1753,\"quantity\":100,\"name\":\"LZ-04 plastic \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":7},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 4900,
                "pay_status": 2,
                "invoice": "443 от 01.02.2019",
                "reserved_to": null,
                "is_reserved": 0,
                "payment": "33 от 22.12.2019",
                "delivery": {
                    "id": 14,
                    "user_id": 19,
                    "delivery_type_id": 4,
                    "deliveryType": {
                        "id": 4,
                        "name": "Деловые Линии",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Астрахань, ул. Победы, д. 50, кв. 18",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 8,
                    "name": "Иванов Пётр Михайлович",
                    "user_id": 19,
                    "user": {
                        "id": 19,
                        "username": null,
                        "auth_key": "Uj4wRgdH2boNgLaGU35M-2Lt8c1_PjhA",
                        "password_hash": "$2y$13$Jf6ZIVBFOHZbamIpl4oKXuUdh47cGc6lwMpeKl1coKA3ERzGmxkSm",
                        "password_reset_token": null,
                        "email": "1@1.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1562484927,
                        "updated_at": 1566156111
                    },
                    "passport": "111",
                    "phone": "+7 (543) 212-34-45",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 3,
                "delivery_scheduled": null,
                "delivery_number": "75829КОЩЕ",
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 28,
                "created_at": "2019-08-20 11:48:19",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":53,\"quantity\":200,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":48},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":200,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1766,\"quantity\":10,\"name\":\"9124 JH \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":75},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1750,\"quantity\":200,\"name\":\"3199 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1719,\"quantity\":200,\"name\":\"173 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":100}]",
                "amount": 12550,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 15,
                    "user_id": 22,
                    "delivery_type_id": 6,
                    "deliveryType": {
                        "id": 6,
                        "name": "ПЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Челябинск, ул. Профсоюзная, д15, офис 275",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 1
            },
            {
                "id": 29,
                "created_at": "2019-08-20 11:55:01",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"sign\",\"type\":null,\"id\":30,\"quantity\":100,\"name\":\"\\u0418\\u043d\\u0434\\u0435\\u043a\\u0441 10\\u043c\\u043c \\u0414\\u0435\\u0440\\u0435\\u0432\\u043e\",\"price\":16},{\"entity\":\"movement\",\"type\":null,\"id\":59,\"quantity\":50,\"name\":\"JH 1668 HTSA 17\\/8 \\u0414\\u0438\\u0441\\u043a\\u0440\\u0435\\u0442\\u043d\\u044b\\u0439 \\u0423\\u0441\\u0438\\u043b\\u0435\\u043d\\u043d\\u044b\\u0439\",\"price\":103},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":50,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1763,\"quantity\":50,\"name\":\"9187 JH \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":65},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 10000,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 16,
                    "user_id": 22,
                    "delivery_type_id": 4,
                    "deliveryType": {
                        "id": 4,
                        "name": "Деловые Линии",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Екатеринбург, ул. 5-я Промышленная, д.8, офис 4",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 2
            },
            {
                "id": 30,
                "created_at": "2019-08-20 12:03:03",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"capsule\",\"type\":null,\"id\":11,\"quantity\":10,\"name\":\"33\\/28 \\u041c\\u0435\\u0442\\u0430\\u043b\\u043b \\u0421\\u0435\\u0440\\u0435\\u0431\\u0440\\u043e \\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439\",\"price\":298},{\"entity\":\"capsule\",\"type\":null,\"id\":12,\"quantity\":1,\"name\":\"37\\/32.5 \\u041c\\u0435\\u0442\\u0430\\u043b\\u043b \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u0420\\u0438\\u043c\\u0441\\u043a\\u0438\\u0439\",\"price\":302},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 3282,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 17,
                    "user_id": 22,
                    "delivery_type_id": 3,
                    "deliveryType": {
                        "id": 3,
                        "name": "СДЭК по Москве",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "Цветной б-р, 13, Москва",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 31,
                "created_at": "2019-08-20 12:45:37",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":53,\"quantity\":100,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439 \\u0441 \\u043f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0435\\u0442\\u043b\\u0451\\u0439\",\"price\":48},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1776,\"quantity\":100,\"name\":\"319 JL \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e\",\"price\":6},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1720,\"quantity\":100,\"name\":\"204 JL \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 5650,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 16,
                    "user_id": 22,
                    "delivery_type_id": 4,
                    "deliveryType": {
                        "id": 4,
                        "name": "Деловые Линии",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Екатеринбург, ул. 5-я Промышленная, д.8, офис 4",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "ООО \"Сувениры Урала\"",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "kpp": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-54-32",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 32,
                "created_at": "2019-08-20 12:46:43",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":51,\"quantity\":300,\"name\":\"JL 6262 18\\/12 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":49},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":300,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1750,\"quantity\":200,\"name\":\"3199 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"hand\",\"id\":1748,\"quantity\":100,\"name\":\"820 LZ \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1699,\"quantity\":100,\"name\":\"112 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3.5},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1696,\"quantity\":100,\"name\":\"215 JL \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3.5},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1697,\"quantity\":100,\"name\":\"6 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":3.5},{\"entity\":\"sign\",\"type\":null,\"id\":30,\"quantity\":100,\"name\":\"\\u0418\\u043d\\u0434\\u0435\\u043a\\u0441 10\\u043c\\u043c \\u0414\\u0435\\u0440\\u0435\\u0432\\u043e\",\"price\":16},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 19750,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 15,
                    "user_id": 22,
                    "delivery_type_id": 6,
                    "deliveryType": {
                        "id": 6,
                        "name": "ПЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Челябинск, ул. Профсоюзная, д15, офис 275",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 5,
                    "name": "Ермак Тимофеевич",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (567) 534-56-78",
                    "site": null,
                    "details_file": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 33,
                "created_at": "2019-08-20 12:47:55",
                "user": {
                    "id": 22,
                    "username": null,
                    "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                    "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                    "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                    "email": "2@2.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1566290387,
                    "updated_at": 1566290487
                },
                "customer": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "customer_entity": "Individual",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":55,\"quantity\":100,\"name\":\"JL 6262 \\u041f\\u0440\\u043e\\u0437\\u0440\\u0430\\u0447\\u043d\\u044b\\u0439 15\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":78},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"fastener\",\"type\":null,\"id\":2,\"quantity\":100,\"name\":\"\\u041c\\u0435\\u0442\\u0430\\u043b\\u043b\\u0438\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u043f\\u0435\\u0442\\u043b\\u044f\",\"price\":8},{\"entity\":\"hand\",\"type\":\"power\",\"id\":1751,\"quantity\":100,\"name\":\"619 \\u0427\\u041c \\u0427\\u0451\\u0440\\u043d\\u044b\\u0439\",\"price\":8},{\"entity\":\"hand\",\"type\":\"second\",\"id\":1719,\"quantity\":100,\"name\":\"173 LZ \\u041a\\u0440\\u0430\\u0441\\u043d\\u044b\\u0439\",\"price\":2.5},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 9650,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 17,
                    "user_id": 22,
                    "delivery_type_id": 3,
                    "deliveryType": {
                        "id": 3,
                        "name": "СДЭК по Москве",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "Цветной б-р, 13, Москва",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 9,
                    "name": "Никулин Юрий Владимирович",
                    "user_id": 22,
                    "user": {
                        "id": 22,
                        "username": null,
                        "auth_key": "iIBysy-Q0MwUs5d4soY3vlxt5fNjRi6C",
                        "password_hash": "$2y$13$c4Bj2dhQuvbhbG2h.JyhHOriJzTgw41qghwTGtV3ssZ0AuW4DiBZO",
                        "password_reset_token": "oMpUm0jboej6LvbB6Bpk_T9hPWwkvuYe_1566290487",
                        "email": "2@2.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1566290387,
                        "updated_at": 1566290487
                    },
                    "passport": "4563 332556",
                    "phone": "+7 (495) 771-63-23",
                    "site": null,
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Физ. лицо"
                },
                "recipient_entity": "Individual",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 34,
                "created_at": "2019-08-20 12:48:44",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "customer_entity": "LegalEntity",
                "products": "[{\"entity\":\"sign\",\"type\":null,\"id\":33,\"quantity\":300,\"name\":\"\\u0410\\u0440\\u0430\\u0431\\u0441\\u043a\\u0438\\u0439 15\\u043c\\u043c \\u0417\\u043e\\u043b\\u043e\\u0442\\u043e \\u041f\\u043b\\u0430\\u0441\\u0442\\u0438\\u043a\",\"price\":16},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 4800,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 9,
                    "user_id": 5,
                    "delivery_type_id": 1,
                    "deliveryType": {
                        "id": 1,
                        "name": "Самовывоз",
                        "pickup": 1,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "2",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 1,
                    "name": "ООО \"Сувениры и подарки\"",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "31",
                    "kpp": "3",
                    "bank_name": "3",
                    "bik": "33",
                    "rs": "3",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/legal_entity/1/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "Юр. лицо"
                },
                "recipient_entity": "LegalEntity",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            },
            {
                "id": 35,
                "created_at": "2019-08-20 12:49:27",
                "user": {
                    "id": 5,
                    "username": "nik",
                    "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                    "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                    "password_reset_token": null,
                    "email": "nik@nik.ru",
                    "email_confirm_token": null,
                    "status": 10,
                    "created_at": 1548002378,
                    "updated_at": 1551702661
                },
                "customer": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "customer_entity": "Entrepreneur",
                "products": "[{\"entity\":\"movement\",\"type\":null,\"id\":49,\"quantity\":100,\"name\":\"JL 6262 12\\/6 \\u041f\\u043b\\u0430\\u0432\\u043d\\u044b\\u0439 \\u0421\\u0442\\u0430\\u043d\\u0434\\u0430\\u0440\\u0442\\u043d\\u044b\\u0439\",\"price\":45},{\"entity\":\"fastener\",\"type\":null,\"id\":1,\"quantity\":100,\"name\":\"\\u0423\\u043f\\u043b\\u043e\\u0442\\u043d\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430, \\u0433\\u0430\\u0439\\u043a\\u0430, \\u043b\\u0430\\u0442\\u0443\\u043d\\u043d\\u0430\\u044f \\u0448\\u0430\\u0439\\u0431\\u0430\",\"price\":0},{\"entity\":\"handsOverpay\",\"name\":\"\\u0414\\u043e\\u043f\\u043b\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u0441\\u0442\\u0440\\u0435\\u043b\\u043a\\u0438 \\u0431\\u0435\\u0437 \\u043c\\u0435\\u0445\\u0430\\u043d\\u0438\\u0437\\u043c\\u0430\",\"quantity\":1,\"price\":0}]",
                "amount": 4500,
                "pay_status": 0,
                "invoice": null,
                "reserved_to": null,
                "is_reserved": 0,
                "payment": null,
                "delivery": {
                    "id": 10,
                    "user_id": 5,
                    "delivery_type_id": 2,
                    "deliveryType": {
                        "id": 2,
                        "name": "СДЭК",
                        "pickup": 0,
                        "actions": {
                            "delete": {
                                "allow": true,
                                "message": ""
                            }
                        }
                    },
                    "address": "г. Калуга, ул. Оптинская, д.1",
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    }
                },
                "recipient": {
                    "id": 3,
                    "name": "Иванов Фёдор Борисович",
                    "user_id": 5,
                    "user": {
                        "id": 5,
                        "username": "nik",
                        "auth_key": "V8CDdfCZjTHm2V1C969HHV-YxfLqp9HI",
                        "password_hash": "$2y$13$jQoZr5ajK07892wOGr.RbOQyii4J.oipcn5g8Wc7AP5mdfXzhEyhC",
                        "password_reset_token": null,
                        "email": "nik@nik.ru",
                        "email_confirm_token": null,
                        "status": 10,
                        "created_at": 1548002378,
                        "updated_at": 1551702661
                    },
                    "inn": "1",
                    "bank_name": "1",
                    "bik": "1",
                    "rs": "1",
                    "phone": "+7 (123) 456-78-90",
                    "site": null,
                    "details_file": "http://static.movements.ru/entrepreneur/3/details.jpg",
                    "active": 1,
                    "actions": {
                        "delete": {
                            "allow": false
                        }
                    },
                    "type_rus": "ИП"
                },
                "recipient_entity": "Entrepreneur",
                "delivery_status": 0,
                "delivery_scheduled": null,
                "delivery_number": null,
                "is_packing_notice": 0,
                "is_packed_notice": 0,
                "is_sent_notice": 0,
                "is_reserve_notice": 0,
                "common_status": 0
            }
        ]
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
        /*createItem(store, {entityName, data}) {
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
        },*/

        getOrders(store, {dateFrom, dateTo, common_status}) {
            store.commit('setOrders', {orders: null})
            setTimeout(()=>{
                let orders = store.state.ordersDemoServer.filter(order => {
                    const created_at = new Date(order.created_at).getTime();

                    if (dateFrom && dateTo) {
                        return order.common_status == common_status && created_at >= dateFrom && created_at <= dateTo
                    } else {
                        return order.common_status == common_status
                    }
                });

                store.commit('setOrders', {orders: orders})
            }, store.state.timeout)
        },
        orderPayStatusChange(store, {value, id, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'pay_status', value: parseInt(value)})
            }, store.state.timeout);
        },
        orderDeliveryStatusChange(store, {value, id, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'delivery_status', value: parseInt(value)})
            }, store.state.timeout);
        },
        orderInvoiceChange(store, {value, id, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'invoice', value: value})
            }, store.state.timeout);
        },
        orderPaymentChange(store, {value, id, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})
            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'payment', value: value})
            }, store.state.timeout);
        },
        reservePlus(store, {id, index}) {
            store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: true})
            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: false})
                let order = store.state.orders[index];
                let date = new Date(order.reserved_to)
                let value = date.setDate(date.getDate() + 1);

                store.commit('setOrderParam', {orderIndex: index, param: 'reserved_to', value: value})
            }, store.state.timeout);
        },
        reserveReset(store, {id, index}) {
            store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: true})
            setTimeout(()=> {
                store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: false});
                store.commit('setOrderParam', {orderIndex: index, param: 'reserved_to', value: ''});
                store.commit('setOrderParam', {orderIndex: index, param: 'is_reserved', value: false});
            }, store.state.timeout)
        },
        reserveSet(store, {id, index}) {
            store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: index, param: 'loading', value: false})

                let date = new Date();
                date.setDate(date.getDate() + 5);
                /*date = date.getUTCFullYear() + '-' +
                    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                    ('00' + date.getUTCDate()).slice(-2) + ' ' +
                    ('00' + date.getUTCHours()).slice(-2) + ':' +
                    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                    ('00' + date.getUTCSeconds()).slice(-2);*/

                store.commit('setOrderParam', {orderIndex: index, param: 'reserved_to', value: date})
                store.commit('setOrderParam', {orderIndex: index, param: 'is_reserved', value: true})
            }, store.state.timeout);
        },
        editCustomerFromOrder(store, {form, entityName, itemId, orderIndex}) {
            alert('Редактировать "Клиента" можно в полной версии...')
        },
        editDeliveryFromOrder(store, {fields, itemId, orderIndex}) {
            alert('Редактировать "Доставку" можно в полной версии...')
        },
        editRecipientFromOrder(store, {form, entityName, itemId, orderIndex}) {
            alert('Редактировать "Получателя" можно в полной версии...')
        },
        orderSetDeliveryScheduled(store, {orderIndex, orderId, value}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'delivery_scheduled', value: value})
            }, store.state.timeout);
        },
        orderDeliveryNumberChange(store, {value, id, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'delivery_number', value: value})
            }, store.state.timeout);
        },
        orderAddProduct(store, {entityName, itemId, quantity, orderId, orderIndex}) {
            alert('Добавить товар в заказ можно в полной версии...')
        },
        orderRemoveProduct(store, {orderId, orderIndex, productIndex}) {
            alert('Добавить товар из заказа можно в полной версии...')
        },
        orderEditProduct(store, {orderId, orderIndex, productIndex, productQuantity, productPrice}) {
            alert('Редактировать товар в заказе можно в полной версии...')
        },
        orderSendNotice(store, {orderId, orderIndex, noticeType}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false})
                store.commit('setOrderParam', {orderIndex: orderIndex, param: noticeType, value: true})
            }, store.state.timeout);
        },
        orderSetFinished(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false});
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'common_status', value: 1});
                store.commit('deleteOrder', {orderIndex: orderIndex});
            }, store.state.timeout);
        },
        orderSetActive(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false});
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'common_status', value: 0});
                store.commit('deleteOrder', {orderIndex: orderIndex});
            }, store.state.timeout);
        },
        orderSetUnfinished(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: false});
                store.commit('setOrderParam', {orderIndex: orderIndex, param: 'common_status', value: 2});
                store.commit('deleteOrder', {orderIndex: orderIndex});
            }, store.state.timeout);
        },
        orderDelete(store, {orderId, orderIndex}) {
            store.commit('setOrderParam', {orderIndex: orderIndex, param: 'loading', value: true})

            setTimeout(()=>{
                store.commit('deleteOrder', {orderIndex: orderIndex});
            }, store.state.timeout);
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