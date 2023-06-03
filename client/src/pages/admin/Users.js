import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table,message } from 'antd'

const Users = () => {

    const [users,setUsers]=useState([])

    const getUsers= async() =>{
        try{
            const res = await axios.get('/api/v1/admin/getAllUsers',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setUsers(res.data.data)
            }

        }catch(error){
            console.log(error)
        }
    };

    const handleAccountStatus=async(record)=>{
        try{
            const res=await axios.post('/api/v1/admin/deleteAccountStatus',
            {userId:record.userId,},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload()
            }
        }catch(error){
            message.error('Something Went Wrong')
        }

    }
    

    useEffect(()=>{
        getUsers();
    },[])

    const columns=[
        {
            title:'Name',
            dataIndex:'name',
        },
        {
            title:'Email',
            dataIndex:'email',
        },
        {
            title:'Doctor',
            dataIndex:'isDoctor',
            render:(text,record)=>(
                <span>{record.isDoctor ? 'Yes' : 'No' }</span>
            )
        },
        {
            title:'Actions',
            dataIndex:'actions',
            render:(text,record)=>(
                <div className="d-flex">
                    <button className='btn btn-danger' onClick={()=>handleAccountStatus(record)}>Delete</button>
                </div>

            )
        },
    ]
  return (
    <Layout>
      <h2 className='text-center  ' style={{color:'white',width:'170vh'}} >Users List</h2>
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Users
