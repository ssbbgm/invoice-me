const router = require('express').Router();
const { redirect } = require('express/lib/response');
const { Client, Invoice, User } = require('../models');
// const withAuth = require('../utils/auth');



//get login main page
router.get('/', async (req, res) => {
    try {
      res.render('login', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

// get dashboard if logged in
router.get('/dashboard', async (req, res) => {
    try {
      res.render('dashboard', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});


router.get('/forgot', async (req, res) => {
    try {
      res.render('forgot', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
  });
  
router.get('/register', (req, res) => {
    try {
      // console.log(req.body);
      res.render('register', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
});

router.get('/client-list', async (req, res) => {
  try {
    res.render('client-list', { body: 'test' })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/generate-invoice', async (req, res) => {
  try {
    res.render('generate-invoice', { body: 'test' })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/register', async (req, res) => {
    try {
    console.log(req.body)
    res.json(req.body);
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    //user.confirmedPassword = req.body.pw_confirm;

    user.save().then(result => {
    console.log(result); })  
    } catch(err){
      res.status(400).json(err);
    }     
});

  
router.get('/reset', async (req, res) => {
    try {
      res.render('reset', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
});

module.exports = router;