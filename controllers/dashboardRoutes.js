const router = require('express').Router();
// const { Project, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/profile', async (req, res) => {
    try {
      console.log("Getting profile...");
      res.render('profile', { body: 'test' })
    } catch (err) {
      res.status(500).json(err)
    }
  });


module.exports = router;