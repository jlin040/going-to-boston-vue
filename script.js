import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      firstPlayer: 1,
      p1die: "",
      p2die: "",
      firstDetermined: false,
      playing: false,
      pause: false,
      maxRounds: "",
      dieCount: 3,
      total: 0,
      highest: 0,
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
      this.firstPlayer= 1,
      this.p1die= "",
      this.p2die= "",
      this.firstDetermined= false,
      this.playing = false;
      this.pause = false;
      this.maxRounds = "";
      this.dieCount = 3;
      this.total = 0;
      this.highest = 0;
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
      if (this.pause) this.unpause()
      else {
        this.handleRoundStart()
        console.log("die count is" + this.dieCount)

        let start = 3 - this.dieCount

        for (let i = start; i < 3; i++) {
          let a = this.roll()
          console.log(a)
          this.die[i] = a
          if (this.die[i] > this.highest) this.highest = this.die[i]
        }
        this.total += this.highest;

        if (this.dieCount === 1) {
          if (this.currentPlayer === 1) {
            this.p1score += this.total;
          } else {
            this.p2score += this.total;
          }
          this.handleRoundEnd()
          return
        }
        this.pause = true;
      }
    },
    unpause() {
      this.die[3 - this.dieCount] = this.highest;
      this.dieCount--
      this.pause = false
      this.highest = 0;
    },
    roll() {
      return Math.floor(Math.random() * 6) + 1;
    },
    handleRoundStart() {
      if (this.roundOver) {
        this.checkWinner();
        this.currentRound++
        this.roundOver = false
        this.p1score = 0
        this.p2score = 0
        return
      }
    },
    handleRoundEnd() {
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
      this.dieCount = 3
      this.total = 0;
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
      this.p1score = 0
      this.p2score = 0
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
      this.p1die = Math.floor(Math.random() * 6) + 1;
      this.p2die = Math.floor(Math.random() * 6) + 1;
    
      if (this.p1die > this.p2die) {
        this.firstPlayer = 1;
        alert(`Player 1 starts with a roll of ${this.p1die} vs ${this.p2die}`);
      } else if (this.p2die > this.p1die) {
        this.firstPlayer = 2;
        alert(`Player 2 starts with a roll of ${this.p2die} vs ${this.p1die}`);
      } else {
        this.tieBreak1();
        return;
      }
    
      this.currentPlayer = this.firstPlayer;
      this.firstDetermined = true;
    },
    
    
  },
});

const vm = app.mount('#app');
window.app = vm;
