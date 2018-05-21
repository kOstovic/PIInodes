const http = require('http');
var fs = require('fs');
const rp = require('request-promise')
//const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');
const filename = "inputsTest.csv";// inputsTest.csv tid,jmbag - only 1 member; inputs.csv tid,jmbag; inputsTime.csv tid,jmbag,ttime
var port; 
var _universityKey; 
var method; 
var cardName;
bizNetworkConnection =  new BusinessNetworkConnection();
//catching event from that transaction
bizNetworkConnection.on('event', (event) => {
    console.log("Access "+ event.memberAccessBool+" for "+event.memberAccess.member.$identifier+" at "+_universityKey+" in "+event.timestamp+"\n");
});

//promise to get random number of the line
async function getRandomLine(lines) {
  return new Promise((resolve, reject) => {
    resolve(Math.floor(Math.random()*(lines.length -1)));
  });
}

//transform byte JMBAG to string ascii jmbag
async function stringFromArray(data)
{
  var count = data.length;
  var str = "";
  
  for(var index = 0; index < count; index += 2)
  str += String.fromCharCode(Number(data[index]*10)+Number(data[index+1])+18); 
  return str.substring(0, 10);
}

module.exports = {
  serverStart: async function(config){
    switch(config){ //config
      case "FER":  port = 3001 //FER 3001, FSB 3002, FFZG 3003
                  _universityKey = "0036"; //0036 FER, 0035 FSB, 1111 FFZG
                  method = "CheckAccessFER"; //CheckAccessFER, CheckAccessFSB, CheckAccessFFZG
                  cardName = "fer@pii-szg-network"; // fer@pii-szg-network , fsb@pii-szg-network, ffzg@pii-szg-network
                  businessNetworkDefinition = await bizNetworkConnection.connect(cardName);
                  break;
      case "FSB":  port = 3002 //FER 3001, FSB 3002, FFZG 3003
                  _universityKey = "0035"; //0036 FER, 0035 FSB, 1111 FFZG
                  method = "CheckAccessFSB"; //CheckAccessFER, CheckAccessFSB, CheckAccessFFZG
                  cardName = "fsb@pii-szg-network"; // fer@pii-szg-network , fsb@pii-szg-network, ffzg@pii-szg-network
                  businessNetworkDefinition = await bizNetworkConnection.connect(cardName);
                  break;
      case "FFZG": port = 3003 //FER 3001, FSB 3002, FFZG 3003
                  _universityKey = "1111"; //0036 FER, 0035 FSB, 1111 FFZG
                  method = "CheckAccessFFZG"; //CheckAccessFER, CheckAccessFSB, CheckAccessFFZG
                  cardName = "ffzg@pii-szg-network"; // fer@pii-szg-network , fsb@pii-szg-network, ffzg@pii-szg-network
                  businessNetworkDefinition = await bizNetworkConnection.connect(cardName);
                  break;
      default: port = 3004 //FER 3001, FSB 3002, FFZG 3003
              _universityKey = "0036"; //0036 FER, 0035 FSB, 1111 FFZG
              method = "CheckAccessFER"; //CheckAccessFER, CheckAccessFSB, CheckAccessFFZG
              cardName = "admin@pii-szg-network"; // fer@pii-szg-network , fsb@pii-szg-network, ffzg@pii-szg-network
              businessNetworkDefinition = await bizNetworkConnection.connect(cardName);
              break;
    }
    
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
        await fs.readFile(filename, async function(err, data){
          if(err) { 
            console.log(err); 
            throw err;
          }
          
          //reading line from file and extracting information
          var lines =  await data.toString().split('\n');
          _lineNum = await getRandomLine(lines);
          let _line = lines[_lineNum];
          console.log("Sending this line from inputs.csv to chaincode "+_line);
          let _rows =  _line.split(',');
          let _tid =  _rows[0];
          let _jmbag = await stringFromArray(_rows[1]);
          
          //forming new transaction and sending transaction to chaincode
          let factory = businessNetworkDefinition.getFactory();
          let transaction    = factory.newTransaction('org.szg', method);
          transaction.universityComponent  = factory.newRelationship('org.szg', 'UniversityComponent', _universityKey);
          transaction.member = factory.newRelationship('org.szg', 'Member', _jmbag);
          transaction.tid = _tid;
          
          //sending transaction to chaincode        
          await bizNetworkConnection.submitTransaction(transaction);
          
        });  
      }, 10000);
    })
  }
}

require('make-runnable');