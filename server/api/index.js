const router = require('express').Router();
module.exports = router;
const { attachUserToRequest } = require('../middleware/authMiddleware');


router.use(attachUserToRequest);
router.use('/user', require('./user'));

router.use((req, res, next) => {
  const error = new Error('Not Found Here');
  error.status = 404;
  next(error);
})
;
