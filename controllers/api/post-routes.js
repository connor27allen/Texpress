const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            attributes: ['id', 'content', 'title', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET Route for a single post
router.get('/:id', async (req, res) => {
    try{
    const postData = await Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [{
            model: User,
            attributes: ['username'],
        },
    {
            model: Comment,
            attribute: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username'],
            },
    },
    ],
    })

    if (!postData) {
        res.status(404).json({
            message: 'No post found with that ID'
        });
        return;
    }
    res.json(postData);
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});

//POST route to create a post
router.post('/', withAuth, async (req, res) => {
    try{
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.post_content,
            user_id: req.session.user_id
        })

        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//PUT Route to update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        if (!postData) {
            res.status(404).json({
                messagge: 'No post found with this ID'
            })
            return;
        }
        res.json(postData);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
});

//DELETE a post

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (!postData) {
            res.status(404).json({
                message: 'No post found with this ID'
            })
            return;
        }
        res.json(postData);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
});

module.exports = router;