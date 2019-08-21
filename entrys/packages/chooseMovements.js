import Vue from 'vue'
Vue.config.productionTip = false;
import {store} from '../../store/front.js'
import ChooseMovements from 'Components/ChooseMovements/ChooseMovements.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

class chooseMovements {
    init() {
        new Vue({
            el: '#chooseMovements',
            data: {
                compactStart: true
            },
            store,
            components: { ChooseMovements },
            render: h => h(ChooseMovements)
        })
    }
}

export {chooseMovements}