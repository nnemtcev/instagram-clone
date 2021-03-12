const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, minlength: 10 },
  password: { type: String, required: true, minlength: 6 },
  biography: { type: String, required: true, maxlength: 150, minlength: 5 },
  profilePicture: { type: String, required: true },
  username: { type: String, required: true, minlength: 3, maxlength: 30 },
  signUpDate: { type: Date, required: true }
});

UserSchema
.virtual('url')
.get(() => `/users/${this.id}`);

module.exports = mongoose.model('user', UserSchema);