const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://root:root@cluster0.okqft.mongodb.net/OpenLibraryData?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("OpenLibraryData");
    var query = { title: {$regex: "*the*"} };
    dbo.collection("works").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });