const Comment = require('../models/comment');

const getCommentsForPost = (req, res, next) => {
  Comment.find({ postId: req.params.postId }, (err, comments) => {
    if (err) {
      return next(err);
    }

    return res.json(comments);
  });
};

const getCommentById = (req, res, next) => {
  Comment.findById(req.params.commentId, (err, comment) => {
    if (err) {
      return next(err);
    }

    if (!comment) {
      return next({ message: 'A comment with this ID does not exist.' });
    }

    return res.json(comment);
  });
};

const leaveCommentOnPost = (req, res, next) => {
  const newComment = new Comment({
    userIdOfCommenter: req.body.userId,
    body: req.body.body,
    timestamp: new Date(),
    listOfReplies: [],
    postId: req.params.postId
  });

  newComment.save(err => {
    if (err) {
      return next(err);
    }
  });
};

module.exports = { getCommentsForPost, getCommentById, leaveCommentOnPost };