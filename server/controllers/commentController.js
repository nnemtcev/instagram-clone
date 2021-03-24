const Comment = require('../models/comment');

async function createCommentOnPhoto(req, res, next) {
  try {
    const comment = new Comment({
      commenter: req.body.userId,
      body: req.body.body,
      createdAt: new Date(),
      listOfReplies: [],
      photoId: req.params.photoId
    });

    await newComment.save();
    res(200).json({ comment });
  } catch (error) {
    next({
      message: 'Could not create comment for this photo.',
      statusCode: 400
    });
  }
}

async function deleteCommentOnPhoto(req, res, next) {
  try {
    await Comment.deleteOne({ _id: req.params.commentId });
    res.status(200).send('Comment was successfully deleted!');
  } catch (error) {
    next({
      message: 'Could not delete comment for this photo.',
      statusCode: 400
    });
  }
}

// TO-DO: FINISH THIS CONTROLLER
// async function replyToComment(req, res, next) {
//   try {
//     const reply = new Comment({
//       commenter: req.body.userId,
//       body: req.body.body,
//       createdAt: new Date(),
//       listOfReplies: [],
//       photoId: req.params.photoId
//     });
//   } catch (error) {
//     
//   }
// }

module.exports = {
  createCommentOnPhoto,
  deleteCommentOnPhoto
};