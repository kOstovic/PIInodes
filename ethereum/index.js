const http = require('http');
var fs = require('fs');
const rp = require('request-promise')
var Sha1 = require('sha1')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var piiszg_artifacts = require('./piiSZG.json');

var piiSZG = new web3.eth.Contract(piiszg_artifacts.abi, piiszg_artifacts.networks[1337].address);
/*catching event from that transaction
var subscription = web3.eth.subscribe('logs', {
}, function(error, result){
  if (!error)
      console.log("nj "+log);
});*/
var numGas = 200000;
const filename = "inputs.csv"; // inputsTest.csv tid,jmbag - only 1 member; inputs.csv tid,jmbag; inputsTime.csv tid,jmbag,ttime
var port;
var _universityKey, universityKeyHash, universityKeyHashed;
var accounts, account;
const hour = 3600;
const minute = 60;

//promise to get random number of the line
async function getRandomLine(lines) {
  return new Promise((resolve, reject) => {
    resolve(Math.floor(Math.random() * (lines.length - 1)));
  });
}

//transform byte JMBAG to string ascii jmbag
async function stringFromArray(data) {
  var count = data.length;
  var str = "";

  for (var index = 0; index < count; index += 2)
    str += String.fromCharCode(Number(data[index] * 10) + Number(data[index + 1]) + 18);
  return str.substring(0, 10);
}

module.exports = {
  serverStart: async function (config) {
    // Get the initial account and set up config depending on input
    await web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      switch (config) { //config
        case "FER":
          port = 3005 //FER 3005, FFZG 3006, FSB 3007
          _universityKey = "0036"; //0036 FER, 0035 FSB, 1111 FFZG
          universityKeyHash = Sha1(_universityKey);
          universityKeyHashed = "0x" + universityKeyHash;
          account = accounts[0];
          break;
        case "FFZG":
          port = 3006 //FER 3005, FFZG 3006, FSB 3007
          _universityKey = "1111"; //0036 FER, 0035 FSB, 1111 FFZG
          universityKeyHash = Sha1(_universityKey);
          universityKeyHashed = "0x" + universityKeyHash;
          account = accounts[1];
          break;
        case "FSB":
          port = 3007 //FER 3005, FFZG 3006, FSB 3007
          _universityKey = "0035"; //0036 FER, 0035 FSB, 1111 FFZG
          universityKeyHash = Sha1(_universityKey);
          universityKeyHashed = "0x" + universityKeyHash;
          account = accounts[2];
          break;
        default:
          port = 3008 //FER 3005, FFZG 3006, FSB 3007
          _universityKey = "0036"; //0036 FER, 0035 FSB, 1111 FFZG
          universityKeyHash = Sha1(_universityKey);
          universityKeyHashed = "0x" + universityKeyHash;
          account = accounts[0];
          break;
      }
    });

    const requestHandler = (request, response) => {
      console.log(request.url)
      response.end('Hello Node.js Server!')
    }

    //creating server and making it listen on chosen port
    const server = http.createServer(requestHandler);
    await server.listen(port, (err) => {
      if (err) {
        return console.log('something bad happened', err)
      }
      console.log(`server is listening on ${port}`);

      //reapeat every 10 sec
      setInterval(async function () {
        await fs.readFile(filename, async function (err, data) {
          if (err) {
            console.log(err);
            throw err;
          }

          //reading line from file and extracting information
          let lines = await data.toString().split('\n');
          _lineNum = await getRandomLine(lines);
          let _line = lines[_lineNum];
          console.log("\nSending this line from inputs.csv to smart contract " + _line);
          let _rows = _line.split(',');
          let _tid = _rows[0];
          let _jmbag = await stringFromArray(_rows[1]);
          let jmbagHash = Sha1(_jmbag);
          let jmbagHashed = "0x" + jmbagHash;
          let d = new Date();
          let n = Date.now();
          let ttime = d.getHours() * hour + d.getMinutes() * minute + d.getSeconds();
          //console.log(jmbagHashed+" "+ universityKeyHashed+" "+ ttime+" "+ n+" "+ _tid)

          piiSZG.methods.callAccessTransaction(jmbagHashed, universityKeyHashed, ttime, n, _tid).send({
              from: account,
              gas: numGas
            })
            .then(function (retValue) {
              if (JSON.stringify(retValue.events.ControlEvent.returnValues["0"]) == "null")
                console.log("Access false for hashed jmbag " + jmbagHashed + " at hashed university " + universityKeyHashed + " in " + Date(n).toLocaleString())
              else
                console.log("Access " + JSON.stringify(retValue.events.ControlEvent.returnValues["0"]) + " for hashed jmbag " + jmbagHashed + " at hashed university " + universityKeyHashed + " in " + Date(n).toLocaleString())
            })

        });
      }, 10000);
    })
  }
}

require('make-runnable');