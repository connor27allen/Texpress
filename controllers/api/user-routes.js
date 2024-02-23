const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//GET Route to retrieve all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET Route to retrieve one specific user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        id: req.params.id
      },
      include: [{
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
      ]
    });

    if (!userData) {
      res.status(404).json({
        message: 'No user found with this ID'
      });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST Route to create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!userData) {
      res.status(400).json({
        message: 'No user with that username!'
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect password!'
      });
      return;
    }

    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.loggedIn = true;
    res.json({
      user: userData,
      message: 'You are now logged in!'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;