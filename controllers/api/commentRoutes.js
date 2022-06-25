const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// when the user tries to post a comment, the request ends up here. Requires the user be logged in
router.post('/', withAuth, async (req, res) => {
  try {
    // insertion into comment table
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
