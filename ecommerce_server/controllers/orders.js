const { validationResult } = require('express-validator/check');
const path = require('path');

const Order = require('../models/order-history');
const User = require('../models/users');
const Shop_order=require('../models/shop-orders');
const Shop = require('../models/shop');
// const Variation=require('../models/product-variations');
// const Review=require('../models/reviews');


exports.getOrderHistory = (req, res, next) => {
    
  console.log("Haseeb :",req.userId);
const user=req.userId;
    Order.find({ user: user })
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

exports.createOrder = (req, res, next) => {
  console.log("Adding Order on Backend");
  
    const user=req.userId;
    const method=req.body.paymethod;
    const address=req.body.address;
    const city=req.body.city;
    const zipcode=req.body.code;

    User.findById(user)
    .populate('cart.items.productId')
    .populate('cart.items.variation')
    .then(result => { 
      console.log("Product Found ",result.cart.items[0].variation,result.cart.items.length)
      console.log("Shop :", result.cart.items[0].productId.belongs)
      // for (i = 0; i < result.cart.items.length; i++) {
      //   price += result.cart.items[i].variation.price*result.cart.items[i].quantity;
      // }
          
      let items=[];
      let shops=[];
      let price=0;
      for (i = 0; i < result.cart.items.length; i++) {
        var obj = {};
      obj["productId"] =result.cart.items[i].productId._id.toString();
      obj["variation"]=result.cart.items[i].variation.title;
      obj["quantity"] = result.cart.items[i].quantity;
      price += result.cart.items[i].variation.price*result.cart.items[i].quantity;
      items.push(obj);
      if (!shops.includes(result.cart.items[i].productId.belongs)){
        shops.push(result.cart.items[i].productId.belongs)
      }
      }
      // console.log("Items : ",items)
      // console.log("Price : ", price);
      // console.log("Shops :", shops);
      const order=Order({
          price:price,
          payment_method:method,
          delivery_address:address,
          zipcode:zipcode,
          city:city,
          status:"Initiated",
          user:user,
          items:items

      })
      order.
      save()
      .then(sub_result=>{
          console.log("User History updated");
          for (j=0;j<shops.length;j++){

          let shop_items=[];
          let shop_price=0;
          for (i = 0; i < result.cart.items.length; i++) {
            var obj = {};
            if (result.cart.items[i].productId.belongs == shops[j]){
            obj["productId"] =result.cart.items[i].productId._id.toString();
            obj["variation"]=result.cart.items[i].variation.title;
            obj["quantity"] = result.cart.items[i].quantity;
            shop_price += result.cart.items[i].variation.price*result.cart.items[i].quantity;
            shop_items.push(obj);
            }
            
            }
        const shopOrder=Shop_order({
          price:shop_price,
            payment_method:method,
            delivery_address:address,
            zipcode:zipcode,
            city:city,
            status:"Initiated",
            buyer:user,
            items:shop_items,
            shop_id:shops[j]
        })
        shopOrder.
        save()
        .then(shop_result=>{
          // console.log("Single shop : ", shop_result,)
         // console.log("My shop id : ", shops, j)
        Shop.findById(shop_result.shop_id)
        .then((shop)=>{
          // console.log("My shop :", shop)
            shop.orders.push(shop_result._id.toString())
          return shop.save();
        })
          })   
        }
        res.status(201).json({
          message: "Order Created successfully in both databases",
          order: sub_result
        })
      }
    )
  }
)

    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        console.log("1");
      }
      next(err);
    });
};

// .then(var_result=>{
    //   Product.findById(result._id)
    //   .then((product)=>{
    //       product.variations.push(var_result._id.toString())
    //     return product.save();
    //   })
    //   res.status(201).json({
    //     message: "Product and variations both added successfully",
    //     product: result,
    //     variation:var_result
    //   })
    // })