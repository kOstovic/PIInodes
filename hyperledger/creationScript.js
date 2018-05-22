const http = require('http');
var fs = require('fs');
const rp = require('request-promise')
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');

const namespace = 'org.szg';
const assetType = 'UniversityComponent';
const assetNS = namespace + '.' + assetType;
const participantType = 'Member';
const participantType2 = 'SystemAdministrator';
const participantNS = namespace + '.' + participantType;
const participantNS2 = namespace + '.' + participantType2;
const hour = 3600;
const minute = 60;


module.exports = {
    creationScript: async function(){
        var somebody, somebody1, somebody2, somebody3, somebody4, somebody5;
        const cardName = "admin@pii-szg-network";
        bizNetworkConnection = new BusinessNetworkConnection();
        businessNetworkDefinition = await bizNetworkConnection.connect(cardName);

        const assetRegistry = await bizNetworkConnection.getAssetRegistry(assetNS);
        const memberRegistrySys = await bizNetworkConnection.getParticipantRegistry(participantNS2);
        const memberRegistry = await bizNetworkConnection.getParticipantRegistry(participantNS);

        let factory = businessNetworkDefinition.getFactory();
        var FERRelation = factory.newRelationship('org.szg', 'UniversityComponent', '0036');
        var FSBRelation = factory.newRelationship('org.szg', 'UniversityComponent', '0035');
        var FFZGRelation = factory.newRelationship('org.szg', 'UniversityComponent', '1111');
        
        //this is commentted caouse it is already added to chaincode
        var assetFER = factory.newResource('org.szg', 'UniversityComponent', '0036');
        assetFER.opening = 5*hour;
        assetFER.closing = 23*hour;
        assetFER.universityName = "FER";
        // Create a new relationship for the owner
        
        var assetFSB = factory.newResource('org.szg', 'UniversityComponent', '0035');
        assetFSB.opening = 7*hour;
        assetFSB.closing = 21*hour;
        assetFSB.universityName = "FSB";
        
        var assetFFZG = factory.newResource('org.szg', 'UniversityComponent', '1111');
        assetFFZG.opening = 8*hour;
        assetFFZG.closing = 20*hour;
        assetFFZG.universityName = "FFZG";
        
        //add assets to registry and 
        await assetRegistry.addAll([assetFER, assetFSB, assetFFZG]);
        
        //add system adminitrators
        somebody4 = factory.newResource(namespace, participantType2, '0036000000');
        somebody4.firstName = 'sistemskiFER';
        somebody4.lastName = 'adminic';
        somebody4.memberType = 'Staff';
        somebody4.tid = "E200341201301700026A9999";
        somebody4.universityComponent = FERRelation;
        somebody4.jobPosition = "sistemAdmin";
        await memberRegistrySys.add(somebody4);
        
        somebody1 = factory.newResource(namespace, participantType2, '0035000000');
        somebody1.firstName = 'sistemskiFSB';
        somebody1.lastName = 'adminic';
        somebody1.memberType = 'Staff';
        somebody1.tid = "E200341201301700026A9998";
        somebody1.universityComponent = FSBRelation;
        somebody1.jobPosition = "sistemAdmin";
        await memberRegistrySys.add(somebody1);
        
        var somebody4 = factory.newResource(namespace, participantType2, '1111000000');
        somebody4.firstName = 'sistemskiFFZG';
        somebody4.lastName = 'adminic';
        somebody4.memberType = 'Staff';
        somebody4.tid = "E200341201301700026A9997";
        somebody4.universityComponent = FFZGRelation;
        somebody4.jobPosition = "sistemAdmin";
        await memberRegistrySys.add(somebody4);
        
        
        //adding 40 other participants
        somebody = factory.newResource(namespace, participantType, '0036111110');
        somebody.firstName = 'marko';
        somebody.lastName = 'markic';
        somebody.memberType = 'Student';
        somebody.tid = "E200341201301700026A6B21";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '0036111111');
        somebody2.firstName = 'ana';
        somebody2.lastName = 'anic';
        somebody2.memberType = 'Student';
        somebody2.tid = "E200341201301700026A6B92";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '0036111112');
        somebody3.firstName = 'ss';
        somebody3.lastName = 'cc';
        somebody3.memberType = 'Student';
        somebody3.tid = "E200341201301700026A6B23";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '0036111114');
        somebody5.firstName = 'gg';
        somebody5.lastName = 'tt';
        somebody5.memberType = 'Student';
        somebody5.tid = "E200341201301700026A6B24";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        
        somebody = factory.newResource(namespace, participantType, '0036111115');
        somebody.firstName = 'marki';
        somebody.lastName = 'markic';
        somebody.memberType = 'Student';
        somebody.tid = "E200341201301700026A6B25";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '0036111116');
        somebody2.firstName = 'ana';
        somebody2.lastName = 'aic';
        somebody2.memberType = 'Student';
        somebody2.tid = "E200341201301700026A6B26";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '0036111117');
        somebody3.firstName = 'ss';
        somebody3.lastName = 'cc';
        somebody3.memberType = 'Student';
        somebody3.tid = "E200341201301700026A6B27";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '0036111118');
        somebody5.firstName = 'gsg';
        somebody5.lastName = 'ttd';
        somebody5.memberType = 'Student';
        somebody5.tid = "E200341201301700026A6B28";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        somebody = factory.newResource(namespace, participantType, '0036111119');
        somebody.firstName = 'marki';
        somebody.lastName = 'makic';
        somebody.memberType = 'Student';
        somebody.tid = "E200341201301700026A6B29";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '0036111123');
        somebody2.firstName = 'aa';
        somebody2.lastName = 'ani';
        somebody2.memberType = 'Student';
        somebody2.tid = "E200341201301700026A6B2A";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '0036111133');
        somebody3.firstName = 'stsf';
        somebody3.lastName = 'ctfc';
        somebody3.memberType = 'Profesor';
        somebody3.tid = "E200341201301700026A6B31";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '0036111143');
        somebody5.firstName = 'gsg';
        somebody5.lastName = 'tttd';
        somebody5.memberType = 'Profesor';
        somebody5.tid = "E200341201301700026A6B32";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        somebody = factory.newResource(namespace, participantType, '0036111153');
        somebody.firstName = 'mertki';
        somebody.lastName = 'mafzkic';
        somebody.memberType = 'Profesor';
        somebody.tid = "E200341201301700026A6B33";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '0036111163');
        somebody2.firstName = 'anda';
        somebody2.lastName = 'adnic';
        somebody2.memberType = 'Profesor';
        somebody2.tid = "E200341201301700026A6B34";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '0036111173');
        somebody3.firstName = 'stsd';
        somebody3.lastName = 'ctdc';
        somebody3.memberType = 'Staff';
        somebody3.tid = "E200341201301700026A6B35";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '0036111183');
        somebody5.firstName = 'gssg';
        somebody5.lastName = 'tstd';
        somebody5.memberType = 'Staff';
        somebody5.tid = "E200341201301700026A6B36";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        
        somebody = factory.newResource(namespace, participantType, '0035111191');
        somebody.firstName = 'meki';
        somebody.lastName = 'afkic';
        somebody.memberType = 'Student';
        somebody.tid = "E200341201301700026A6B38";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '0035111192');
        somebody2.firstName = 'ana';
        somebody2.lastName = 'nic';
        somebody2.memberType = 'Student';
        somebody2.tid = "E200341201301700026A6B41";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '0035111195');
        somebody3.firstName = 'sts';
        somebody3.lastName = 'ckc';
        somebody3.memberType = 'Student';
        somebody3.tid = "E200341201301700026A6B42";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '0035111193');
        somebody5.firstName = 'gskg';
        somebody5.lastName = 'ttdk';
        somebody5.memberType = 'Student';
        somebody5.tid = "E200341201301700026A6B43";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        
        somebody = factory.newResource(namespace, participantType, '0035111194');
        somebody.firstName = 'meki';
        somebody.lastName = 'mafhkic';
        somebody.memberType = 'Student';
        somebody.tid = "E200341201301700026A6B44";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '0035111196');
        somebody2.firstName = 'anha';
        somebody2.lastName = 'aninc';
        somebody2.memberType = 'Student';
        somebody2.tid = "E200341201301700026A6B45";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '0035111197');
        somebody3.firstName = 'sts';
        somebody3.lastName = 'ctcn';
        somebody3.memberType = 'Profesor';
        somebody3.tid = "E200341201301700026A6B46";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '0035111188');
        somebody5.firstName = 'gsg';
        somebody5.lastName = 'ttmd';
        somebody5.memberType = 'Profesor';
        somebody5.tid = "E200341201301700026A6B49";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        somebody = factory.newResource(namespace, participantType, '0035111189');
        somebody.firstName = 'memi';
        somebody.lastName = 'mafkmc';
        somebody.memberType = 'Staff';
        somebody.tid = "E200341201301700026A6B47";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '0035111198');
        somebody2.firstName = 'ana';
        somebody2.lastName = 'amic';
        somebody2.memberType = 'Staff';
        somebody2.tid = "E200341201301700026A6B69";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '0035011199');
        somebody3.firstName = 'sts';
        somebody3.lastName = 'cbc';
        somebody3.memberType = 'Staff';
        somebody3.tid = "E200341201301700026A6B67";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '1111555660');
        somebody5.firstName = 'bsg';
        somebody5.lastName = 'tbd';
        somebody5.memberType = 'Student';
        somebody5.tid = "E200341201301700026A6B58";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        somebody = factory.newResource(namespace, participantType, '1111555661');
        somebody.firstName = 'mebi';
        somebody.lastName = 'mafkib';
        somebody.memberType = 'Student';
        somebody.tid = "E200341201301700026A6B51";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '1111555662');
        somebody2.firstName = 'bna';
        somebody2.lastName = 'vnic';
        somebody2.memberType = 'Student';
        somebody2.tid = "E200341201301700026A6B52";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '1111555663');
        somebody3.firstName = 'sggs';
        somebody3.lastName = 'ctc';
        somebody3.memberType = 'Student';
        somebody3.tid = "E200341201301700026A6B53";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '1111555664');
        somebody5.firstName = 'gsge';
        somebody5.lastName = 'trd';
        somebody5.memberType = 'Profesor';
        somebody5.tid = "E200341201301700026A6B54";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        somebody = factory.newResource(namespace, participantType, '1111555665');
        somebody.firstName = 'mrki';
        somebody.lastName = 'mrfkic';
        somebody.memberType = 'Profesor';
        somebody.tid = "E200341201301700026A6B55";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '1111555666');
        somebody2.firstName = 'anr';
        somebody2.lastName = 'anicr';
        somebody2.memberType = 'Profesor';
        somebody2.tid = "E200341201301700026A6B56";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '1111555667');
        somebody3.firstName = 'stsz';
        somebody3.lastName = 'ctzc';
        somebody3.memberType = 'Profesor';
        somebody3.tid = "E200341201301700026A6B64";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '1111555668');
        somebody5.firstName = 'gzg';
        somebody5.lastName = 'ttz';
        somebody5.memberType = 'Profesor';
        somebody5.tid = "E200341201301700026A6B57";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        
        somebody = factory.newResource(namespace, participantType, '1111555669');
        somebody.firstName = 'meki';
        somebody.lastName = 'mafzzc';
        somebody.memberType = 'Student';
        somebody.tid = "E200341201301700026A6B68";
        somebody.universityComponent = FERRelation;
        
        somebody2 = factory.newResource(namespace, participantType, '1111555657');
        somebody2.firstName = 'azra';
        somebody2.lastName = 'anzc';
        somebody2.memberType = 'Staff';
        somebody2.tid = "E200341201301700026A6B66";
        somebody2.universityComponent = FERRelation;
        
        somebody3 = factory.newResource(namespace, participantType, '1111555656');
        somebody3.firstName = 'sts';
        somebody3.lastName = 'czuc';
        somebody3.memberType = 'Staff';
        somebody3.tid = "E200341201301700026A6B65";
        somebody3.universityComponent = FERRelation;
        
        somebody5 = factory.newResource(namespace, participantType, '1111555655');
        somebody5.firstName = 'gusg';
        somebody5.lastName = 'tud';
        somebody5.memberType = 'Staff';
        somebody5.tid = "E200341201301700026A6B99";
        somebody5.universityComponent = FERRelation;
        
        await memberRegistry.addAll([somebody, somebody2, somebody3,somebody5]);
        
        // Issue the identities
        //this is commentted caouse it is already added to chaincode
        /*identity = await bizNetworkConnection.issueIdentity(participantNS2 + '#0036000000', 'fer@pii-szg-network');
        await importCardForIdentity(ferovacSystemAdminCardName, identity);
        identity = await bizNetworkConnection.issueIdentity(participantNS2 + '#0035000000', 'fsb@pii-szg-network');
        await importCardForIdentity(fsbovacfSystemAdminCardName, identity);
        identity = await bizNetworkConnection.issueIdentity(participantNS2 + '#1111000000', 'ffzg@pii-szg-network');
        await importCardForIdentity(filozofSystemAdminCardName, identity);*/
        
    }
}

require('make-runnable');
