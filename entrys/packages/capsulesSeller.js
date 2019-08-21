import Vue from 'vue'
Vue.config.productionTip = false;
import {store} from '../../store/front.js'
import itemSeller from 'Components/ItemSeller/ItemSeller.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

class CapsulesSeller {
    init() {
        new Vue({
            el: '#capsulesSeller',
            data: {
                entity: 'capsule',
                cartMin: 1,
                cartStep: 1
            },
            store,
            components: { itemSeller },
            render: h => h(itemSeller)
        })
    }
}

export {CapsulesSeller}