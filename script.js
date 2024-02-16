import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data() {
        return {
            playing: false,
            dice1: 0,
            dice2: 0,
            dice3: 0,
        };
    },
    methods: {
        startGame() {
            this.playing = true;
        },
        rollDice() {

        }
    }

})

const vm = app.mount('#app')
window.app = vm