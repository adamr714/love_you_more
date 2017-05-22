const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Schema
const {Canned} = require('./models/canned');

const app = express();


//Get
router.get('/', async (req, res) => {
  let data = await Canned.find().exec();
  res.status(200).json(data);
});

// Post Section
router.post('/', jsonParser, async (req, res) => {
  console.log(req.body);
  const requiredFields = ['short', 'message'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  try {
    let data = await Canned
      .create({
        short: req.body.short,
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
      let data = await Canned.find().exec();
      res.status(200);
    }
    catch(err) {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    }
});

// Put Section
router.put('/:id', jsonParser, async (req, res) => {
  const requiredFields = ['short', 'message'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body._id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body._id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Messages  \`${req.params.id}\``);

  const updateableFields = ['short', 'message'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Canned
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(data => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;