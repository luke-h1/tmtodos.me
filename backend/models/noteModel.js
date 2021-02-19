import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    body: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Note = mongoose.model('Note', noteSchema);
