var LineByLineReader = require('line-by-line');
let lrWorks = new LineByLineReader('E:/SDE_Career/uploadTest2.txt');
let lrAuthors = new LineByLineReader('E:/SDE_Career/authorsData.json');

async function getAuthorNumber (lineJSON) {
    let authorId = lineJSON.authorCode;
    let authorNumber = authorId.plit('/')[2].substring(2,10);
    return authorNumber;
}

let authorsCount = 0;
let worksCount = 0;
let authorsArray = [];
let worksArray = [];
temp();

async function authorsLineByLine () {
    return new Promise((resolve, reject) => {

        lrAuthors.on('error', async function (err1) {
            // 'err' contains error object
            console.log(err1);
            reject("Error while parsing Author data")
        });

        lrAuthors.on('line', async function (line1) {
            // 'line' contains the current line without the trailing newline character.
            let lineJSONData = JSON.parse(line1);
            authorsArray.push(lineJSONData);
            authorsCount++;
        });
        
        lrAuthors.on('end', async function () {
            // All lines are read, file is closed now.
        
            console.log("Done!");
            console.log("Count is : "+authorsCount);
            console.log("Length of authors array is :"+authorsArray.length);
            resolve("Author data successfully parsed");
        });
    });
}

async function worksLineByLine () {
    return new Promise((resolve, reject) => {

        lrWorks.on('error', async function (err2) {
            // 'err' contains error object
            console.log(err2);
            reject("Error while parsing Work data")
        });

        lrWorks.on('line', async function (line2) {
            // 'line' contains the current line without the trailing newline character.
            let lineJSONData = JSON.parse(line2);
            worksArray.push(lineJSONData);
            worksCount++;
        });
        
        lrWorks.on('end', async function () {
            // All lines are read, file is closed now.
        
            console.log("Done!");
            console.log("Count is : "+worksCount);
            console.log("Length of works array is :"+worksArray.length);
            resolve("Work data successfully parsed");
        });
    });
}

async function temp () {
    // await authorsLineByLine();
    await worksLineByLine();
    await authorsLineByLine();
}