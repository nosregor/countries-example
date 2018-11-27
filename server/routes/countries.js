const express = require('express');
const { checkId, isLoggedIn } = require('../middlewares');
const Country = require('../models/Country');

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next();
});

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .populate('_owner', 'username') // populate on _owner and only send the username and _id (default)
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
router.post('/', isLoggedIn, (req, res, next) => {
  const {
    name, capitals, area, description,
  } = req.body;

  const _owner = req.user._id;

  Country.create({
    name, capitals, area, description, _owner,
  })
    .then((country) => {
      res.json({
        success: true,
        country,
      });
    })
    .catch(err => next(err));
});

router.put('/:countryId', isLoggedIn, checkId('countryId'), (req, res, next) => {
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


router.delete('/:countryId', isLoggedIn, checkId('countryId'), (req, res, next) => {
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
