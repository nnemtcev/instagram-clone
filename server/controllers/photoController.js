const { body, validationResult } = require('express-validator');

const Photo = require('../models/photo');
const Like = require('../models/like');
const Comment = require('../models/comment');

// Get a particular user's Instagram photos:

async function getUsersPhotos(req, res, next) {
  try {
    const { userId } = req.params;
    let photos = await Photo
                          .find({ author: userId })

    photos = await getPhotoLikes(photos);
    photos = await getPhotoComments(photos);

    res.status(200).json({ photos });
  } catch (error) {
    next({
      message: 'Could not find any photos by the given user.',
      statusCode: 404
    });
  }
}

// Get all the trending photos that have a significant number of likes:

async function getTrendingPhotos(req, res, next) {
  let photos = await Photo
                       .find({})
                       .sort({ createdAt: 'desc' })

  photos = await getPhotoLikes(photos);
  photos = await getPhotoComments(photos);

  photos.sort((a, b) => b.likes.length - a.likes.length);

  res.status(200).json({ photos });
}

// Populate each Instagram photo with likes:

async function getPhotoLikes(photos) {
  for (const photo of photos) {
    const likes = await Like.find({ onModel: 'photo', contentId: photo._id });
    photo.likes = likes;
    photo.save();
  }

  return photos;
}

// Populate each Instagram photo with comments:

async function getPhotoComments(photos) {
  for (const photo of photos) {
    const comments = await Comment.find({ photoId: photo._id });
    getCommentLikes(comments);
    photo.comments = comments;
    photo.save();
  }

  return photos;
}

// Populate each comment on the Instagram photo with likes:

async function getCommentLikes(comments) {
  for (const comment of comments) {
    const likes = await Like.find({ onModel: 'comment', contentId: comment._id });
    comment.likes = likes;
    comment.save();
  }

  return comments;
}

// Get a particular Instagram photo given the photoId:

async function getPhotoById(req, res, next) {
  try {
    let photo = await Photo
                    .findById(req.params.photoId);

    photo = await getPhotoLikes([photo]);
    photo = await getPhotoComments([photo]);

    res.status(200).json({ photo: photo[0] });
  } catch (error) {
    next({
      message: 'Could not find photo with this photoId.',
      statusCode: 404
    });
  }
}

// Post a photo on Instagram:

const postInstagramPhoto = [
  body('imageURL').isURL(),
  body('caption').escape(),

  async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      next({
        message: 'The image URL you provided is not a valid URL. Please try again.',
        statusCode: 400
      });
    }

    const {
      imageURL,
      caption,
      author
    } = req.body;

    try {
      const photo = await Photo.create({
        imageURL,
        caption,
        createdAt: new Date(),
        author,
        likes: [],
        comments: []
      });

      res.status(200).json({ photo });
    } catch (error) {
        next({
          message: 'An error occurred while trying to post this photo.',
          statusCode: 503
        });
    }
  }
];

// Delete a photo on Instagram that you posted previously:

async function deletePhotoById(req, res, next) {
  try {
    await Photo.deleteOne({ _id: req.params.photoId });
    res.status(200).send('Photo was successfully deleted!');
  } catch (error) {
    next({
      message: 'There was an error while trying to delete this photo.',
      statusCode: 503
    });
  }
}

// Edit a photo on Instagram that you posted previously:

async function editPhotoById(req, res, next) {
  try {
    const photo = await Photo.findById(req.params.photoId);

    if (!photo) {
      res.status(404).send('A photo with the given photoId does not exist.');
    }

    photo.caption = req.body.caption;
    photo.save();

    res.status(200).send('The photo has been successfully edited!');
  } catch (error) {
    next({
      message: 'There was an error in editing this photo.',
      statusCode: 503
    });
  }
}

module.exports = {
  getUsersPhotos,
  getTrendingPhotos,
  getPhotoById,
  postInstagramPhoto,
  deletePhotoById,
  editPhotoById
};