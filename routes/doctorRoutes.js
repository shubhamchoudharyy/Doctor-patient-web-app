const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDoctorInfoController,updateProfileController
    ,getDoctorByIdController,doctorAppointmentController,updateStatusController } = require('../controllers/doctorCtrl')

const router=express.Router()

router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

router.post('/updateProfile',authMiddleware,updateProfileController)

router.post('/getDoctorById',authMiddleware,getDoctorByIdController)

router.post('/doctor-appointments',authMiddleware,doctorAppointmentController)

router.post('/update-status',authMiddleware,updateStatusController)
module.exports=router