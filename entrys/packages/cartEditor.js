import Vue from 'vue'
Vue.config.productionTip = false;
import {store} from '../../store/front.js'
import cartEditor from 'Components/CartEditor/CartEditor.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faCheckCircle, faExclamationCircle, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faSpinner, faCheckCircle, faExclamationCircle, faDownload )
Vue.component('font-awesome-icon', FontAwesomeIcon)

class CartEditor {
    init() {
        new Vue({
            el: '#cart-editor',
            data: {},
            store,
            components: { cartEditor },
            render: h => h(cartEditor)
        })
    }
}

export {CartEditor}