const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['meeting', 'deadline', 'training', 'company', 'other'],
    default: 'other'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  department: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  createdBy: {
  type:String,
  default:'Admin'
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports=Event;