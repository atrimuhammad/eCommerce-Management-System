const express = require('express');
const { body } = require('express-validator/check');
const multer = require('multer');

const ProductController = require('../controllers/productController');
const isAuth = require('../middlewares/is-auth');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/');
    console.log("heyy");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
    console.log("here");
  } else {
    console.log("fale")
    cb(null, false);
  }
};

const upload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const router = express.Router();

// GET /shop/products
router.get('/products',ProductController.getProducts);

console.log("Whatss"),
// POST /shop/product
router.post(
  '/product',
  upload.single('imageUrl'),
  isAuth,
  ProductController.createProduct
);

router.post(
  '/product/:productId',
  isAuth,
  ProductController.addVariations
);

console.log("Whatss2"),
// GET /shop/product/productId
router.get('/product/:productId',ProductController.getProduct);

// GET /shop/product-reviews/productId
router.get('/product-reviews/:productId',isAuth,ProductController.getProductReviews);

//POST/shop/product/productId
router.post(
  '/product-review/:productId',
  isAuth,
  ProductController.postReview
);
// GET /shop/products/shopId
router.get('/products/:shopId',ProductController.getShopProducts);

router.put(
  '/products/:productId',
  
  upload.single('imageUrl'),
  isAuth,
  ProductController.updateProduct
);

router.put(
  '/product-variations/:productId/:variation',
  isAuth,
  ProductController.updateProductVariations
);


module.exports = router;
