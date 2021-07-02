const express = require('express');

const OrderController = require('../controllers/orders');
const isAuth = require('../middlewares/is-auth');


const router = express.Router();

// GET /shop/orderhistory
//router.get('/products',ProductController.getProducts);
router.get(
  '/order-history',
  isAuth,
  OrderController.getOrderHistory
);


// POST /shop/create-order
router.post(
  '/create-order',
  isAuth,
  OrderController.createOrder
);


//console.log("Whatss2"),
// GET /shop/product/productId
//router.get('/product/:productId',ProductController.getProduct);

//POST/shop/product/productId
// router.post(
//   '/product/:productId',
//   isAuth,
//   ProductController.postReview
// );
// GET /shop/products/shopId
// router.get('/products/:shopId',ProductController.getShopProducts);

// router.put(
//   '/products/:productId',
  
//   upload.single('imageUrl'),
//   isAuth,
//   ProductController.updateProduct
// );

module.exports = router;
