const Like = require('../models/like');

async function likePhoto(req, res, next) {
  const newLike = new Like({
    userWhoLiked: req.body.userWhoLiked,
    contentId: req.params.photoId,
    onModel: 'photo',
    likedAt: new Date()
  });

  try {
    await newLike.save();
    res.send('Photo was successfully liked!');
  } catch (error) {
    next({
      message: 'There was an error liking this photo.',
      statusCode: 400
    });
  }
}

async function unlikePhoto(req, res, next) {
  try {
    await Like.deleteOne({ userWhoLiked: req.body.userWhoLiked });
    res.send('Photo was successfully deleted!');
  } catch (error) {
    next({
      message: 'There was an error removing your like from this photo.',
      statusCode: 400
    });
  }
}

async function likeComment(req, res, next) {
  const newLike = new Like({
    userWhoLiked: req.body.userWhoLiked,
    contentId: req.params.commentId,
    onModel: 'comment',
    likedAt: new Date()
  });

  try {
    await newLike.save();
    res.send('Comment was successfully liked!');
  } catch (error) {
    next({
      message: 'There was an error liking this comment.',
      statusCode: 400
    });
  }
}

async function unlikeComment(req, res, next) {
  try {
    await Like.deleteOne({ userWhoLiked: req.body.userWhoLiked });
    res.send('Comment was successfully deleted!');
  } catch (error) {
    next({
      message: 'There was an error removing your like from this comment.',
      statusCode: 400
    });
  }
}

module.exports = {
  likePhoto,
  unlikePhoto,
  likeComment,
  unlikeComment
};