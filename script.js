import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const app = createApp({
    data() {
        return {
            myList: [],
        };
    },
    methods: {
    }

})

const vm = app.mount('#app')
window.app = vm