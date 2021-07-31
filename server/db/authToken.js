const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const tokenSchema = new mongoose.Schema({
  lastUsed: { type: 'Date', default: Date.now, required: true },
  userAgent: String,
  revoked: Boolean,
  userId: { type: ObjectId, required: true, ref: 'User' },
});


const AuthToken = mongoose.model('AuthToken', tokenSchema);

module.exports = {
  AuthToken,
}
;
