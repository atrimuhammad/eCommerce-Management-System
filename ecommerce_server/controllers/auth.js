const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  console.log("in login");
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        console.log(error);
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      console.log(user);
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        console.log(error);
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({success: true, token: token, userId: loadedUser._id.toString(),
                          name:loadedUser.name });
    })
    .catch(err => {
      if (!err.statusCode) {
        console.log("end");
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getCart = (req, res, next) => {
  console.log("Fetching cart ")
  User.findById(req.userId)
  .populate('cart.items.productId')
  .populate('cart.items.variation')
  .then((result)=>{
    let price=0;
    for (i = 0; i < result.cart.items.length; i++) {
    price += result.cart.items[i].variation.price*result.cart.items[i].quantity;
    
    }
    res.status(200).json({ message: 'Cart Found!', cart:result.cart.items,price:price });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.postCart = (req, res, next) => {
  console.log("MyProd: ",req.params.productid)
  const prodId = req.params.productid;
  const variation=req.body.type;
  console.log("MyProd and its variation: ",prodId, variation);
  User.findById(req.userId)
  .then((user)=>{
    if (user.cart.items.filter(p=>(p.productId==prodId && p.variation==variation))[0]){
      console.log("inside");
      console.log(user.cart.items.filter(p=>(p.productId==prodId && p.variation==variation))[0]);
      let i=user.cart.items.findIndex(p=>(p.productId==prodId) && p.variation==variation)
      user.cart.items[i].quantity+=1;
      
    }
    else{
    console.log("Here 5")
      var obj = {};
      obj["productId"] = prodId.toString();
      obj["variation"]=variation.toString();
      obj["quantity"] = 1;
      console.log(obj)
      user.cart.items.push(obj)
    }
    return user.save();
  })
  .then(result => {
    res.status(200).json({ message: 'Product updated!', cart:result.cart.items });
  })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.removeCart = (req, res, next) => {
  const prodId = req.params.productid;
  const variation=req.body.type;
  console.log("prodid", prodId)
  User.findById(req.userId)
  .then((user)=>{
    let ind=user.cart.items.findIndex(p=>(p.productId==prodId && p.variation==variation));
    console.log("index :",ind)
    if (user.cart.items[ind].quantity>1){
      user.cart.items[ind].quantity-=1;  
    }
    else{
      user.cart.items.splice(ind,ind+1)
    }
    return user.save();
  })
  .then(result => {
    res.status(200).json({ message: 'Product updated!', cart:result.cart.items });
  })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteCart = (req, res, next) => {
  User.findById(req.userId)
  .then((user)=>{
    
    let len=user.cart.items.length
    console.log("Cart length :", len)
    user.cart.items.splice(0,len)
    return user.save();
  })
  .then(result => {
    res.status(200).json({ message: 'Cart deleted!', cart:result.cart.items });
  })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};