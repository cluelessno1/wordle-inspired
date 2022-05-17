var LineByLineReader = require('line-by-line');

async function getAuthorNumber(authorId) {
    // let authorId = lineJSON.authorCode;
    let authorNumber = authorId.split('/')[2].substring(2, 10);
    return authorNumber;
}

async function binarySearch(l, r, x){
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
 
        // If the element is present at the middle
        // itself
        if (getAuthorNumber(authorsArray[mid].authorCode) === x)
            return authorsArray[mid].authorName?authorsArray[mid].authorName:null;
 
        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (getAuthorNumber(authorsArray[mid].authorCode) > x)
            return binarySearch(l, mid - 1, x);
 
        // Else the element can only be present
        // in right subarray
        return binarySearch(mid + 1, r, x);
    }
 
    // We reach here when element is not
    // present in array
    return -1;
}

let authorsCount = 0;
let worksCount = 0;
let authorsArray = [];
let worksArray = [];
temp();

async function authorsLineByLine() {
    return new Promise((resolve, reject) => {
        try {
            // let lrAuthors = new LineByLineReader('E:/SDE_Career/authorsData.json');
            var fs = require('fs');
            var readline = require('readline');

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
                if (authorsCount === 0) {
                    console.log("Reading Authors Data");
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
            let lrWorks = new LineByLineReader('E:/SDE_Career/uploadTest2.json');
            console.log("In Work Data Function");
            lrWorks.on('error', async function (err2) {
                // 'err' contains error object
                console.log("Error while parsing Work data")
                console.log(err2);
                reject("Error while parsing Work data");
            });

            lrWorks.on('line', async function (line2) {
                // 'line' contains the current line without the trailing newline character.
                if (worksCount === 0) {
                    console.log("Reading Works Data");
                }
                let lineJSONData = JSON.parse(line2);
                
                let newJSON = {
                    title: lineJSONData.title,
                    // author: binarySearch(0,authorsArray.length-1,getAuthorNumber(lineJSONData.authorCode))
                    author: authorsArray.find(JSONobj => JSONobj.authorCode === lineJSONData.authorCode).authorName
                }
                
                worksArray.push(newJSON);
                worksCount++;
            });

            lrWorks.on('end', async function () {
                // All lines are read, file is closed now.

                console.log("Done!");
                console.log("Count is : " + worksCount);
                console.log("Length of works array is :" + worksArray.length);
                // lrWorks.close();
                resolve("Work data successfully parsed");
            });
        } catch (err) {
            console.log(err);
        }
    });
}

async function temp() {
    await authorsLineByLine();
    console.log("Finished with Author data");
    await worksLineByLine();
    console.log("Finished with Work data");
    console.log(worksArray);
    // await authorsLineByLine();
    // console.log("Finished with Author data");
}