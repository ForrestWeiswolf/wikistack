const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.post('/', function(req, res, next) {
  User
  .findOrCreate({where: {name: req.body.author }, defaults: { email: req.body.email }})
  .then((userArr) => {
    // console.log(user.get({
    //   plain: true
    // }))
    // console.log(created)

    var author_id = userArr[0].id;
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      authorID: author_id
    })

    return page.save();

    /*
     findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:

    [ {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      },
      true ]

 In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
    */
  }).then(function(savedPage){
      res.redirect(savedPage.urlTitle);
  });
  // var page = Page.build({
  //   title: req.body.title,
  //   content: req.body.content,
  //   status: req.body.status
  // })

  // page.save().then(function(savedPage){
  //   res.redirect(savedPage.urlTitle);
  // });

});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.find({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', { 'page': foundPage });
  })
  .catch(next);
})

router.get('/', function(req, res, next) {
  Page.findAll({}).then(function(pages) {
    res.render('index', {pages: pages})
  })
})

module.exports = router;
