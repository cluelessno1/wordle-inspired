var LineByLineReader = require('line-by-line');
var fs = require('fs');
var readline = require('readline');

let authorsCount = 0;
let authorsArray = [];

startFunc();

async function getAuthorNumber(authorId) {
    return new Promise((resolve, reject) => {
        try {
            // let authorId = lineJSON.authorCode;
            let authorNumberCode = authorId.split('/')[2];
            let authorNumber = authorNumberCode.substring(2, authorNumberCode.length-1);
            return resolve(parseInt(authorNumber));

        } catch (err) {
            console.log(err);
            reject(-1);
        }
    });

}

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
                    console.log("Reading Authors Data. Count is : " + authorsCount);
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
                authorsArray.sort((a,b) => getAuthorNumber(a.authorCode) - getAuthorNumber(b.authorCode));
                console.log("Authors Array Sorted");
                resolve("Author data successfully parsed");
            });
        } catch (err) {
            console.log(err);
        }
    });
}



async function writeData(extractedJSONData) {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFileSync("../../../sortedAuthorsArray.json", JSON.stringify(extractedJSONData) + '\n', 'utf8');
            resolve("File successfully saved.");


        } catch (err) {
            console.error(err);
            reject("File unsuccessfully saved.");
        }
    });
}

async function startFunc() {
    await authorsLineByLine();
    console.log("Finished with Author data");
    await writeData(authorsArray);
    console.log("Sorted Authors Array Saved");
}