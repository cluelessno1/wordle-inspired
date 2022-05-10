const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.okqft.mongodb.net/OpenLibraryData?retryWrites=true&w=majority";
var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('E:/SDE_Career/uploadTest2.txt'),
    output: process.stdout,
    terminal: false
});

let count = 0;

async function uploadData(lineJSONData) {

    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("OpenLibraryData");

        let collection = db.collection('works');

        let res = await collection.insertOne(lineJSONData);

        console.log(res);

    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
}

rl.on('line', async function (line) {
    try {
        count++;
        lineJSONData = JSON.parse(line);
        await uploadData(lineJSONData);

    } catch (err) {
        console.log(err);
    }
});

rl.on('close', () => {
    console.log('Done!');
    console.log(count);
});
