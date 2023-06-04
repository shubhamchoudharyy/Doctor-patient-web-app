
const userModel=require('../model/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const doctorModel=require('../model/doctorModel')
const appointmentModel=require('../model/appointmentModel')
const moment=require('moment')

// const registerController=async (req,res,next)=>{
//     try{
//         const {username,email,password}=req.body;
//     const usernameCheck=await userModel.findOne({username});
//     if(usernameCheck)
//         return res.json({msg:"Username already exist",status:false});
//     const emailCheck=await userModel.findOne({email});
//     if(emailCheck)
//         return res.json({msg:"Email already used",status:false});
//     const hashedPassword=await bcrypt.hash(password,10);
//     const user=await userModel.create({
//         email,
//         username,
//         password : hashedPassword,

//     });
//     delete user.password;
//     return res.json({status : true,user})
//     } catch(e){
//         next(e);
//     }

// }

// const loginController=async (req,res,next)=>{
//     try{
//         const {username,password}=req.body;
//     const user=await userModel.findOne({username});
//     if(!user)
//         return res.json({msg:"Incorrect username or password",status:false});
//     const isPasswordValid=await bcrypt.compare(password,user.password);
//     if(!isPasswordValid)
//         return res.json({msg:"Incorrect username or password",status:false});
//     delete user.password;
   
//     return res.json({status : true,user})
//     } catch(e){
//         next(e);
//     }

// }

const registerController = async (req, res) => {
    try {
      const exisitingUser = await userModel.findOne({ email: req.body.email });
      if (exisitingUser) {
        return res
          .status(200)
          .send({ message: "User Already Exist", success: false });
      }
      const userCheck = await userModel.findOne({ username: req.body.username });
      if (userCheck) {
        return res
          .status(200)
          .send({ message: "Username already Exist", success: false });
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newUser = new userModel(req.body);
      await newUser.save();
      res.status(201).send({ message: "Register Sucessfully", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
    }
  };
  
  // login callback
  const loginController = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "user not found", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Invlid EMail or Password", success: false });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      
      res.status(200).json({ message: "Login Success", success: true, token,user });
      
      
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
  };
  
  const setAvatar=async (req,res,next)=>{
    try{
        const userId=req.params.id;
        const avatarImage=req.body.image;
        const userData=await userModel.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage,});
    }catch(ex){
        next(ex);
    }

}
const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = await userModel.findById(req.params.id);
    const isAdmin = currentUser.isAdmin;
    const isDoctor = currentUser.isDoctor;

    let filter = {};

    if (isAdmin) {
      // If current user is an admin, show all users
      filter = {};
    } else if (isDoctor) {
      // If current user is a doctor, show admins and users with isDoctor set to false
      filter = { $or: [{ isAdmin: true }, { isDoctor: false }] };
    } else {
      // If current user is a regular user, show users with isDoctor set to true
      filter = { isDoctor: true };
    }

    const users = await userModel
      .find(filter)
      .select(["email", "username", "avatarImage", "_id"]);

    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};



  

const authController=async(req,res)=>{
    try{
        const user=await userModel.findById({_id:req.body.userId})
        user.password=undefined;
        if(!user){
            return res.status(200).send({
                message:'user not found',
                success:false
            })
        }else{
            res.status(200).send({success:true,
            data:user
        })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Auth error',success:false,error})
    }
}

const applyDoctorController=async(req,res)=>{
    try{
        const newDoctor=await doctorModel({...req.body,status:'pending'})
        await newDoctor.save()
        const adminUser=await userModel.findOne({isAdmin:true})
        const notification=adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstname} ${newDoctor.lastname} has applied for a doctor Account`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstname + ' ' + newDoctor.lastname,
                onClickPath:'/admin/doctors' 
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success:true,
            message:'Doctor Account Applied Successfully',
        })
    }catch(error){
        console.log(error)
        res.status(500).send({success:false,error,message:'Error while applying doctor'})
    }


}

const getAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        const seennotification=user.seennotification
        const notification=user.notification
        seennotification.push(...notification)
        user.notification=[]
        user.seennotification=notification
        const updateUser=await user.save()
        res.status(200).send({
            success:true,
            message:'all notifications marked as read',
            data:updateUser,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error in notification',success:false,error
        })
    }
}

const deleteAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        user.notification=[]
        user.seennotification=[]
        const updateUser=await user.save()
        updateUser.password=undefined
        res.status(200).send({
            success:true,
            message:'Notifications Deleted Successfully',
            data:updateUser,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({success:false,message:'unable to delete all notifications',error})
    }

}

const getAllDoctorsController=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({status:'approved'})
        res.status(200).send({
            success:true,
            message:'Doctors List Fetched Successfully',
            data:doctors,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({success:false,error,message:'Error while fetching doctors'})
    }
}
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    req.body.time = moment(req.body.time, 'HH:mm').toISOString();
    req.body.status = 'pending';

    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    if (user && user.notification) {
      user.notification.push({
        type: 'New-Appointment-request',
        message: `A new appointment request from ${req.body.userInfo.name}`,
        onClickPath: '/user/appointments',
      });
      await user.save();
    }

    res.status(200).json({ success: true, message: 'Appointment booked successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to book appointment', error });
  }
};

  
  const bookingAvailabilityController = async (req, res) => {
    try {
      const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
      const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
      const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
      const doctorId = req.body.doctorId;
      const appointments = await appointmentModel.find({
        doctorId,
        date,
        time: {
          $gte: new Date(fromTime),
          $lte: new Date(toTime),
        },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: 'Appointments not available at this time',
          success: true,
        });
      } else {
        return res.status(200).send({
          message: 'Appointment available',
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in booking',
        error,
      });
    }
  };
  
  
const userAppointmentsController=async(req,res)=>{
    try{
        const appointments=await appointmentModel.find({userId:req.body.userId})
        res.status(200).send({message:'Users appointments fetch successfully',success:true,data:appointments})

    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error in user appointments',success:false,error})
    }
}


const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getUserInfoController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    res.status(200).send({
      success: true,
      message: 'User data fetch success',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error in fetching details',
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.body.userId, req.body, { new: true });
    res.status(201).send({
      success: true,
      message: 'User Profile Updated',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'User Profile update issue',
      success: false,
      error: error.message,
    });
  }
};




module.exports={loginController,registerController,authController,
    applyDoctorController,getAllNotificationController,deleteAllNotificationController
    ,getAllDoctorsController,bookAppointmentController,updateProfileController,getUserInfoController,getUserProfile,
    setAvatar,bookingAvailabilityController,
    getAllUsers,userAppointmentsController,}