const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  password: String,
  dateAdded: { type: 'Date', default: Date.now, required: true },
});


const User = mongoose.model('User', userSchema);

module.exports = {
  User,
}
;
