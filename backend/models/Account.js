import mongoose, { Schema } from 'mongoose';

const accountSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Account', accountSchema);
