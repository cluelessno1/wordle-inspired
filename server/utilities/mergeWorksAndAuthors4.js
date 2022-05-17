var LineByLineReader = require('line-by-line');
var fs = require('fs');
var readline = require('readline');

let authorsCount = 0;
let worksCount = 0;
let authorsArray = [];
// let worksArray = [];
startFunc();

async function authorsLineByLine() {
    return new Promise((resolve, reject) => {
        try {
            const lrAuthors = readline.createInterface({
                input: fs.createReadStream('E:/SDE_Career/authorsData.json'),
                output: process.stdout,
                terminal: false
            });
            console.log("In Author Data Function");
            lrAuthors.on('error', async function (err1) {
                // 'err' contains error object
                console.log("Error while parsing Author data")
                console.log(err1);
                reject("Error while parsing Author data");
            });

            lrAuthors.on('line', async function (line1) {
                // 'line' contains the current line without the trailing newline character.
                if (authorsCount % 1000000 === 0) {
                    console.log("Reading Authors Data. Count is : "+authorsCount);
                }
                let lineJSONData = JSON.parse(line1);
                authorsArray.push(lineJSONData);
                authorsCount++;
            });

            lrAuthors.on('close', async function () {
                // All lines are read, file is closed now.

                console.log("Done!");
                console.log("Count is : " + authorsCount);
                console.log("Length of authors array is :" + authorsArray.length);
                // lrAuthors.close();
                resolve("Author data successfully parsed");
            });
        } catch (err) {
            console.log(err);
        }
    });
}

async function worksLineByLine() {
    return new Promise((resolve, reject) => {
        try {
            let lrWorks = new LineByLineReader('E:/SDE_Career/worksData.json');
            console.log("In Work Data Function");
            lrWorks.on('error', async function (err2) {
                // 'err' contains error object
                console.log("Error while parsing Work data")
                console.log(err2);
                reject("Error while parsing Work data");
            });

            lrWorks.on('line', async function (line2) {
                // 'line' contains the current line without the trailing newline character.
                if (worksCount % 1000000 === 0) {
                    console.log("Reading Works Data. Count is : "+worksCount);
                }
                let lineJSONData = JSON.parse(line2);
                
                let newJSON = {
                    title: lineJSONData.title,
                    author: await authorsArray.find(JSONobj => JSONobj.authorCode === lineJSONData.authorCode).authorName
                }
                
                await writeData(newJSON);

                // worksArray.push(newJSON);
                worksCount++;
            });

            lrWorks.on('end', async function () {
                // All lines are read, file is closed now.

                console.log("Done!");
                console.log("Count is : " + worksCount);
                // console.log("Length of works array is :" + worksArray.length);
                // lrWorks.close();
                resolve("Work data successfully parsed");
            });
        } catch (err) {
            console.log(err);
        }
    });
}

async function writeData (extractedJSONData) {
    return new Promise((resolve, reject) => {
        try {    
            fs.appendFileSync("../../../completeData.json", JSON.stringify(extractedJSONData)+'\n', 'utf8');
            resolve("File successfully parsed.");
            
    
          } catch(err) {
            console.error(err);
            reject("File unsuccessfully parsed.");
          }
    });
}

async function startFunc() {
    fs.unlinkSync("../../../completeData.json");
    await authorsLineByLine();
    console.log("Finished with Author data");
    await worksLineByLine();
    console.log("Finished with Work data");
}