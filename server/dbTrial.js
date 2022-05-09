const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.okqft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(async function (err) {
    const collection = client.db("myFirstDatabase").collection("devices");
    // perform actions on the collection object
    let myobj = {
        name: 'Hello',
        position: 'Hello',
        level: 'Hello',
    };
    await collection.insertOne(myobj);
    client.close();
});
