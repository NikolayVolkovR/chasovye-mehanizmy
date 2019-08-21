const TestComponent = require('./testComponent.vue');

var vm = new Vue({
    //template: `<div>{{ msg }}</div>`,
    data: {
        msg: 'hello'
    },
    components: {
        TestComponent
    }
})

// предоставляется `vue-server-renderer/basic.js`
renderVueComponentToString(vm, (err, res) => {
    print(res)
})