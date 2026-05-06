import mongoose from "mongoose";

/* ================= IMAGE SCHEMA ================= */

const imageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },

    public_id: {
      type: String,
      required: [true, "Cloudinary public_id required"],
      trim: true,
    },
  },
  { _id: false }
);

/* ================= MAIN GALLERY SCHEMA ================= */

const gallerySchema = new mongoose.Schema(
  {
    /* 🔥 MULTI LANGUAGE TITLE */
    title: {
      en: {
        type: String,
        trim: true,
        maxlength: 120,
        default: "",
      },

      ar: {
        type: String,
        trim: true,
        maxlength: 120,
        default: "",
      },
    },

    /* 🔥 MULTI LANGUAGE DESCRIPTION */
    description: {
      en: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: "",
      },

      ar: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: "",
      },
    },

    /* 🔥 CATEGORY */
    category: {
      type: String,

      required: [true, "Category is required"],

      enum: {
        values: ["masna", "contractor"],
        message: "Invalid category",
      },
    },

    /* 🔥 LOCATION */
    location: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "Kuwait",
    },

    /* 🔥 MULTIPLE IMAGES */
    images: {
      type: [imageSchema],

      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },

        message: "At least one image is required",
      },

      required: true,
    },
  },

  {
    timestamps: true,
  }
);

/* ================= DATABASE INDEX ================= */

/* 🔥 FAST CATEGORY SEARCH */
gallerySchema.index({ category: 1 });

/* 🔥 FAST NEWEST PROJECT FETCH */
gallerySchema.index({ createdAt: -1 });

/* 🔥 FAST COMBINED QUERY */
gallerySchema.index({
  category: 1,
  createdAt: -1,
});

/* ================= EXPORT ================= */

export default mongoose.model("Gallery", gallerySchema);