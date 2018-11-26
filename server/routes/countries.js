const express = require('express');
const { checkId } = require('../middlewares');

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


// Route to get the detail of a country
router.get('/:countryId', checkId('countryId'), (req, res, next) => {
  Country.findById(req.params.countryId)
    .then((countryDoc) => {
      res.json(countryDoc);
    });
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

router.put('/:countryId', checkId('countryId'), (req, res, next) => {
  Country.findByIdAndUpdate(req.params.countryId, {
    $set: req.body,
  }, { new: true })

  // another way of doing it
  // {
  //   name: req.body.name,
  //   capitals: req.body.capitals,
  //   area: req.body.area,
  //   description: req.body.description,
  // })

    .then((country) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(country);
    }, err => next(err))
    .catch(err => next(err));
});


router.delete('/:countryId', checkId('countryId'), (req, res, next) => {
  Country.findByIdAndRemove(req.params.countryId)
    .then((resp) => {
      console.log(`DEBUG ${resp}`);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: !!resp, // true only if a country was found
        resp,
      });
    }, err => next(err))
    .catch(err => next(err));
});


module.exports = router;
