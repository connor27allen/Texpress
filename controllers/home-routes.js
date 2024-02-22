const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const posts = postData.map(post => post.get({ plain: true }));
  
      res.render('post-list', {
        posts,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //single post view
  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      if (!postData) {
        res.redirect('/')
        return;
      }
  
      const post = postData.get({ plain: true });
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});


router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
})


module.exports = router;