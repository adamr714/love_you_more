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

module.exports = new MessageService();







