// Message Sender 
// Message Receiver

// Message

const {Messages} = require('../models/messages');

function MessageService() {
    this.getReceivedMessages = function(user) {
        return new Promise(async (resolve, reject) => {
            if (user == null) {
                console.error('User is Null');
                reject('User is Null');    
            };
            let recievedMessage  = await Messages.find({delete: false, recipient : user._id.toString()}).exec();
            console.log("The usere is: " + recievedMessage)
            resolve(recievedMessage);
        });        
    }
}

function MessageCounterRecieved() {
    this.countRecievedMessages = function(user) {
        return new Promise(async (resolve, reject) => {
            if (user == null) {
                console.error('User is Null');
                reject('User is Null');    
            };
            let recievedMessageCount  = await Messages.find({delete: false, recipient : user._id.toString()}).count().exec();
            console.log("Messages Recieved: " + recievedMessageCount)
            resolve(recievedMessageCount);
        });        
    }
}

function MessageCounterSent() {
    this.countSentMessages = function(user) {
        return new Promise(async (resolve, reject) => {
            if (user == null) {
                console.error('User is Null');
                reject('User is Null');    
            };
            let sentMessageCount  = await Messages.find({delete: false, sender : user._id.toString()}).count().exec();
            console.log("Messages Sent: " + sentMessageCount)
            resolve(sentMessageCount);
        });        
    }
}


// db.getCollection('messages').find({delete: false, recipient : '5949c8b1b01dfaac6ae6fe69'}).count() 

module.exports = new MessageService();







