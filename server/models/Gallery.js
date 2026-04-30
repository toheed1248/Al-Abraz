import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        trim: true,
        default: "",
      },
      ar: {
        type: String,
        trim: true,
        default: "",
      },
    },

    description: {
      en: {
        type: String,
        trim: true,
        default: "",
      },
      ar: {
        type: String,
        trim: true,
        default: "",
      },
    },

    category: {
      type: String,
      required: true,
      enum: ["masna", "contractor"], // 🔥 restrict values
    },

    imageUrl: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },
    location: {
  type: String,
  default: "Kuwait"
},
  },
  { timestamps: true }
);

// 🔥 Index for faster queries
gallerySchema.index({ category: 1 });
gallerySchema.index({ createdAt: -1 });

export default mongoose.model("Gallery", gallerySchema);