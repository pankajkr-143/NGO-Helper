const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
// app.engine('ejs', ejsMate);
// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend_Testing')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend_Testing/index.html'));
});

// app.get('/donate', (req, res) => {
//   res.render('Paytem');
// });

app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Donation',
        },
        unit_amount: req.body.price * 100,
        // unit_amount: 50 * 100,
        // * 100 to convert to cents

      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });

  res.redirect(session.url);
});

app.get('/complete', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  console.log(session);
  res.send('Payment successful');
});
app.get('/cancel', (req, res) => {
  res.send('Payment failed');
});


app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).send('<h1>Error 404: Resource not found</h1>');
});

module.exports = app;