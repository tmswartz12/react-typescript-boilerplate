const router = require('express').Router();
const axios = require('axios');
const { User } = require('../db');
const AuthTokenService = require('../services/authToken');


module.exports = router
;


router.get('/', async(req, res, next) => {
  console.log('req', req.useragent);
  try {
    const user = await User.create({
      firstName: 'Tyler',
      lastName: 'Swartz',
      password: 'Password',
      email: 'tmswartz12@gmail.com',
    });
    const authToken = await AuthTokenService.create(user, req.useragent);
    return res.json({ user, authToken });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error });
  }
})
;
