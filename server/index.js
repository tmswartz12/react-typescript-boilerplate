const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./db');
const useragent = require('express-useragent');
// import sslRedirect from 'heroku-ssl-redirect';
// add "type": "module", to package.json to allow import xxx from './file syntax


module.exports = app;

// if (process.env.NODE_ENV !== 'production') require('../secrets');

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));
  // app.use(sslRedirect());


  // body parsing middleware
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // compression middleware
  app.use(compression());
  app.use(useragent.express());


  app.use('/api', require('./api'));


  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.static(path.join(__dirname, '..', 'dist')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

async function bootApp() {
  await createApp();
  await startListening();
}
bootApp();
