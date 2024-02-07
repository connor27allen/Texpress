const router = require('express').Router();
const { Useer, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET Route to retrieve all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        res.json(commentData);
    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }
});

//POST Route to create a comment
router.post('/', async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
            });
            res.json(commentData)
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;