var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://ona-api:ona-api@ds041150.mongolab.com:41150/ona-api');
var Link = require('./app/models/link');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();     

router.use(function(req, res, next) {
  console.log('Something happened.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Aloha world!' }); 
});

//handling the catchall "links"
router.route('/links')

  .post(function(req, res) {
    console.log('POST request to add new url');
    var link = new Link();
    link.url = req.body.url;
    link.description = req.body.description;

    link.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Link ' + link.url + ' created with the following description: ' + link.description });
    });

  })
  .get(function(req, res) {

  Link.find(function(err, links) {

    if (err)
      res.send(err);

    res.json(links)
  })
});

//handling single link GET & PUT requests
router.route('/links/:link_id')

  .get(function(req, res) {
    console.log("GET request for specific ID");
    Link.findById(req.params.link_id, function(err, link) {
      if (err)
        res.send(err);
      res.json(link);
    });
  })
  .put(function(req, res) {
    console.log("PUT request to update url")
    Link.findById(req.params.link_id, function(err, link) {
      if (err)
        res.send(err);

      link.url = req.body.url;
      link.description = req.body.description;

      link.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Link updated!' });
      });
    });
  })
  .delete(function(req, res) {
    console.log("DELETE request for link");
    Link.remove({
      _id: req.params.link_id
    }, function(err, link) {
      if (err)
        res.send(err);

      res.json({ message: 'Deleted.' });
    });
  });


app.use('/api', router);

app.listen(port);
console.log('Yo, Server running on port ' + port);