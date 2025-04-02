const mongoose = require("mongoose");

// {
//
//     leaveType: "Vacation",
//     startDate: "2025-04-05",
//     endDate: "2025-04-09",
//     duration: "5 days",
//     reason: "Personal trip",
//     status: "pending",
//     appliedOn: "2025-03-15",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  leaveType: {
    type: String,
    enum: ["vacation", "sick", "personal", "others", "emergency"],
    required: [true, "Please provide leave type"],
  },
  duration: {
    type: String,
    required: [true, "Please provide duration"],
  },
  startDate: {
    type: Date,
    required: [true, "Please provide from date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please provide to date"],
  },
  rejectionReason: {
    type: String,
  },
  reason: {
    type: String,
    default: "--",
    required: [true, "Please provide reason"],
  },
  status: {
    type: String,
    enum: ["Approved", "Rejected", "Pending"],
    default: "Pending",
  },
  appliedOn: {
    type: Date,
    default: Date.now(),
  },
  approvedOn: {
    type: Date,
  },
  rejectedOn: {
    type: Date,
  },
});

leaveSchema.pre(/^find/, function (next) {
  this.populate({
    path: "employee",
    select:
      " -password -joiningDate -salary -address -city -state -zipCode -country -status -password -passwordChanged -createdAt -updatedAt  -confirmPassword",
  });
  next();
});

const leaveModel = mongoose.model("leave", leaveSchema);

module.exports = leaveModel;
