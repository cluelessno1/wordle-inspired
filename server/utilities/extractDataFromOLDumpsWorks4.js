var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('E:/SDE_Career/ol_dump_works_2022-03-29.txt'),
    output: process.stdout,
    terminal: false
});

fs.unlinkSync("../../../worksData.json");

let count = 0;

async function readData (line) {
    return new Promise((resolve, reject) => {
        try {
            let lineData = line.substring(line.indexOf('{'));
            let lineJSONData = JSON.parse(lineData);

            let extractedJSONData;
            if (lineJSONData.authors) {
                if (lineJSONData.authors[0].author) {
                    extractedJSONData = {
                        title: lineJSONData.title,
                        authorCode: lineJSONData.authors[0].author.key,
                        worksCode: lineJSONData.key
                    }
                } else {
                    extractedJSONData = {
                        title: lineJSONData.title,
                        authorCode: null,
                        worksCode: lineJSONData.key
                    }
                }        
            } else {
                extractedJSONData = {
                    title: lineJSONData.title,
                    authorCode: null,
                    worksCode: lineJSONData.key
                }
            }

            return resolve(extractedJSONData);
            
    
          } catch(err) {
            console.error(err);
            reject(`Data unsuccessfully read. ${count}`);
          }
    });    
}

async function writeData (extractedJSONData) {
    return new Promise((resolve, reject) => {
        try {    
            fs.appendFileSync("../../../worksData.json", JSON.stringify(extractedJSONData)+'\n', 'utf8');
            resolve("File successfully parsed.");
            
    
          } catch(err) {
            console.error(err);
            reject("File unsuccessfully parsed.");
          }
    });
}

rl.on('line', async function (line) {
    try {
        count++;
        let obj1 = await readData(line);
        await writeData(obj1);

    } catch (err) {
        console.log(err);
    }  
});

rl.on('close', () => {
    console.log('Done!');
    console.log(count);
});

