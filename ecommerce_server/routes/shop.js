const express = require('express');
const { body } = require('express-validator/check');
const multer = require('multer');

const ShopController = require('../controllers/shop');
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

// GET /sellers/shops
router.get('/shops',ShopController.getShops);

// POST /sellers/shops
router.post(
  '/shop',
  
  upload.single('banner'),
  isAuth,
  ShopController.createShop
);

// GET /sellers/shops/shopId
router.get('/shops/:shopId',ShopController.getShop);

router.put(
  '/shops/:shopId',
  upload.single('banner'),
  isAuth,
  ShopController.updateShop
);

module.exports = router;
