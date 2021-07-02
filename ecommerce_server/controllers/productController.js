const { validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');

const Product = require('../models/product');
const User = require('../models/users');
const Variation=require('../models/product-variations');
const Review=require('../models/reviews');


exports.getProducts = (req, res, next) => {
    console.log("Haseeb");
    Product.find()
    .populate({path:'belongs',
     select:'name'})
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

exports.createProduct = (req, res, next) => {
  console.log("Adding Product on Backend");
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

  const imageUrl = req.file.path;
  const title = req.body.title;
  const description = req.body.description;
  const belongs=req.body.belongs;
  const category=req.body.category;
  const main_var=req.body.var;
  const sub_var=req.body.subvar;
  const quantity=req.body.quantity;
  const price=req.body.price;
  const available=req.body.available;

  const product = new Product({
    title: title,
    description: description,
    imageUrl: imageUrl,
    creator: req.userId,
    belongs:belongs,
    category:category
  });
  product
    .save()
    .then(result => {
      console.log("Product created successfully")
      const variation=new Variation({
        title: main_var,
        sub_title: sub_var,
        price: price,
        quantity: quantity,
        available: available,
      })
      variation
    .save()
    
    .then(var_result=>{
      Product.findById(result._id)
      .then((product)=>{
          product.variations.push(var_result._id.toString())
        return product.save();
      })
      res.status(201).json({
        message: "Product and variations both added successfully",
        product: result,
        variation:var_result
      })
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


exports.addVariations = (req, res, next) => {
  console.log(req.body)
  const prod=req.params.productId
  const main_var=req.body.var;
  const sub_var=req.body.subvar;
  const quantity=req.body.quantity;
  const price=req.body.price;
  const available=req.body.available;

  console.log(prod,main_var,sub_var,quantity,price,available)
      console.log("Product Found successfully")
      const variation=new Variation({
        title: main_var,
        sub_title: sub_var,
        price: price,
        quantity: quantity,
        available: available,
      })
      variation
    .save()
    .then(var_result=>{
      Product.findById(prod)
      .then(result => {
      
          result.variations.push(var_result._id.toString())
        return result.save();
      })
      res.status(201).json({
        message: "Product Found and variations added successfully",
        variation:var_result
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

exports.getProduct=(req,res,next)=>{
    
    const productId=req.params.productId;
    console.log("Haseeb",productId);
    Product.findById(productId)
    .populate({path:'belongs',
     select:'name'})
     .populate('variations')
    .then(product=>{
        if(!product){
            const error = new Error('Could not find product.');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({message:"Product Found",product:product})
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      })
}

exports.getProductReviews=(req,res,next)=>{
    
  const productId=req.params.productId;
  console.log("Getting reviews of:",productId);
  Product.findById(productId)
  .populate({path:'reviews',
            populate:{
              path:'author',
              select:'name'
            }})
  .then(product=>{
      if(!product){
          const error = new Error('Could not find product.');
          error.statusCode = 422;
          throw error;
      }
      let avg_rating=0;
      for (i=0;i<product.reviews.length;i++){
        console.log(product.reviews[i])
        avg_rating+=product.reviews[i].rating;
      }
      if(product.reviews.length>0)
      avg_rating=avg_rating/product.reviews.length

      res.status(200).json({message:"Product Found",reviews:product.reviews , rating:avg_rating})
  })
  .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}


exports.postReview=(req,res,next)=>{
  const productId=req.params.productId;
    const rate=req.body.rating;
    const review=req.body.review;
    const author=req.userId

    const prod_review=new Review({
      rating:rate,
      review:review,
      author:author
    })
    prod_review
    .save()
    .then(review=>{
      Product.findById(productId)
      .then((product)=>{
          product.reviews.push(review._id.toString())
        return product.save();
      })
      res.status(200).json({message:"Review added",review:review})
  })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      })
}
exports.getShopProducts=(req,res,next)=>{
    
  const shopId=req.params.shopId;
  console.log("My Shop Prod",shopId);
    Product.find({belongs:shopId})
    .populate({path:'belongs',
     select:'name'})
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      })
}


exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const description = req.body.description;
  const category=req.body.category;
  let imageUrl = req.body.image;
  
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== product.imageUrl) {
        clearImage(product.imageUrl);
      }
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.category=category;
      return product.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Product updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProductVariations = (req, res, next) => {
  const productId = req.params.productId;
  const varId=req.params.variation;
  

  const title = req.body.main;
  const sub_title = req.body.sub;
  const price=req.body.price;
  const quantity=req.body.quan;
  const available=req.body.avail;
  
  
  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      
      Variation.findById(varId)
      .then(varr => {
        if (!varr) {
          const error = new Error('Could not find product variation');
          error.statusCode = 404;
          throw error;
        } 
      varr.title = title;
      varr.sub_title =sub_title;
      varr.price = price;
      varr.quantity=quantity;
      varr.available=available;
      return product.save();
      })
      
    })
    .then(result => {
      res.status(200).json({ message: 'Product Variation updated!', post: result });
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

