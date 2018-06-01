const http = require('http');
var fs = require('fs');
const rp = require('request-promise')
var Sha1 = require('sha1')
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(web3.version)
var piiszg_artifacts = require('./piiSZG.json');

var piiSZG = new web3.eth.Contract(piiszg_artifacts.abi, piiszg_artifacts.networks[1337].address);
var numGas = 200000;
var port; 
var accounts, account;
const hour = 3600;
const minute = 60;

module.exports = {
    creationScript: async function(){

        let _universityKey, universityKeyHash, universityKeyHashed, _universityComponenetType, _openingTime, _closingTime;
        let jmbag, jmbagHash, jmbagHashed, _personType, _tid;
        await web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
              console.log("There was an error fetching your accounts.");
              return;
          }
          if (accs.length == 0) {
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
          }  
          accounts = accs;
          account = accounts[0];
          });

        //add 3 university components
        //comment out if already made it
        _universityKey = "0036"; //0036 FER, 0035 FSB, 1111 FFZG
        universityKeyHash = Sha1(_universityKey);
        universityKeyHashed = "0x"+universityKeyHash;
        _universityComponenetType = 0;
        _openingTime = 18000;
        _closingTime = 82800;
        piiSZG.methods.createUniversityComponenet(universityKeyHashed, _universityComponenetType, _openingTime, _closingTime).send({from: accounts[0], gas: numGas})
        .then(function(retValue){
          console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+universityKeyHashed))} 
        )

        _universityKey = "1111"; //0036 FER, 0035 FSB, 1111 FFZG
        universityKeyHash = Sha1(_universityKey);
        universityKeyHashed = "0x"+universityKeyHash;
        _universityComponenetType = 1;
        _openingTime = 18000;
        _closingTime = 75600;
        piiSZG.methods.createUniversityComponenet(universityKeyHashed, _universityComponenetType, _openingTime, _closingTime).send({from: accounts[1], gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+universityKeyHashed))}  
        )

        _universityKey = "0035"; //0036 FER, 0035 FSB, 1111 FFZG
        universityKeyHash = Sha1(_universityKey);
        universityKeyHashed = "0x"+universityKeyHash;
        _universityComponenetType = 2;
        _openingTime = 28800;
        _closingTime = 72000;
        piiSZG.methods.createUniversityComponenet(universityKeyHashed, _universityComponenetType, _openingTime, _closingTime).send({from: accounts[2], gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+universityKeyHashed))}  
        )


        //add 40 members
        //samo zadnjeg zapamti, trebalo bi polja da ispiše sve..
        jmbag = "0036111110";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B21";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111111";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B22";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111112";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B23";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111114";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B24";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )
        
        jmbag = "0036111115";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B25";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111116";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B26";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111117";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B27";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111118";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B28";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )
        
        jmbag = "0036111119";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B29";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111123";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B2A";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111133";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B31";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111143";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B32";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111153";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B33";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111163";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B34";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111173";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B35";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111183";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 0;
        _tid = "E200341201301700026A6B36";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111191";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B38";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0036111192";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B41";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111195";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B42";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111193";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B43";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111194";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B44";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111196";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B45";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111188";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B49";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111189";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B47";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111197";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B45";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035111198";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B69";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "0035011199";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 2;
        _tid = "E200341201301700026A6B67";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555660";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B58";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555661";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B51";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555662";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B52";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555663";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B53";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555664";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B54";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555665";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B55";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555666";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B56";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555667";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B64";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555668";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 1;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B57";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555669";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 0;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B68";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555657";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B66";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555656";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B65";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )

        jmbag = "1111555655";
        jmbagHash = Sha1(jmbag);
        jmbagHashed = "0x"+jmbagHash;
        _personType = 2;
        _universityComponenetType = 1;
        _tid = "E200341201301700026A6B99";
        piiSZG.methods.createMember(jmbagHashed, _personType, _universityComponenetType, _tid).send({from: account, gas: numGas})
        .then(function(retValue){
            console.log("Make "+JSON.stringify(retValue.events.ControlEvent.returnValues["0"]+" for "+jmbagHashed))}  
        )   
    }
}

require('make-runnable');
