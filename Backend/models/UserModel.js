const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // Matches Indian mobile numbers
      },
      message: (props) =>
        `${props.value} is not a valid Indian phone number! Must start with 6-9 and be 10 digits.`,
    },
  },
  address: {
    street: {
      type: String,
      //required: true,
      trim: true,
    },
    street2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      //required: true,
      trim: true,
    },
    state: {
      type: String,
      // required: true,
      trim: true,
    },
    zip: {
      type: String,
      // required: true,
      trim: true,
    },
    country: {
      type: String,
      // required: true,
      trim: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
