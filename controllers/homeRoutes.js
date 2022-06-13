require('dotenv').config();
const router = require('express').Router();
const { redirect } = require('express/lib/response');
// const { Client, Invoice, User } = require('../models');
const PDFDocument = require("pdfkit");
const fs = require("fs");
// const generateHelper = require('../utils/generateHelper');
const nodemailer = require('nodemailer');


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

//GENERATE INVOICE ROUTE
router.get('/generate-invoice', (req, res) => {
  try {
    const doc = new PDFDocument()
    const buffers = [];

    doc.pipe(fs.createWriteStream("./public/file.pdf")) // write to PDF

    doc
    .image("./public/images/logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Test Inc", 110, 57)
    .fontSize(10)
    .text("Test Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown()
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160)
    .fontSize(10)
    .text("Invoice Number: 1234", 50, 200,)
		.text(`Invoice Date: 01/01/2022`, 50, 215)
    .text(`Balance Due: $1,000`, 50, 230)
    .moveDown()
		.text("Test Inc", 300, 200, { align: "right"})
		.text("123 Main Street", 300, 215, { align: "right"})
		.text("New York, NY, 10025",300, 230, { align: "right"})
		.moveDown()
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Item", 50, 275)
    .text("Description", 225, 275)
    .text("Total Due", 300, 275, { align: "right" })
    .moveDown()
    .fontSize(10)
    .font("Helvetica")
    .text("001", 50, 300)
    .text("Web Development Project", 225, 300)
    .text("$1,000", 300, 300, { align: "right" })
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      400,
      { align: "center", width: 500 }
    )
    // .text('Some text with an embedded font!', 100, 100);
    // .text(JSON.stringify(someData, null, 2))
    doc.on('data', buffers.push.bind(buffers));
    doc.end();
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });  

      const mailOptions = {
        "from": "invoiceme157@gmail.com",
        "to": "invoiceme157@gmail.com",
        "subject": "Invoice Attached",
        "text": "Please see the attached email for your reference! Have a great day!",
        "attachments": [{
          filename: 'file.pdf',
          content: pdfData,
        }]
      }

      return transporter.sendMail(mailOptions, function(err, data){
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      })
    });
    
    const body = "file.pdf"

    res.render("generate-invoice", { body: body})
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