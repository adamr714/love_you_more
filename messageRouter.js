const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Schema
const {Messages} = require('./models/messages');

const app = express();


//Get
router.get('/', async (req, res) => {
  let data = await Messages.find().exec();
  res.status(200).json(data);
});


// Post Section
router.post('/', jsonParser, async (req, res) => {
  console.log(req.body);
  const requiredFields = ['sender', 'recipient', 'message', 'reference'];
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
        message: req.body.message,
        reference: req.body.reference
      });
    res.status(201).json(data);
  }
  catch(err) {
      console.error(err);
      res.status(500).json({error: 'Something went wrong'});
  };
});


// Delete Section
router.delete('/:id', async (req, res) => {
    try {    
      let data = await Messages.find().exec();
      res.status(200).json(data);
    }
    catch(err) {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    }
});


module.exports = router;