const doctorModel = require("../model/doctorModel")
// import { notification } from 'antd';
const appointmentModel = require('../model/appointmentModel');
const userModel=require('../model/userModel')

const getDoctorInfoController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'doctor data fetch success',
            data:doctor
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in fetchibg details'
        })
    }
}

const updateProfileController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        res.status(201).send({success:true,message:'Doctor Profile Updated',data:doctor,})
    }catch(error){
        console.log(error)
        res.status(500).send({
            message:'Doctor Profile update issue',
            success:false,
            error
        })
    }
}

const getDoctorByIdController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({success:true,message:'Doc Info fetch',data:doctor})
    }catch(error){
        console.log(error)
        res.status(500).send({success:false,message:'Error in doctor info',error})
    }
}

const doctorAppointmentController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        const appointments=await appointmentModel.find({doctorId:doctor._id})
        res.status(200).send({success:true,message:'Doctor Appointments fetch Successfully',data:appointments,})

    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error in doc appointments',success:false,error })
    }
}
const updateStatusController=async(req,res)=>{
    try{
        const {appointmentId,status}=req.body
        const appointments=await appointmentModel.findByIdAndUpdate(appointmentId,{status})
        const user=await userModel.findOne({_id:appointments.userId})
        const notification=user.notification
        notification.push({
            type:'Status updated',
            message:`your appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments'
        })
        await user.save()
        res.status(200).send({success:true,message:'Appointment status updated'})

    }catch(error){
        console.log(error)
        res.status(500).send({success:false,message:'Error to update',error})
    }

}
module.exports ={getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentController,updateStatusController}