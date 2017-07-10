const {Messages} = require('../models/messages');

function MessageService() {
    this.getReceivedMessages = function(user) {
        return new Promise(async (resolve, reject) => {
            if (user == null) {
                console.error('User is Null');
                reject('User is Null');    
            };

            let query = Messages.find({delete: false, recipient : user._id.toString()}).sort({date:-1});
            if (limit != null) {
                query = query.limit(limit);
            }

            let recievedMessage  = await query.exec();
            console.log("The usere is: " + recievedMessage)
            resolve(recievedMessage);
        });        
    }

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

module.exports = new MessageService();







