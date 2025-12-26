import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    min: 4,
    max: 40,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
    required: true
  },
  employeeId: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    min: 10,
    max: 14,
    default: 0,
    unique: true
  },
  dob: {
    type: Date,
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  department: {
    type: String,
    enum: ['Engineering', 'HR', 'Marketing', 'Sales', 'Finance', 'Opeartions', 'Back-Office'],
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    default: new Date()
  },
  manager: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  basicSalary: {
    type: Number,
    default: 0,
    required: true
  },
  hra: {
    type: Number,
    default: 0
  },
  allowance: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;