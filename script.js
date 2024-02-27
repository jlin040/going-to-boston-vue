import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      firstPlayer: 1,
      p1die: "",
      p2die: "",
      firstDetermined: false,
      playing: false,
      maxRounds: "",
      die: [0, 0, 0],
      currentRound: 1,
      currentPlayer: 1,
      p1score: 0,
      p1rounds: 0,
      p2score: 0,
      p2rounds: 0,
      roundOver: false,
      winner: "",
      winnerDetermined: false
    };
  },
  methods: {
    startGame() {
        if (this.maxRounds === "") {
          alert("Please set the number of rounds.");
        } 
        else {
          this.playing = true;
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
      this.roundOver = false,
      this.winner = "",
      this.winnerDetermined = false
    },
    checkOdd() { 
      if (this.maxRounds % 2 == 0) this.maxRounds++
    },
    rollDice() {
      if (this.roundOver) {
        this.checkWinner();
        this.currentRound++
        this.roundOver = false
        this.p1score = 0
        this.p2score = 0
        return
      }

      this.die = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      
      // testing tie
      // this.die = [
      //   Math.floor(Math.random() * 2) + 1,
      //   Math.floor(Math.random() * 2) + 1,
      //   Math.floor(Math.random() * 2) + 1,
      // ];


      if (this.currentPlayer === 1) {
        this.p1score += this.die.reduce((sum, value) => sum + value, 0);
      } else {
        this.p2score += this.die.reduce((sum, value) => sum + value, 0);
      }



      if (this.currentPlayer !== this.firstPlayer) {
        if (this.p1score > this.p2score) {
          this.p1rounds++;
        } else  if (this.p2score > this.p1score) {
          this.p2rounds++;
        } else {
          this.tieBreak()
          return
        }
        this.roundOver = true;
      }

      this.currentPlayer = 3 - this.currentPlayer;
    },
    checkWinner() {
      if (this.currentRound == this.maxRounds || this.checkMajority(this.p1rounds) || this.checkMajority(this.p2rounds)) {
        this.winnerDetermined = true;
        this.playing = false;
    
        if (this.p1rounds > this.p2rounds) {
          this.winner = "Player 1";
        } else if (this.p2rounds > this.p1rounds) {
          this.winner = "Player 2";
        }
      }
    },
    checkMajority(a) {
      console.log("checking" + a)
      if (a > this.maxRounds / 2) {
        console.log(`majority: ${a}`)
        return true
      }
      else return false
    },
    tieBreak() {
      alert("breaking tie")
      // this.p1score = 0
      // this.p2score = 0
      this.currentPlayer = this.firstPlayer
      this.rollDice()
    },
    tieBreak1() {
      alert("breaking tie")
      // this.p1score = 0
      // this.p2score = 0
      this.chooseFirst()
      return
    },
    chooseFirst() {
      this.p1die = Math.floor(Math.random() * 6) + 1
      this.p2die = Math.floor(Math.random() * 6) + 1
      if (this.p1die > this.p2die) {
        this.firstPlayer = 1;
      } else  if (this.p2die > this.p1die) {
        this.firstPlayer = 2 ;
      } else {
        this.tieBreak1()
        return
      }
    },
    confirmStart() {
      this.firstDetermined = true
    }
  },
});

const vm = app.mount('#app');
window.app = vm;
