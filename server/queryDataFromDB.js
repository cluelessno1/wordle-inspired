const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({ path: "./config.env" });
// const url = "mongodb+srv://root:root@cluster0.okqft.mongodb.net/OpenLibraryData?retryWrites=true&w=majority";
const url = process.env.ATLAS_URI;

async function queryData (queryString) {
    return new Promise((resolve, reject) => {
        try {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, function(err, db) {
                if (err) throw err;
                var dbo = db.db("OpenLibraryData");
                var query ={ $or: [{ title: {$regex: `${queryString}`,$options:'i'} }, { author: {$regex: `${queryString}`,$options:'i'} }]} ;
                dbo.collection("works").find(query).limit(parseInt(process.env.DB_Query_Return_Limit)).toArray(function(err, result) {
                  if (err) throw err;
                  // console.log(result);
                  db.close();
                  resolve(result);
                });
              });
        } catch (err) {
            console.error(err);
            reject();
        }        
    });        
}

// async function temp () {
//     let a = await queryData('the');
//     console.log(a);
// }
// temp();

module.exports = {queryData};