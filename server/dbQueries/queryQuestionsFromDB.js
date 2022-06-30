const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({ path: "../config.env" });
// const url = "mongodb+srv://root:root@cluster0.okqft.mongodb.net/OpenLibraryData?retryWrites=true&w=majority";
const url = process.env.ATLAS_URI;

async function queryQuestion (queryQuesNo) {
    return new Promise((resolve, reject) => {
        try {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, async function(err, db) {
                if (err) throw err;
                var dbo = db.db("OpenLibraryData");
                var query ={quesNo : `${queryQuesNo}`};
                let res = await dbo.collection("bookQuestions").findOne(query);
                db.close();
                resolve(res);
              });
        } catch (err) {
            console.error(err);
            reject();
        }        
    });        
}

// async function temp () {
//     let a = await queryQuestion('1');
//     console.log(a);
// }
// temp();

module.exports = {queryQuestion};