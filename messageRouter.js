const express = require('express');
const router = express.Router();
const MessageService = require('./service/messageService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const authenticationService = require('./service/authenticationService'); 

//Schema
const {Messages} = require('./models/messages');

router.use(jsonParser);
authenticationService.initialize(router);

//Get
router.get('/', async (req, res) => {
  let data = await Messages.find({delete: false}).exec();
  res.status(200).json(data);
});

router.post('/send',authenticationService.loginRequired, jsonParser, async (req, res) =>  {
  res.status(200).json({message: 'Hello'});
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
