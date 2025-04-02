const { duplexPair } = require("nodemailer/lib/xoauth2");
const leaveModel = require("../Models/leaveModel");
const userModel = require("../Models/userModel");
const mongoose=require('mongoose')
const { StatusCodes } = require('http-status-codes');

exports.createLeave = async (req, res, next) => {
  const { leaveType, duration, startDate, endDate, reason, status, appliedOn } =
    req.body;
  const employee = req.user.id;
  const leave = new leaveModel({
    employee,
    leaveType,
    duration,
    startDate,
    endDate,
    reason,
    status,
    appliedOn,
  });
  await leave.save();
  res.status(201).json({
    status: "success",
    data: {
      leave,
    },
  });
};

exports.getAllLeaves = async (req, res, next) => {
  const leaves = await leaveModel.find();
  res.status(200).json({
    status: "success",
    leaves
  });
};

exports.updateLeave = async (req, res, next) => {
  const {id}=req.params;
  const modifiedLeave = req.body;
  const leave =await leaveModel.findByIdAndUpdate(id,modifiedLeave,{
    new:true,
    runValidators:true
  });
  res.status(200).json({
    status: "success",
    data: {
      leave,
    },
  });
}

exports.getEmployeeLeaves = async (req, res, next) => {
  try {
     const { id } = req.params;
  const leaves = await leaveModel.find({ employee: id });
  res.status(200).json({
    status: "success",
    leaves,
  });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteLeave=async(req,res,next)=>{
  try {
    const id=req.params.id;
    const leave=await leaveModel.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({
      status:"success",
      leave
    })
  } catch (error) {
    console.log(error);
  }
}