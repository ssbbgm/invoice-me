const router = require('express').Router();

// const homeRoutes = require('./homeRoutes');

router.get("/", async (req, res) => {
  try {
    res.render("home", { body: "test" })
  } catch (err) {
    res.status(500).json(err)
  }
})

  
module.exports = router;