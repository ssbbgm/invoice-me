const router = require('express').Router();
const { redirect } = require('express/lib/response');
const { Client, Invoice, User, Login } = require('../models');
// const withAuth = require('../utils/auth');

//get login main page
router.get('/', async (req, res) => {
    try {
      res.render('login', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
  });

//get dashboard if logged in
router.get('/dashboard', async (req, res) => {
    try {
      res.render('dashboard', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
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

router.post('/register', (req, res) => {
    // console.log(req.body)
    // res.json(req.body);
    const login = new Login();
    login.first_name = req.body.first_name;
    login.last_name = req.body.last_name;
    login.password = req.body.password;
    login.confirmedPassword = req.body.confimedPassword;

    if(login.password === login.confirmedPassword){
        login.save().then(result => {
        console.log(result); })
    } else {
      console.log('Passwords dont match.');
      // res.redirect('login');
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