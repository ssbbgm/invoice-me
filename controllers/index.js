const router = require('express').Router();
const path = require('path');
const public = require('public/src/index');
// const homeRoutes = require('./homeRoutes');

router.get('/', async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    res.sendFile('/index.html');
});
  
module.exports = router;