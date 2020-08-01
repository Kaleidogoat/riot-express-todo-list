var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/profile', function (req, res, next) {
  res.render('profile');
});
router.get('/home', function (req, res, next) {
  models.users
    .findOne({
      where: {
        UserId: UserId
      },
      attributes: ['FirstName', 'LastName', 'Username', 'Email', 'Admin']
    })
    .then(users => {
      res.render('profile', {
        Username: users.Username,
        LastName: users.LastName,
        FirstName: users.FirstName,
        Email: users.Email,
        Admin: users.Admin
      });
    });
});

router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.send('Login successful');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", {
    expires: new Date(0)
  });
  res.send('Logged out');
});

// router.get('/:id', function (req, res, next) {
//   // let token = req.cookies.jwt;
//   let UserId = parseInt(req.params.id);
//   // let { Username } = req.params;
//   // if (token) {
//   models.users
//     .findOne({
//       where: {
//         UserId: UserId
//       },
//       attributes: ['FirstName', 'LastName', 'Username', 'Email', 'Admin']
//     })
//     .then(users => {
//       res.send('profile', {
//         Username: users.Username,
//         LastName: users.LastName,
//         FirstName: users.FirstName,
//         Email: users.Email,
//         Admin: users.Admin
//       });
//     });
// });

// router.get('/:id', function (req, res, next) {
//   let UserId = parseInt(req.params.id);
//   console.log('test');
//   models.users
//     .findByPk(UserId), ({
//       include: [{ model: models.users }],
//       attributes: ['UserId', 'FirstName', 'LastName', 'Username']
//     })
//       .then(users => {
//         // res.setHeader('Content-Type', 'application/json');
//         res.send({
//           Username: users.Username,
//           LastName: users.LastName,
//           FirstName: users.FirstName
//         });
//       });
//   // console.log(users.firstName);
// });
router.get('/:id', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id), {
      include: [{ model: models.users }],
      attributes: ['UserId', 'FirstName', 'LastName', 'Username']
    })
    .then(users => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(users));
    })
});

module.exports = router;