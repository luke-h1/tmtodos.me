import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    body: { type: String, required: true },
    date: { type: Date, required: false, default: Date.now },
  },
  {
    timestamps: true,
  },
);
const Note = mongoose.model('Note', noteSchema);
export default Note;
