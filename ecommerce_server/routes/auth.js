const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/users');
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/is-auth');


const router = express.Router();

//auth//signup
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);
//auth//login
router.post('/login', authController.login);

//auth//cart
router.get(
  '/cart',
  isAuth,
  authController.getCart
);
//auth//addcart
router.post(
  '/addcart/:productid',
  isAuth,
  authController.postCart
);
//auth//remcart
router.post(
  '/remcart/:productid',
  isAuth,
  authController.removeCart
);

router.post(
  '/deletecart',
  isAuth,
  authController.deleteCart
);
module.exports = router;
