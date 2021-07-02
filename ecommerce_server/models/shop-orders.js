const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingSchema = new Schema(
  {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        variation: {
          type: String,
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],
    price:{
        type:Number,
        required:true
    },
    buyer: {
        type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
      },

    status: {
        type:String,
        required:true
    },  
    payment_method:{
      type:String,
      required:true
    }
    ,
    delivery_address:{
      type:String,
      required:true
    },
    city:{
      type:String,
      required:true
    }
    ,
    zipcode:{
      type:Number,
      required:true
    }, 
    shop_id:{
      type:String,
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shop Orders', pendingSchema );
