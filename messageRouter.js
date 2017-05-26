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


// Delete Section - As Delete
// router.delete('/:id', async (req, res) => {
//     try {    
//       let data = await Messages.findByIdAndRemove(req.params.id).exec();
//       res.status(200).json({message: 'success'});
//     }  catch(err) {
//       console.error(err);
//       res.status(500).json({error: 'something went terribly wrong'});
//     }
// });

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
