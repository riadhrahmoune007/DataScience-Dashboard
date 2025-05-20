import mongoose from 'mongoose';

const DatasetSchema = new mongoose.Schema({
  name: String,
  filename: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Dataset', DatasetSchema);
