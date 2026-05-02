import mongoose from "mongoose";

/* 🔹 Single Image Schema */
const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { _id: true } // needed for deleting single image
);

/* 🔹 Main Gallery Schema */
const gallerySchema = new mongoose.Schema(
  {
    /* 🔤 TITLE (EN + AR) */
    title: {
      en: { type: String, default: "" },
      ar: { type: String, default: "" },
    },

    /* 📝 DESCRIPTION */
    description: {
      en: { type: String, default: "" },
      ar: { type: String, default: "" },
    },

    /* 📂 CATEGORY */
    category: {
      type: String,
      enum: ["masna", "contractor"],
      required: true,
    },

    /* 📍 LOCATION */
    location: {
      type: String,
      default: "Kuwait",
    },

    /* 🖼️ MAIN GALLERY (MAX 8 IMAGES) */
    gallery: {
      type: [imageSchema],

      validate: {
        validator: function (val) {
          return val.length > 0 && val.length <= 8;
        },
        message: "Gallery must contain 1 to 8 images",
      },
    },

    /* ⭐ OPTIONAL: FEATURED IMAGE (first image fallback) */
    coverImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* 🔥 AUTO SET COVER IMAGE */
gallerySchema.pre("save", function (next) {
  if (this.gallery && this.gallery.length > 0) {
    this.coverImage = this.gallery[0].url;
  }
  next();
});

export default mongoose.model("Gallery", gallerySchema);