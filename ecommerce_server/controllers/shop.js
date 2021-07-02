const { validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');

const Shop = require('../models/shop');
const User = require('../models/users');

exports.getShops = (req, res, next) => {
    console.log("Shops!");
    Shop.find()
    .populate({path:'owner',
     select:'name status'})
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      })
  
};

exports.createShop = (req, res, next) => {
  console.log("Creating Shop!");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    console.log("2");
    throw error;
  }

  const banner = req.file.path;
  const name = req.body.name;
  const about = req.body.about;
  const shop = new Shop({
    name: name,
    about: about,
    banner: banner,
    owner:req.userId
  });
  shop
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Shop created successfully!',
        shop: result
      });
      User.findById(req.userId)
      .then((user)=>{
          user.shops.push(result._id.toString())
        return user.save();
      })
    })
    
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        console.log("1");
      }
      next(err);
    });
};

exports.getShop=(req,res,next)=>{
    
    const shopId=req.params.shopId;
    console.log("Shoppy: ",shopId);
    Shop.findById(shopId)
    .populate({path:'owner',
    select:'name status'})
    .then(shop=>{
        if(!shop){
            const error = new Error('Could not find your shop.');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json(shop)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      })
}


exports.updateShop = (req, res, next) => {
  const shopId = req.params.shopId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const about = req.body.about;
  let banner = req.body.image;
  
  if (req.file) {
    banner = req.file.path;
  }
  if (!banner) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Shop.findById(shopId)
    .then(shop => {
      if (!shop) {
        const error = new Error('Could not find shop.');
        error.statusCode = 404;
        throw error;
      }
      if (banner !== shop.banner) {
        clearImage(shop.banner);
      }
      shop.name = name;
      shop.banner = banner;
      shop.about = about;
      return shop.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Shop updated!', shop: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
