const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /game.
const recordRoutes = express.Router();

const queryQues = require("../dbQueries/queryQuestionsFromDB.js");
const wordleCloneGame = require("../wordleCloneClass.js");

let game = null;
let currentQues = null;


// This section will help you get a list of all the records.
recordRoutes.route("/game/new").post(async function (req, res) {
    game = new wordleCloneGame();
    currentQues = await queryQues.queryQuestion("1");
    console.log(currentQues); 
    game.newGame(currentQues.value,currentQues.hints);
    res.json({'game':"new"});
    
});

recordRoutes.route("/game/reset").post(async function (req, res) {
    game.resetStartNewGame();
    res.json("{ 'game':'reset'}");
    // Have to manually call /game/new endpoint from the UI side when doing Reset Game
});

recordRoutes.route("/game/next").post(async function (req, res) {
    currentQues = await queryQues.queryQuestion(`${game.getCurrentQuestionNo()+1}`);
    console.log(currentQues); 
    game.newGame(currentQues.value[0],currentQues.hints);
    res.json({'game':"next"});
    
});

recordRoutes.route("/game/guess").post(async function (req, res) {
    if (game.guess(req.body.bookID)) {
        if (game.getGameStatus()) {
            game.nextQuestion(currentBookID,currentBookHints);
            res.json("{'game':'correct'}");
        } else {
            res.json("{ 'game':'over' }");
        }
    } else {
        if (game.getGameStatus()) {
            res.json("{ 'game':'incorrect' }");
        } else {
            res.json("{ 'game':'over' }");
        }
    }
    // console.log(game.getCurrentBookID()); 
    // console.log(game.getCurrentPlayerHints());
    // res.json("{ 'game':'restart'}");
});

module.exports = recordRoutes;