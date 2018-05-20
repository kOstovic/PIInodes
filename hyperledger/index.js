const http = require('http');
const port = 3001 //FER 3001, FSB 3002, FFZG 3003
var fs = require('fs'); //a
const rp = require('request-promise')
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');
const filename = "inputsTest.csv";// inputsTest.csv tid,jmbag - only 1 member; inputs.csv tid,jmbag; inputsTime.csv tid,jmbag,ttime
const _universityKey = "0036"; //0036 FER, 0035 FSB, 1111 FFZG
const method = "CheckAccessFER"; //CheckAccessFER, CheckAccessFSB, CheckAccessFFZG
const cardName = "admin@pii-szg-network"; // fer@pii-szg-network , fsb@pii-szg-network, ffzg@pii-szg-network

async function getRandomLine(filename){
  var _line = '';
  fs.readFile(filename, function(err, data){
    if(err) throw err;
    var lines = data.toString().split('\n');
    _line = lines[Math.floor(Math.random()*lines.length)];
    //console.log(_line);
    return _line;
  });
  //console.log(_line);
  return _line;
}

function stringFromArray(data)
{
  var count = data.length;
  var str = "";
  
  for(var index = 0; index < count; index += 2)
  str += String.fromCharCode(Number(data[index]*10)+Number(data[index+1])+18); 
  return str.substring(0, 10);
}

module.exports = {
  serverStart: async function(){
  /*  
  }
};*/
//async function serverStart() {

  const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
  }
  
  const server = http.createServer(requestHandler);
  await server.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
    
    console.log(`server is listening on ${port}`);
    //while(1) { 
      setInterval(async function () {
      await fs.readFile(filename, async function(err, data){
        if(err) throw err;
        var lines = data.toString().split('\n');
        let _line = await lines[Math.floor(Math.random()*lines.length)];
        console.log("Sending this line from inputs.csv to chaincode "+_line);
        let _lines = _line.split(',');
        let _tid = _lines[0];
        let _jmbag = stringFromArray(_lines[1]);
        console.log(_tid+ " "+ _jmbag);
        
        bizNetworkConnection =  new BusinessNetworkConnection();
        businessNetworkDefinition = await bizNetworkConnection.connect(cardName);
        let factory = businessNetworkDefinition.getFactory();
        
        let transaction    = factory.newTransaction('org.szg', method);
        transaction.universityComponent  = factory.newRelationship('org.szg', 'UniversityComponent', _universityKey);
        transaction.member = factory.newRelationship('org.szg', 'Member', _jmbag);
        transaction.tid = _tid;
        bizNetworkConnection.on('event', (event) => {
          console.log("Access "+ event.memberAccessBool+" for "+_jmbag+" at "+_universityKey+" in "+event.timestamp);
        });
        await bizNetworkConnection.submitTransaction(transaction);
      });  
    }, 10000);
    //} //
  })
}
}
//serverStart();
require('make-runnable');