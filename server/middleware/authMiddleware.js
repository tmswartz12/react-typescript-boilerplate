const logger = require('pino')();
const jwt = require('jsonwebtoken');
const { User, AuthToken } = require('../db');
const moment = require('moment');

async function attachUserToRequest(req, res, next) {
  logger.info('Checking auth');
  const headerAuth = req.headers.authorization;
  let decodedToken;
  if (headerAuth) {
    logger.info('Header auth present');
    try {
      decodedToken = jwt.verify(headerAuth, process.env.JWT_SECRET);
    } catch (jwtError) {
      logger.error('Error decoding JWT token');
      return next();
    }
  }

  if (!(decodedToken && decodedToken.id && decodedToken.did)) {
    // Cookie and authorization header were unset, proceed without user in request
    logger.info(
      'No jwt in authorization header. Proceed without user in request'
    );
    return next();
  }

  logger.info('Using jwt in authorization header');

  try {
    const [user, authToken] = await Promise.all([
      User.findById(decodedToken.id),
      AuthToken.findById(decodedToken.did),
    ]);
    logger.info('Completed user & token query');

    if (moment(authToken.lastAccessed).add(1, 'hour') < moment()) {
      // If it's been an hour since the token last access time, update it
      authToken.lastAccessed = new Date();
      authToken.save();
    }
    logger.info('User found and attached to req');
    const userObject = user.toObject();
    req.user = userObject;
    return next();
  } catch (err) {
    logger.error('Error in jwt. Continuing unauthed.');
    return next();
  }
}

module.exports = { attachUserToRequest }
;
