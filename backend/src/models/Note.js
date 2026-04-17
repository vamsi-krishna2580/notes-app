import mongoose from "mongoose";

// schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },

    // ✅ FIXED: moved inside schema
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ FIXED: correct model name
      required: true,
    },
  },
  { timestamps: true }
);

// index
noteSchema.index({ createdAt: -1 });

// transform
noteSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

// model
const Note = mongoose.model("Note", noteSchema);

export default Note;