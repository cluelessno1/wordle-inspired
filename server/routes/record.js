const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

const queryDB = require("../queryDataFromDB.js");

// This section will help you get a list of all the records.
recordRoutes.route("/record").post(async function (req, res) {
    // console.log("In post method");
    let workTitle = req.body.title;
    // console.log(workTitle);
    let workListBasedOnTitle = await queryDB.queryData(workTitle);
    res.json(workListBasedOnTitle);
    console.log(workListBasedOnTitle);
});

module.exports = recordRoutes;