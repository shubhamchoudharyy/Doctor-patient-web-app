const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController,deleteAccountStatusController } = require('../controllers/adminCtrl')
const router=express.Router()

router.get('/getAllUsers',authMiddleware,getAllUsersController)

router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)


router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)
router.post('/deleteAccountStatus',authMiddleware,deleteAccountStatusController)

module.exports=router