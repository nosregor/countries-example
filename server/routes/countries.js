const express = require('express');
const mongoose = require('mongoose');

const Country = require('../models/Country');

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next();
});

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .then((countries) => {
      res.json(countries);
    })
    .catch(err => next(err));
});

// Route to add a country
router.post('/', (req, res, next) => {
  const {
    name, capitals, area, description,
  } = req.body;
  Country.create({
    name, capitals, area, description,
  })
    .then((country) => {
      res.json({
        success: true,
        country,
      });
    })
    .catch(err => next(err));
});

router.delete('/:countryId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.countryId)) {
    res.status(400).json({
      status: false,
      country: null,
      message: 'wrong id',
    });
  }

  Country.findByIdAndRemove(req.params.countryId)
    .then((resp) => {
      console.log(`DEBUG ${resp}`);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: !!resp,
        resp,
      });
    }, err => next(err))
    .catch(err => next(err));
});


module.exports = router;
