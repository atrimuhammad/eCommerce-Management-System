const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'I am new!'
  },
  shops:[{
    type: Schema.Types.ObjectId,
     ref: 'Shop'
  }],
  
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        variation: {
          type: Schema.Types.ObjectId,
          ref: 'Product-Variation',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
