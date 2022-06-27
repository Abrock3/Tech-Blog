const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        { model: Comment, attributes: [] },
      ],
      attributes: {
        include: [
          // this fetches a count of comments associated with this post
          [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount'],
        ],
      },
      group: ['Post.id'],
    });

    // Serialize data so the template can read it
    const blogs = postData.map((post) => post.get({ plain: true }));
    // this ensures that the data will be displayed from the newest to the oldest post
    blogs.reverse();
    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      // change this later to req.session.logged_in
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: {
    //     include: ['username'],
    //     exclude: ['password', 'id', 'email'],
    //   },
    //   include: [
    //     {
    //       model: Post,
    //       include: [
    //         {
    //           model: Comment,
    //           attributes: [
    //             [
    //               Sequelize.fn('COUNT', Sequelize.col('user.id')),
    //               'commentCount',
    //             ],
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    //   group: ['Posts.id'],
    // });
    const userData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        { model: Comment, attributes: [] },
      ],

      attributes: {
        include: [
          // this fetches a count of comments associated with this post
          [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount'],
        ],
      },
      group: ['Post.id'],
    });
    const user = userData.map((post) => post.get({ plain: true }));
    console.log(user);

    // ensures that the content is displayed with the newest post first
    user.reverse();
    res.render('dashboard', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// displays the create-blog page, and requires the user be logged in
router.get('/create-blog', withAuth, (req, res) => {
  res.render('create-blog', { logged_in: true });
});

// when the user is trying to edit a post, this will get the data of that post so we can display it to the
// user before they edit it
router.get('/edit-blog/:id', withAuth, async (req, res) => {
  const postData = await Post.findOne({
    where: { id: req.params.id, user_id: req.session.user_id },
    attributes: ['id', 'title', 'content'],
  });
  if (!postData) {
    res.redirect('/dashboard');
  }
  const blog = postData.get({ plain: true });
  console.log(blog);
  res.render('edit-blog', { ...blog, logged_in: req.session.logged_in });
});

// gets the post's information, including any comments associated with that post, and any users that
// wrote those comments
router.get('/blogs/:id', withAuth, async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  });
  const blog = postData.get({ plain: true });
  res.render('blog-page', { ...blog, logged_in: req.session.logged_in });
});
module.exports = router;
