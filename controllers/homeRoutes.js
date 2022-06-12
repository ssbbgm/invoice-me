const router = require('express').Router();
const { redirect } = require('express/lib/response');
const { Client, Invoice, User } = require('../models');
const PDFDocument = require("pdfkit");
const fs = require("fs");
// const withAuth = require('../utils/auth');



//get login main page
router.get('/', async (req, res) => {
    try {
      res.render('login', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
  });

router.post('/', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
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

router.get('/generate-invoice', (req, res) => {
  try {
    var pdfkit = new PDFDocument()
    var someData = {
      name: "test abc",
      age: "25",
    }
    pdfkit.pipe(fs.createWriteStream("./public/file.pdf")) // write to PDF
    pdfkit.text(JSON.stringify(someData, null, 2))

    pdfkit.end()
    const body = "file.pdf"
    res.render("generate-invoice", { body: body })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

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