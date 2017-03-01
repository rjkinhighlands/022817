var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Person.findAll({
    include: [ models.Task ]
  }).then(function(people) {
    res.render('people/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      people: people
    });
  });
});

router.get('/:person_id', function(req, res) {
  models.Person.findOne({
    include: [ models.Task ],
    where: {
      id: req.params.person_id
    }
  }).then(function(person) {
    res.render('people/show', {
      logged_in: req.session.logged_in,
      id: person.id,
      name: person.name,
      created_at: person.created_at,
      updated_at: person.updated_at,
      tasks: person.Tasks
    })
  });
});

router.put('/update/:person_id', function(req, res) {
  models.Person.update({
    name: req.body.name
  },
  {
    where: { id : req.params.person_id }
  }
).then(function() {
    res.redirect('/people/' + req.params.person_id);
  });
});

router.post('/create', function(req, res) {
  models.Person.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:person_id/destroy', function(req, res) {
  models.Person.destroy({
    where: {
      id: req.params.person_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
