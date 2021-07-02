const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    banner: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      orders:[{
        type: Schema.Types.ObjectId,
         ref: 'Shop Orders'
      }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shop', shopSchema);
