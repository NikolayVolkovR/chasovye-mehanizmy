import Vue from 'vue'
Vue.config.productionTip = false;
import {store} from '../../store/front.js'
import TryHand from 'Components/TryHand/TryHand.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

class tryHand {
    init() {
        new Vue({
            el: '#tryHand',
            data: {
                //compactStart: true
            },
            store,
            components: { TryHand },
            render: h => h(TryHand)
        })
    }
}

export {tryHand}