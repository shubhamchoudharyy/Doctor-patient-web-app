

const doctorModel=require('../model/doctorModel')
const userModel=require('../model/userModel')

const getAllUsersController=async(req,res)=>{
    try{
        const users=await userModel.find({})
        res.status(200).send({
            success:true,
            message:'users data',
            data:users
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching users',
            error
        })
    }
}

const getAllDoctorsController=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        res.status(200).send({success:true,message:'Doctors data list',data:doctors})

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting doctor data',
            error
        })
    }

}
const changeAccountStatusController=async(req,res)=>{
    try{
        const {doctorId,status}=req.body
        const doctor=await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user=await userModel.findOne({_id:doctor.userId})
        const notification=user.notification
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor Account Request has  ${status}`,
            onclickPath:'/notification' 
        })

        if(!user.isDoctor){
            user.isDoctor =status ==='approved' ? true :false;
        }
        else if(user.isDoctor){
            user.isDoctor =status ==='reject' ?false :true;
            doctor.deleteOne()
            
        }
        await user.save()
        res.status(201).send({message:'Account status updated',
                success:true,data:doctor,
            })
    }catch(error){
        console.log(error)
        res.status(500).send({success:false,message:'Error in account status',
    error})
    }
}
const deleteAccountStatusController = async (req, res) => {
    try {
      const { _id, isAdmin } = req.body;
  
      if (isAdmin) {
        return res.status(400).send({
          success: false,
          message: "Admin account cannot be deleted",
        });
      }
  
      const user = await userModel.findOne({ userId: _id });
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      await user.deleteOne();
  
      res.status(201).send({
        success: true,
        message: "Account deleted",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in account deletion",
        error,
      });
    }
  };
  

module.exports={getAllDoctorsController,getAllUsersController,changeAccountStatusController,deleteAccountStatusController}