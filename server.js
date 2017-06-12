// Added Travis.yml
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const messageRouter = require('./messageRouter');
const cannedRouter = require('./cannedRouter');
const userRouter = require('./userRouter');


mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const app = express();

// log the http layer
app.use(morgan('common'));
app.use(bodyParser.json());


app.use(express.static('public'));

app.use('/canned_messages', cannedRouter);
app.use('/messages', messageRouter);
app.use('/users', userRouter);

// app.use('*', function(req, res) {
//   return res.status(404).json({message: 'Not Found'});
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/myprofile', 
  (req, res) => {
  res.sendFile(__dirname + '/views/myprofile.html');
});



let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};






// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });
