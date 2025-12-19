import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyCert: {
    type: String,
    trim: true,
  },
  companyName: {
    type: String,
    min: 4,
    max: 40,
    trim: true,
    required: true
  },
  companyEmail: {
    type: String,
    min: 8,
    max: 30,
    trim: true,
    required: true
  },
  companyContact: {
    type: Number,
    min: 10,
    max: 15,
    required: true
  },
  companyGSTnumber: {
    type: String,
    min: 15,
    max: 15,
    required: true
  },
  companyType: {
    type: String,
    enum: ['Govt', 'Private'],
    default: 'Private',
    trim: true,
    min: 6,
    max: 20
  },
  companyAdmin: {
    type: String,
    trim: true,
    required: true
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    required: true,
    unique: true,
    select: false
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Company = mongoose.model('Company', companySchema);

export default Company;