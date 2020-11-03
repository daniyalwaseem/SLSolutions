const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const env = require("dotenv").config();
const nodemailer = require("nodemailer");
const stripe = require('stripe')(process.env.stripeSecretKey);

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// realtive absolute
// console.log(__dirname);

// console.log(path.join(__dirname, "/public"));

//builtin middleware
const staticPath = path.join(__dirname, "/public");
const templatePath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// to set the view engine
app.set("view engine", "hbs");

app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

// template engine route
app.get("/", (req,res) => {
    res.render("index", {
      stripePublishableKey: process.env.stripePublishableKey
    });
});

// app.get('/success', (req,res) => {
//     res.render('success')
// });

app.post("/contact", (req,res) => {

    const output = `
    <p> You have a new contact request </p>
    <h3> Contact Details </h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject} </li>
    <ul>
    <h3> Message: </h3>
    <p> ${req.body.message} </p>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_EMAIL, // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Smart Leading Contact" <mpa6712@gmail.com>', // sender address
    to: "daniyalwaseem321@gmail.com", // list of receivers
    subject: "Smart Leading", // Subject line
    text: "Hello", // plain text body
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    });
});

app.post('/plan1', (req, res) => {
    const amount = 2500;

    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
      amount,
      description: 'Custome Website',
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge => res.render('success'));
});

app.post('/plan2', (req, res) => {
    const amount = 4500;

    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
      amount,
      description: 'Basic Website',
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge => res.render('success'));
});

app.post('/plan3', (req, res) => {
    const amount = 7500;

    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
      amount,
      description: 'Ecommerce Website',
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge => res.render('success'));
});

app.post('/plan4', (req, res) => {
    const amount = 10000;

    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
      amount,
      description: 'Website + Application',
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge => res.render('success'));
});

app.get("*", (req,res) => {
    res.render("404", {
        errorComment: "Sorry! That page doesn't seem to exist.",
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
