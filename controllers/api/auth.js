const router = require('express').Router();
const { User } = require('../../models');

router.post('/register', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      if (userData) {
          res.status(201).send('ok')
      } else {
        res.status(400).send('user not created')
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });

  
    } catch (err) {
      res.status(400).json(err);
    }
  }); 

  module.exports = router;