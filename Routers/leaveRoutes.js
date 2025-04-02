const express = require('express');
const leaveController = require('../Controllers/leaveController');
const authController = require('../Controllers/authController');

const router = express.Router();

// Example route for getting all leaves
router.get('/leaves',leaveController.getAllLeaves);

// Example route for creating a new leave
router.post('/create-leave',authController.protect, leaveController.createLeave);

// Example route for updating a leave
router.put('/leaves/:id', leaveController.updateLeave);
router.get('/emp-leaves/:id',authController.protect, leaveController.getEmployeeLeaves);
router.delete('/delete-leave/:id',leaveController.deleteLeave);

// // Example route for deleting a leave
// router.delete('/leaves/:id', leaveController.deleteLeave);

module.exports = router;