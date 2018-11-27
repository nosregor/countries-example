const express = require('express');

const { isLoggedIn } = require('../middlewares');
const uploadCloud = require('../configs/cloudinary');
const User = require('../models/User');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res, next) => {
  req.user.password = null;
  res.json(req.user);
});


router.post('/users/pictures', isLoggedIn, uploadCloud.single('picture'), (req, res, next) => {
  User.findOneAndUpdate(req.user._id, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
