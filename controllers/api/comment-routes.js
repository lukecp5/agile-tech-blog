// Dependencies
// Express.js connection
const router = require('express').Router();
// Comment model
const { Comment } = require('../../models');
// Authorization Helper
const withAuth = require('../../utils/auth');

// Routes

// Get comments
router.get('/', (req, res) => {
    // Access the Comment model and run .findAll() method to get all comments
    Comment.findAll()
      // return the data as JSON formatted
      .then(dbCommentData => res.json(dbCommentData))
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
