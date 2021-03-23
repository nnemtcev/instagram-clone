const Like = require('../models/like');
const Post = require('../models/photo');

const likePost = (req, res, next) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err) {
      return next(err);
    }

    if (!post) {
      return next({ message: 'The post was not found.' });
    }

    post.numLikes++;
    post.save();
    
    const newLike = new Like({
      userIdOfLiker: req.body.userIdOfLiker,
      contentId: req.params.postId,
      onModel: 'Post',
      timestamp: new Date()
    });

    newLike.save(err => {
      if (err) {
        return next(err);
      }

      res.send('POST SUCCESSFULLY LIKED');
    });
  });
};

const unlikePost = (req, res, next) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err) {
      return next(err);
    }

    if (!post) {
      return next({ message: 'The post was not found.' });
    }

    post.numLikes--;
    post.save();

    Like.deleteOne({ userIdOfLiker: req.body.userIdOfLiker }, (err, like) => {
      if (err) {
        return next(err);
      }

      if (!like) {
        return next({ message: 'You have not liked the post yet.' });
      }

      res.send('LIKE SUCCESSFULLY REMOVED FROM POST');
    });
  });
};

const likeComment = (req, res, next) => {
  // TO-DO: FINISH THIS CONTROLLER
};

const unlikeComment = (req, res, next) => {
  // TO-DO: FINISH THIS CONTROLLER
};

module.exports = {
  likePost,
  unlikePost,
  likeComment,
  unlikeComment
};