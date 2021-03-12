const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  imageURL: { type: String, required: true },
  caption: { type: String, required: true, maxlength: 1000 },
  timestamp: { type: Date, required: true },
  numLikes: { type: Number, required: true, min: 0 },
  authorUserId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

PostSchema
.virtual('url')
.get(() => {
  this.populate('authorUserId');
  return `/${authorUserId.username}/${this.id}`;
});

module.exports = mongoose.model('post', PostSchema);