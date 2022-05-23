const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.okqft.mongodb.net/OpenLibraryData?retryWrites=true&w=majority";
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('E:/SDE_Career/completeData.json');

lr.on('error', function (err) {
	// 'err' contains error object
    console.log(err);
});

// Used the line-by-line module because of this very insightful answer https://stackoverflow.com/a/44277990
// This module implements the pause stream feature literally instead of what readline does.

let count=0;

let arr = [];

async function inserMultipleDataToDB(lineJSONData) {

    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db("OpenLibraryData");

        let collection = db.collection('works');

        const options = { ordered: true };

        let res = await collection.insertMany(lineJSONData,options);

        // console.log(res);
        console.log(`${res.insertedCount} documents were inserted`);

    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
}

async function tempFunc (arr,count) {
    console.log("The current count is: "+count);
    // console.log(arr);
    await inserMultipleDataToDB(arr);
}

lr.on('line', async function (line) {
	// 'line' contains the current line without the trailing newline character.
    let lineJSONData = JSON.parse(line);
    arr.push(lineJSONData);
    count++;
    if (count > 15000000) {
        lr.close();
    }
    if (count%100000==0) {
        lr.pause();
        await tempFunc(arr,count);
        arr = [];
        lr.resume();
    }
});

lr.on('end', async function () {
	// All lines are read, file is closed now.

    await tempFunc(arr,count);

    console.log("Done!");
    console.log(count);
});