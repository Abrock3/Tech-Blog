const router = require('express').Router();
const { Post } = require('../../models');
const { update } = require('../../models/User');
const withAuth = require('../../utils/auth');

// simple post route to api/posts will attempt to create a post, assuming the client is logged in
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// put route to api/posts/:id results in an attempt to change a post, requiring that the user be logged in
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
          // this ensures that users can't change the posts of other users 
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete route attempts to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        // ensures other users cannot delete your post
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
