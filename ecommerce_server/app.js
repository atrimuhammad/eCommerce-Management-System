const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ProductRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const shopRoutes=require('./routes/shop');
const orderRoutes=require('./routes/orders');
const app = express();




// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
console.log("1");
console.log("2");
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/shop', ProductRoutes);
app.use('/auth', authRoutes);
app.use('/sellers',shopRoutes);
app.use('/orders',orderRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://haseeb:JPt7@NJKc4vtMLV@democluster.hi5mk.mongodb.net/ecomerce?retryWrites=true&w=majority',
    {useNewUrlParser: true}
  )
  .then(result => {
    app.listen(3001);
  })
  .catch(err => console.log(err));
 