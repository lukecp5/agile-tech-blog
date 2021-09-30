const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');



// POST /api/users
router.post('/', (req, res) => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json(dbUserData);
        });
      });
    });
  
    router.post('/login', (req, res) => {
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }
    
        const validPassword = dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
    
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