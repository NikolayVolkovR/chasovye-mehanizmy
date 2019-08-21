import Vue from 'vue'
Vue.config.productionTip = false;
import {store} from '../../store/front.js'
import itemSeller from 'Components/ItemSeller/ItemSeller.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

class SignsSeller {
    init() {
        new Vue({
            el: '#signsSeller',
            data: {
                entity: 'sign',
                cartMin: 1,
                cartStep: 1
            },
            store,
            components: { itemSeller },
            render: h => h(itemSeller)
        })
    }
}

export {SignsSeller}