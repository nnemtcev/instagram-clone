const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  userIdOfFollower: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  userIdOfFollowed: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('follow', FollowSchema);