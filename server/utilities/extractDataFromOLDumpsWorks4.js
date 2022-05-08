var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('E:/SDE_Career/ol_dump_works_2022-03-29.txt'),
    output: process.stdout,
    terminal: false
});

fs.unlinkSync("../../../output.json");

let count = 0;
// let a;
// let dataArray = [];

async function readData (line) {
    return new Promise((resolve, reject) => {
        try {
            let x = line.substring(line.indexOf('{'));
            let a = JSON.parse(x);
            // console.log(a);
            // console.log(a.authors[0].author.key);
            let y;
            if (a.authors) {
                if (a.authors[0].author) {
                    y = {
                        title: a.title,
                        authorCode: a.authors[0].author.key,
                        worksCode: a.key
                    }
                } else {
                    y = {
                        title: a.title,
                        authorCode: null,
                        worksCode: a.key
                    }
                }        
            } else {
                y = {
                    title: a.title,
                    authorCode: undefined,
                    worksCode: a.key
                }
            }

            return resolve(y);
            
    
          } catch(err) {
            console.error(err);
            reject(`Data unsuccessfully read. ${count}`);
          }
    });
    
}

async function writeData (y) {
    return new Promise((resolve, reject) => {
        try {    
            fs.appendFileSync("../../../output.json", JSON.stringify(y)+'\n', 'utf8');
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
    // console.log(a);

    

})

