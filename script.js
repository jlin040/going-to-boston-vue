import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      playing: false,
      maxRounds: "",
      die: [0, 0, 0],
      currentRound: 1,
      currentPlayer: 1,
      p1score: 0,
      p1rounds: 0,
      p2score: 0,
      p2rounds: 0,
    };
  },
  methods: {
    startGame() {
        if (this.maxRounds === "") {
          alert("Please set the number of rounds.");
        } else {
          const rounds = parseInt(this.maxRounds);
          if (rounds % 2 === 0) {
            alert("Please enter an odd number of rounds.");
          } else {
            this.playing = true;
            this.rollDice();
          }
        }
      },
    reset() {
      this.playing = false;
      this.maxRounds = "";
      this.die = [0, 0, 0];
      this.currentRound = 1;
      this.currentPlayer = 1;
      this.p1score = 0;
      this.p1rounds = 0;
      this.p2score = 0;
      this.p2rounds = 0;
    },
    rollDice() {
      this.die = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];


      if (this.currentPlayer === 1) {
        this.p1score += this.die.reduce((sum, value) => sum + value, 0);
      } else {
        this.p2score += this.die.reduce((sum, value) => sum + value, 0);
      }


      if (this.currentRound % 2 === 0) {
        if (this.p1score > this.p2score) {
          this.p1rounds++;
        } else {
          this.p2rounds++;
        }
      }

      this.currentPlayer = 3 - this.currentPlayer;

      this.currentRound++;


      if (this.currentRound > this.maxRounds) {
        this.playing = false;
      }
    },
  },
});

const vm = app.mount('#app');
window.app = vm;
