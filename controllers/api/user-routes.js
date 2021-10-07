// Dependencies
// Express.js connection
const router = require('express').Router();
// User, Post, Vote models
const { User, Post, Comment } = require('../../models');
// Express Session for the session data
const session = require('express-session');
// Authorization Helper
const withAuth = require('../../utils/auth');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes

// GET /api/users -- get all users
router.get('/', (req, res) => {
    // Access the User model and run .findAll() method to get all users
    User.findAll({
        // when the data is sent back, exclude the password property
        attributes: { exclude: ['password'] }
    })
      // return the data as JSON formatted
      .then(dbUserData => res.json(dbUserData))
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/users -- add a new user
router.post('/', (req, res) => {
  // create method
  // expects an object in the form {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    // send the user data back to the client as confirmation and save the session
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
    // if there is a server error, return that error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users/login -- login route for a user
router.post('/login',  (req, res) => {
    // findOne method by email to look for an existing user in the database with the email address entered
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
        email: req.body.email
        }
    }).then(dbUserData => {
        // if the email is not found, return an error
        if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
        }
        // Otherwise, verify the user.
        // call the instance method as defined in the User model
        const validPassword = dbUserData.checkPassword(req.body.password);
        // if the password is invalid (method returns false), return an error
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        // otherwise, save the session, and return the user object and a success message
        req.session.save(() => {
          // declare session variables
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });  
});

module.exports = router;