const mongoose = require('mongoose');

// Define the user schema
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
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Phone number should be 10 digits'],
  },
  userType:{
    type:String,
    default:'User'
   }
}, { timestamps: true }); // To automatically add createdAt and updatedAt fields

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
