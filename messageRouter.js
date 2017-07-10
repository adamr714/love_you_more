const express = require('express');
const router = express.Router();
const MessageService = require('./service/messageService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const authenticationService = require('./service/authenticationService'); 
const userService = require('./service/userService')
//Schema
const {Messages} = require('./models/messages');

router.use(jsonParser);
authenticationService.initialize(router);

//Get
router.get('/', async (req, res) => {
  let data = await Messages.find({delete: false}).exec();
  res.status(200).json(data);
});

router.get('/recieved', authenticationService.loginRequired, async(req, res) => {
  let messages = await MessageService.getReceivedMessages(req.user,5);
  let results = new Array();
  let relatedUser = await userService.findRelatedUser(req.user);

  for (let i=0; i < messages.length; i++) {
    let message = messages[i];
    results.push({
      sender: relatedUser.firstName,
      message: message.message,
      date: message.date
    });
  }
  res.status(200).json(results);
});

router.get('/statistics', authenticationService.loginRequired, async(req, res) => {
  let statisticRecieved = await MessageService.countRecievedMessages(req.user);
  let statisticSent = await MessageService.countSentMessages(req.user);
  res.status(200).json({sent: statisticSent, received: statisticRecieved});
});


router.post('/send',authenticationService.loginRequired, jsonParser, async (req, res) =>  {
  console.log(req.body.message);
    let relatedUser = await userService.findRelatedUser(req.user);
      if (relatedUser !=null) {
          console.log(relatedUser);
          let data = await Messages.create({
                sender: req.user._id.toString(),
                recipient: relatedUser._id.toString(),
                message: req.body.message,
                // date: new Date().toISOString()
            });
        res.status(200).json({message: 'Hello'});   
      } else {
        console.log('Related User Not Found!');
        res.status(404).json({message: 'Related User Not Found'});
      }
});

// Post Section
router.post('/', jsonParser, async (req, res) => {
  console.log(req.body);
  const requiredFields = ['sender', 'recipient', 'message'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  try {
    let data = await Messages
      .create({
        sender: req.body.sender,
        recipient: req.body.recipient,
        message: req.body.message
      });
    res.status(201).json(data);
  }
  catch(err) {
      console.error(err);
      res.status(500).json({error: 'Something went wrong'});
  };
});

// Delete Section - As Update
router.delete('/:id', async (req, res) => {
    let deletedMessage = {delete: true};

    try {    
      let data = await Messages.findByIdAndUpdate(req.params.id, {$set: deletedMessage}).exec();
      console.log(data.message);
      data.message = req.body.message;
      res.status(200).send(data);
    }  catch(err) {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    }
});


// Put Section
router.put('/:id', jsonParser, async (req, res) => {
  const requiredFields = ['message'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  let toUpdate = {message: req.body.message};
 
  try {
    let data = await Messages.findByIdAndUpdate(req.params.id, {$set: toUpdate}).exec();
    data.message = req.body.message;
    res.status(200).send(data);
  }  catch(err) {
    consoler.error(err);
    res.status(500).json({message: 'Internal server error'});
  }
});


module.exports = router;
