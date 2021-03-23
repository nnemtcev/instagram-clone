const { body, validationResult } = require('express-validator');

const Photo = require('../models/photo');
const Like = require('../models/like');

// Get a particular user's Instagram photos:

async function getUsersPhotos(req, res, next) {
  try {
    const { userId } = req.params;
    let photos = await Photo
                          .find({ author: userId })

    photos = await getPhotoLikes(photos);

    res.status(200).json({ photos });
  } catch (error) {
    next(error);
  }
};

// Get all the trending photos that have a significant number of likes:

async function getTrendingPhotos(req, res, next) {
  let photos = await Photo
                       .find({})
                       .sort({ createdAt: 'asc' })

  photos = await getPhotoLikes(photos);
  photos.sort((a, b) => b.likes.length - a.likes.length);

  res.status(200).json({ photos });
};

// Populate each Instagram photo with likes:

async function getPhotoLikes(photos) {
  for (const photo of photos) {
    const likes = await Like.find({ onModel: 'photo', contentId: photo._id });
    photo.likes = likes;
    photo.save();
  }

  return photos;
};

// Get a particular Instagram photo given the photoId:

async function getPhotoById(req, res, next) {
  try {
    const photo = await Photo
                    .findById(req.params.photoId)
                    .populate('author');

    res.statusCode(200).json({ photo });
  } catch (error) {
    next({
      message: 'There was an error fetching the photo containing this photoId.',
      statusCode: 503
    });
  }
};

// Post a photo on Instagram:

const postInstagramPhoto = [
  body('imageURL').isURL(),
  body('caption').escape(),

  async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      next({
        message: 'The image URL you provided is not a valid URL.',
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
        likes: []
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
      message: 'There was an error in deleting this photo.',
      statusCode: 503
    });
  }
};

// Edit a photo on Instagram that you posted previously:

async function editPhotoById(req, res, next) {
  try {
    const photo = await Photo.findById(req.params.photoId);

    if (!photo) {
      res(404).send('A photo with the given photoId does not exist.');
    }

    photo.caption = req.body.caption;
    photo.save();
  } catch (error) {
    next({
      message: 'There was an error in editing this photo.',
      statusCode: 503
    });
  }
};

module.exports = {
  getUsersPhotos,
  getTrendingPhotos,
  getPhotoById,
  postInstagramPhoto,
  deletePhotoById,
  editPhotoById
};