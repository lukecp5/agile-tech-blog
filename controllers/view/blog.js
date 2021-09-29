const router = require("express").Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/new', (req, res) => {
    res.render("blogNew")
})

router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    const post = {
        title: "First Blog",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacus diam, vehicula id elementum sit amet, accumsan at tellus. Donec sed lobortis lectus. Quisque dapibus lacinia orci, iaculis sagittis nisl pharetra eu. Cras sollicitudin lacinia lacus nec semper. Duis nec ligula eros. Phasellus bibendum mauris vel laoreet condimentum.",
        user: {
          userName: "teckels",
          name: "Trey Eckels",
        },
        createdAt: "YYYY-MM-DD HH:MM:SS",
      };
    res.render("blogPost", post)
})

router.get('/edit/:id', (req, res) => {
    const blogData = {
        title: "Title",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacus diam, vehicula id elementum sit amet, accumsan at tellus. Donec sed lobortis lectus. Quisque dapibus lacinia orci, iaculis sagittis nisl pharetra eu. Cras sollicitudin lacinia lacus nec semper. Duis nec ligula eros. Phasellus bibendum mauris vel laoreet condimentum.",
      };
    res.render("blogEdit", {blogData})
})

module.exports = router