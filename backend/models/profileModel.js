const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter profile Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter profile Description"],
  },
  salary: {
    type: Number,
    required: [true, "Please Enter profile salary"],
    maxLength: [8, "Salary cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Profile Category"],
  },

  location: {
    type: String,
    required: [true, "Please Enter Location"],
  },
  
  availabilability: {
    type: Number,
    required: [true, "Please Enter profile Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  
  createdAt: {
    type: Date,
    default: Date.now,

  },
});

module.exports = mongoose.model("profiles", profileSchema);
