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


// Delete Section
router.delete('/:id', async (req, res) => {
    try {    
      let data = await Messages.findByIdAndRemove(req.params.id).exec();
      res.status(200).json({message: 'success'});
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


// router.put('/:id', jsonParser, (req, res) => {
//   const requiredFields = ['sender', 'recipient', 'message', 'reference'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//   if (req.params.id !== req.body._id) {
//     const message = `Request path id (${req.params.id}) and request body id (${req.body._id}) must match`;
//     console.error(message);
//     return res.status(400).send(message);
//   }
//   console.log(`Updating blog post \`${req.params.id}\``);

//   const toUpdate = {author:{}};
//   const updateableFields = ['sender', 'recipient', 'message', 'reference'];
//   const authorUpdateableFields = ['lastName', 'firstName'];

//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       toUpdate[field] = req.body[field];
//     }
//   });

//   Messages
//     // all key/value pairs in toUpdate will be updated -- that's what `$set` does
//     .findByIdAndUpdate(req.params.id, {$set: toUpdate})
//     .exec()
//     .then(() => {
//       res.status(204).json({message: 'success'});
//     })
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });

module.exports = router;
