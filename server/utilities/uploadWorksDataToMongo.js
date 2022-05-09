const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.okqft.mongodb.net/OpenLibraryData?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('E:/SDE_Career/uploadTest.txt'),
    output: process.stdout,
    terminal: false
});

// async function uploadRow (myobj) {
//     client.connect(async function (err) {
//         const collection = client.db("OpenLibraryData").collection("works");
//         // perform actions on the collection object
//         await collection.insertOne(myobj);
//         client.close();
//     });
// }

async function readData (line) {
    return new Promise((resolve, reject) => {
        try {
            let lineJSONData = JSON.parse(line);

            client.connect(async function (err) {
                const collection = client.db("OpenLibraryData").collection("works");
                // perform actions on the collection object
                await collection.insertOne(lineJSONData);
                client.close();
                return resolve("Document(row) successfully uploaded to DB");
            });
            
    
          } catch(err) {
            console.error(err);
            reject(`Data unsuccessfully read.`);
          }
    });    
}

rl.on('line', async function (line) {
    try {
        // count++;
        await readData(line);

    } catch (err) {
        console.log(err);
    }
});

rl.on('close', () => {
    console.log('Done!');
    // console.log(count);
});
