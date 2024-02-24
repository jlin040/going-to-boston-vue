import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data() {
        return {
            playing: false,
            maxRounds: "",
            die: [],
            currentRound: 1
        };
    },
    methods: {
        startGame() {
            if (this.maxRounds == "") alert("please set amount of rounds")
            else {
                this.playing = true;
            }
        },
        reset() {
            this.playing = false;
            this.maxRounds = "";
            this.dice1 = "";
            this.dice2 = "";
            this.dice3 = "";
            this.currentRound = 1;
        },
        odd() {
            if (this.maxRounds % 2 == 0) this.maxRounds++
        },
        rollDice() {

        }
    }

})

const vm = app.mount('#app')
window.app = vm