require("dotenv").config({ path: "./config.env" });

class wordleCloneGame {
    constructor() {
        this.totalQuestions = process.env.TOTAL_QUES;
        this.currentQuesNo = 0;
        // The below array will store -1 by default or if skipped, 1 if the player gives the correct answer, 0 if the player gives the incorrect answer.
        this.quesAnswers = new Array(this.totalQuestions).fill(-1);
        this.gameStatus = false;
        this.currentBookID = null;
        // this.tries = 5;
        this.hintForCurrentBookID = null;
        // this.hintsForPlayer = [];
    }

    getTotalQuestions() {
        return this.totalQuestions;
    }

    getCurrentQuestionNo() {
        return this.currentQuesNo;
    }

    getQuesAnswer(quesNo) {
        return this.quesAnswers[quesNo-1];
    }

    setQuesAnswer(quesNo, answerFlagNo) {
        if (answerFlagNo === 0) {
            this.quesAnswers[quesNo-1] = 0; // incorrect answer given for ques
        } else if (answerFlagNo === 1) {
            this.quesAnswers[quesNo-1] = 1; // correct answer given for ques.
        }
        // else, ques is skipped, the value will remain -1
    }

    // getTries() {
    //     return this.tries;
    // }

    // decrementTries() {
    //     this.tries--;
    // }

    getGameStatus() {
        return this.gameStatus;
    }

    setGameStatus(gameStatus) {
        this,gameStatus = gameStatus;
    }

    getCurrentBookID() {
        return this.currentBookID;
    }

    getCurrentQuesHint() {
        return this.hintForCurrentBookID;
    }

    resetStartNewGame() {
        this.totalQuestions = process.env.TOTAL_QUES;
        this.currentQuesNo = 0;
        // The below array will store -1 by default or if skipped, 1 if the player gives the correct answer, 0 if the player gives the incorrect answer.
        this.quesAnswers = new Array(this.totalQuestions).fill(-1);
        this.setGameStatus(false);
        this.currentBookID = null;
        // this.tries = 5;
        this.hintForCurrentBookID = null;
        // this.hintsForPlayer = [];
        this.newGame();
    }

    newGame(currentBookID, hintForCurrentBookID) {
        this.currentQuesNo = 1;
        this.setGameStatus(true);
        this.currentBookID = currentBookID;
        this.hintForCurrentBookID = hintForCurrentBookID;
        // this.hintsForPlayer.push(this.hintForCurrentBookID[5-this.getTries()]);
    }

    nextQuestion(currentBookID, hintForCurrentBookID) {
        this.currentQuesNo++;
        if (this.getCurrentQuestionNo() > this.getTotalQuestions()) {
            this.setGameStatus(false);
        } else {
            // this.tries = 5;
            this.currentBookID = currentBookID;
            this.hintForCurrentBookID = hintForCurrentBookID;
            // this.hintsForPlayer = [];
            // this.hintsForPlayer.push(this.hintForCurrentBookID[5-this.getTries()]);            
        }
    }

    guess(guessBookID) {
        let localGameStatus;
        if (this.getGameStatus() === true) {
            if (this.getCurrentBookID() === guessBookID) {
                localGameStatus = true;
                this.setQuesAnswer(this.getCurrentQuestionNo(),1);
            } else {
                localGameStatus = false;
                this.setQuesAnswer(this.getCurrentQuestionNo(),0);
            }
            // this.decrementTries();
            // if (this.getTries > 0) {
            //     this.hintsForPlayer.push(this.hintForCurrentBookID[5-this.getTries]);
            // }
        } else {
            // this.setGameStatus(false);
            localGameStatus = false;
            // this.setQuesAnswer(this.getCurrentQuestionNo(),-1);
        }
        return localGameStatus;
    }

}

module.exports = wordleCloneGame;