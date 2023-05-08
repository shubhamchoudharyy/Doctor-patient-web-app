const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDoctorInfoController,updateProfileController } = require('../controllers/doctorCtrl')

const router=express.Router()

router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

router.post('/updateProfile',authMiddleware,updateProfileController)

module.exports=router