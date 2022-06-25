const router = require('express').Router();
const { User } = require('../../models');

// post route to api/user/ to create an account
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    // this is a common error; if we didn't send a custom message the user wouldn't know why their attempt failed
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        message:
          'Either the username or email you entered has already been used!',
      });
    } else {
      res.status(400).json(err)
    }
  }
});

// post to attempt to log in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
// uses the checkPassword method in the User class to decrypt the password, check it,
// and return a boolean signifying whether it was correct
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        // both error messages are the same to prevent users confirming that a username exists
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// destroys the client's session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
