const express=require('express')
const { loginController, registerController, authController,
     applyDoctorController, getAllNotificationController, deleteAllNotificationController
     ,bookAppointmentController,getUserInfoController,updateProfileController,
     getAllUsers, getAllDoctorsController,bookingAvailabilityController,setAvatar,userAppointmentsController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/login',loginController)


router.post('/register',registerController)

router.post('/setAvatar/:id',setAvatar)

router.get("/allusers/:id",getAllUsers);

router.post('/getUserInfo',authMiddleware,getUserInfoController)

router.post('/updateProfile',authMiddleware,updateProfileController)


router.post('/getUserData',authMiddleware,authController)

router.post('/apply-doctor',authMiddleware,applyDoctorController)

router.post('/get-all-notification',authMiddleware,getAllNotificationController)

router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)

router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

router.post('/book-appointment',authMiddleware,bookAppointmentController)

router.post('/booking-availability',authMiddleware,bookingAvailabilityController)

router.get('/user-appointments',authMiddleware,userAppointmentsController)




module.exports=router