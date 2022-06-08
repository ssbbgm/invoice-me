const router = require('express').Router();

// const homeRoutes = require('./homeRoutes');

router.get("/", async (req, res) => {
  try {
    res.render('login', { body: 'test' })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/dashboard", async (req, res) => {
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

router.get('/register', async (req, res) => {
  try {
    res.render('register', { body: 'test' })
  } catch (err) {
    res.status(500).json(err)
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