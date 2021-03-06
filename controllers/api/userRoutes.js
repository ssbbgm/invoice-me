const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // res
      //   .status(400)
      //   .json({ message: 'Incorrect email or password, please try again' });
      res.statusMessage = 'Incorrect email, please try again';
      res.status(400).end();
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // res
      //   .status(400)
      //   .json({ statusMessage: : 'Incorrect email or password, please try again' });
      res.statusMessage = 'Incorrect password, please try again';
      res.status(400).end();
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log('ERROR =>', err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/logout', (req, res) => {
  try {
    res.render('login', { body: 'test' })
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
