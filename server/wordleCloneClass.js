class wordleCloneGame {
    constructor() {
        this.totalQuestions = 1;
        this.currentQuesNo = 0;
        // The below array will store the number corresponding to the number of tries to get the correct answer, if the correct answer can't be given by the player, then -1 will be stored for that question.
        this.quesAnswers = [];
        this.gameStatus = false;
        this.currentBookID = null;
        this.tries = 5;
        this.totalHintsForCurrentBookID = null;
        this.hintsForPlayer = [];
    }

    getTotalQuestions() {
        return this.totalQuestions;
    }

    getCurrentQuestionNo() {
        return this.currentQuesNo;
    }

    getQuesAnswer(quesNo) {
        return this.quesAnswers[quesNo];
    }

    setQuesAnswer(quesNo, triesTaken) {
        this.quesAnswers[quesNo]=triesTaken;
    }

    getTries() {
        return this.tries;
    }

    decrementTries() {
        this.tries--;
    }

    getGameStatus() {
        return this.gameStatus;
    }

    setGameStatus(gameStatus) {
        this,gameStatus = gameStatus;
    }

    getCurrentBookID() {
        return this.currentBookID;
    }

    getCurrentPlayerHints() {
        return this.hintsForPlayer;
    }

    resetStartNewGame() {
        this.totalQuestions = 1;
        this.currentQuesNo = 0;
        // The below array will store the number corresponding to the number of tries to get the correct answer, if the correct answer can't be given by the player, then -1 will be stored for that question.
        this.quesAnswers = [];
        this.setGameStatus(false);
        this.currentBookID = null;
        this.tries = 5;
        this.totalHintsForCurrentBookID = null;
        // this.hintsForPlayer = [];
        this.newGame();
    }

    newGame(currentBookID, totalHintsForCurrentBookID) {
        this.currentQuesNo = 1;
        this.setGameStatus(true);
        this.currentBookID = currentBookID;
        this.totalHintsForCurrentBookID = totalHintsForCurrentBookID;
        this.hintsForPlayer.push(this.totalHintsForCurrentBookID[5-this.getTries()]);
    }

    nextQuestion(currentBookID, totalHintsForCurrentBookID) {
        this.currentQuesNo++;
        if (this.getCurrentQuestionNo() > this.getTotalQuestions()) {
            this.setGameStatus(false);
        } else {
            this.tries = 5;
            this.currentBookID = currentBookID;
            this.totalHintsForCurrentBookID = totalHintsForCurrentBookID;
            this.hintsForPlayer = [];
            this.hintsForPlayer.push(this.totalHintsForCurrentBookID[5-this.getTries()]);            
        }
    }

    guess(guessBookID) {
        let gameStatus;
        if (this.getTries() > 0 && this.getGameStatus() === true) {
            if (this.getCurrentBookID() === guessBookID) {
                gameStatus = true;
                this.setQuesAnswer(this.getCurrentQuestionNo(),this.getTries());
            } else {
                gameStatus = false;
            }
            this.decrementTries();
            if (this.getTries > 0) {
                this.hintsForPlayer.push(this.totalHintsForCurrentBookID[5-this.getTries]);
            }
        } else {
            // this.setGameStatus(false);
            gameStatus = false;
            this.setQuesAnswer(this.getCurrentQuestionNo(),-1);
        }
        return gameStatus;
    }

}

module.exports = wordleCloneGame;