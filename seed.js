const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User=require('./Models/userModel')
const users = [
        {
          "name": "John Doe",
          "email": "admin@example.com",
          "password": "Admin@123",
          "confirmPassword": "Admin@123",
          "role": "admin",
          "department": "HR",
          "phone": "9876543210"
        },
        {
          "name": "Alice Johnson",
          "email": "alice@example.com",
          "password": "Employee@123",
          "confirmPassword": "Employee@123",
          "role": "employee",
          "department": "IT",
          "phone": "9876541230"
        }
  ];
  
  User.insertMany(users)
    .then(() => {
      console.log("Users added successfully!");
      mongoose.connection.close();
    })
    .catch(err => console.log(err));