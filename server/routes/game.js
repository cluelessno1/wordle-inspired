const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /game.
const recordRoutes = express.Router();

// const queryDB = require("../dbQueries/queryDataFromDB.js");
const wordleCloneGame = require("../wordleCloneClass.js");

let game = new wordleCloneGame();
let currentBookID = "629776ca682fc21ec1495a2b";
let currentBookHints = [
    "https://i.imgur.com/KG6HCg0.png",

    "https://i.imgur.com/wYcOiEM.png",

    "https://i.imgur.com/Cwqc3XA.png",

    "https://i.imgur.com/ew0BEsP.png",

    "https://i.imgur.com/nueL8Jb.png"
];




// This section will help you get a list of all the records.
recordRoutes.route("/game/new").post(async function (req, res) {
    game.newGame(currentBookID,currentBookHints);
    console.log(game.getCurrentBookID()); 
    console.log(game.getCurrentPlayerHints());
    res.json(game.getCurrentBookID());
});

recordRoutes.route("/game/restart").post(async function (req, res) {
    game.resetStartNewGame();
    console.log(game.getCurrentBookID()); 
    console.log(game.getCurrentPlayerHints());
    res.json("{ 'game':'restart'}");
});

recordRoutes.route("/game/guess").post(async function (req, res) {
    if (game.guess(req.body.bookID)) {
        if (game.getGameStatus()) {
            game.nextQuestion(currentBookID,currentBookHints);
            res.json("{'game':'nextQues'}");
        } else {
            res.json("{ 'game':'over' }");
        }
    } else {
        if (game.getGameStatus()) {
            res.json("{ 'game':'nextTry' }");
        } else {
            res.json("{ 'game':'over' }");
        }
    }
    console.log(game.getCurrentBookID()); 
    console.log(game.getCurrentPlayerHints());
    res.json("{ 'game':'restart'}");
});

module.exports = recordRoutes;