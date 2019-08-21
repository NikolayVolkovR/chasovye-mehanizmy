import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Stat from '../components/Pages/stat.vue';
import Orders from '../components/Pages/orders.vue';
import Users from '../components/Pages/users.vue';
import Brands from '../components/Pages/brands.vue';
import Movements from '../components/Pages/movement/movements.vue';
import MovementTypes from '../components/Pages/movement/movement-types.vue'
import MovementSeries from '../components/Pages/movement/movement-series.vue'
import StrokeTypes from '../components/Pages/movement/stroke-types.vue'
import NoisinesTypes from '../components/Pages/movement/noisines-type.vue'
import ShaftTypes from '../components/Pages/shaft/shaft-types.vue'
import Shafts from '../components/Pages/shaft/shafts.vue'
import Colors from '../components/Pages/colors.vue'
import Materials from '../components/Pages/materials.vue'
import HandTypes from '../components/Pages/hand/types.vue'
import HandProfiles from '../components/Pages/hand/profiles.vue'
import HandForms from '../components/Pages/hand/forms.vue'
import Hands from '../components/Pages/hand/hands.vue'
import Seconds from '../components/Pages/hand/seconds.vue'
import FastenerTypes from '../components/Pages/fastener/types.vue'
import Fasteners from '../components/Pages/fastener/fasteners.vue'
import SignTypes from '../components/Pages/sign/types.vue'
import Signs from '../components/Pages/sign/signs.vue'
import CapsuleDials from '../components/Pages/capsule/dials.vue'
import Capsules from '../components/Pages/capsule/capsules.vue'
import ClockCases from '../components/Pages/clock/cases.vue'
import ClockDials from '../components/Pages/clock/dials.vue'
import delyveryTypes from '../components/Pages/delivery/types.vue'

import E404 from '../components/Pages/Errors/e404.vue';

const routes = [
    {
        path: '',
        component: Orders
    },
    {
        path: '/orders',
        component: Orders
    },
    {
        path: '/users',
        component: Users
    },
    {
        path: '/brands',
        component: Brands
    },
    {
        path: '/hands/colors',
        component: Colors
    },
    {
        path: '/hands/hands',
        component: Hands
    },
    {
        path: '/hands/seconds',
        component: Seconds
    }
    ,
    {
        path: '/hands/types',
        component: HandTypes
    },
    {
        path: '/hands/materials',
        component: Materials
    },
    {
        path: '/hands/profiles',
        component: HandProfiles
    },
    {
        path: '/hands/forms',
        component: HandForms
    },
    {
        path: '/movements',
        component: Movements
    },
    {
        path: '/movement-types',
        component: MovementTypes
    },
    {
        path: '/movement-series',
        component: MovementSeries
    },
    {
        path: '/stroke-types',
        component: StrokeTypes
    },
    {
        path: '/noisines-types',
        component: NoisinesTypes
    },
    {
        path: '/fastener/fasteners',
        component: Fasteners
    },
    {
        path: '/fastener/types',
        component: FastenerTypes
    },
    {
        path: '/sign/signs',
        component: Signs
    },
    {
        path: '/sign/types',
        component: SignTypes
    },
    {
        path: '/capsule/capsules',
        component: Capsules
    },
    {
        path: '/capsule/dials',
        component: CapsuleDials
    },
    {
        path: '/shaft-types',
        component: ShaftTypes
    },
    {
        path: '/shafts',
        component: Shafts
    },
    {
        path: '/clock-cases',
        component: ClockCases
    },
    {
        path: '/clock-dials',
        component: ClockDials
    },
    {
        path: '*',
        component: E404
    },
    {
        path: '/delyvery-types',
        component: delyveryTypes
    }
];

export const router = new VueRouter({
    routes/*,
    mode: 'history'*/
});