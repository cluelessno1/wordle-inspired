var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('../../testDataWorks.txt'),
    output: process.stdout,
    terminal: false
})

let count = 0;
let a;
let dataArray = [];



function dataJSON (line) {
    try {
        let x = line.substring(line.indexOf('{'));
        // console.log(x);
        // console.log("First is : ");
        // console.log(x[0]);
        // console.log("Second is : ");
        // console.log(x[1]);
        a = JSON.parse(x);
        // console.log(a);
        // console.log(a.authors[0].author.key);
        let y = {
            title: a.title,
            authorCode: a.authors[0].author.key
        }
        // console.log(y);

        dataArray.push(y);

        

      } catch(err) {
        console.error(err)
      }
}

rl.on('line', (line) => {
    // console.log(line);
    dataJSON(line);
    count++;
    // if (count === 1) {
    //     rl.close();
    // }
})

rl.on('close', () => {
    console.log('Done!');
    console.log(count);
    // console.log(a);

    fs.writeFileSync("../../output.json", JSON.stringify(dataArray), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });

})

