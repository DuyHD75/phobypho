import mongoose, { Schema } from 'mongoose';
import modelOptions from './model.options.js';

const customerSchema = Schema({
     account: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Account',
          required: true,
          unique: true
     },
     accumulated_points: {
          type: Number,
          default: 0
     }
}, modelOptions);

const customerModel = mongoose.model("Customer", customerSchema);

export default customerModel;