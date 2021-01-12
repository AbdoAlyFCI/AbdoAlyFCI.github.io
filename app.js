const app = Vue.createApp({
    data() {
        return {
            gameFiled: [['', '', ''], ['', '', ''], ['', '', '']],
            playerOneScore: 0,
            playerTwoScore: 0,
            draw: 0,
            isThereAWinner: false,
            whoMove: true,
            remainingMoves: 9
        };
    },
    watch: {
        remainingMoves(value) {
            if (value === 0)
                this.draw++;
        }
    },
    computed: {
        playerOneMove() {
            if (this.whoMove == true) {
                return { border: "2px solid black" };
            }
            else {
                return {};
            }
        },
        playerTwoMove() {
            if (this.whoMove == false) {
                return { border: "2px solid black" };
            }
            else {
                return {};
            }
        },

    },
    methods: {
        makeMove(col, row) {
            if (this.gameFiled[col][row] == '' && !this.isThereAWinner) {
                this.gameFiled[col][row] = (this.whoMove) ? 'X' : 'O';

                if (this.checkWinner()) {
                    this.isThereAWinner = true;
                    (this.whoMove) ? this.playerOneScore++ : this.playerTwoScore++;
                }

                this.whoMove = !this.whoMove;
                this.remainingMoves--;
            }
        },
        checkWinner() {
            // CheckRows
            for (let i = 0; i < 3; i++) {
                if (this.checkIdentical(this.gameFiled[i][0], this.gameFiled[i][1], this.gameFiled[i][2]))
                    return true;
            }

            // Check Column
            for (let i = 0; i < 3; i++) {
                if (this.checkIdentical(this.gameFiled[0][i], this.gameFiled[1][i], this.gameFiled[2][i]))
                    return true;
            }

            // Check Diagonal
            if (this.checkIdentical(this.gameFiled[0][0], this.gameFiled[1][1], this.gameFiled[2][2]) ||
                this.checkIdentical(this.gameFiled[0][2], this.gameFiled[1][1], this.gameFiled[2][0]))
                return true;

            return false;
        },
        checkIdentical(c1, c2, c3) {
            if ((c1 === c2 && c2 === c3) && (c1 != '' || c2 != '' || c3 != '')) return true;
            else return false;
        },
        reset() {
            this.gameFiled = [['', '', ''], ['', '', ''], ['', '', '']];
            this.whoMove = true;
            this.isThereAWinner = false;
            this.remainingMoves = 9;
        },
        newGame(){
            this.reset();
            this.playerOneMoveScore = 0;
            this.playerTwoScore= 0;
            this.draw = 0;
        }
    }
});

app.mount('#game');