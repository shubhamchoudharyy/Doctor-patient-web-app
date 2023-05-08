import React from 'react'
import Layout from '../components/Layout'
import { Tabs, notification,message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NotificationPage = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user} =useSelector((state)=>state.user);
    const handleMarkAllRead=async()=>{
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                },
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went Wrong')
        }

    }


    const handleDeleteAllRead=async()=>{
        try{
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`

                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('Something Went Wrong')
        }
    }
  return (
    <Layout>
        <h4 className='=text center p-3'>Notifiction Page</h4>
        <Tabs>
            <Tabs.TabPane tab='Unread' key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleMarkAllRead}>Mark All read</h4>
                </div>
                {
                    user?.notification.map(notificationMsg=>(
                        <div className="card" onClick={navigate(notificationMsg.onClickPath)} style={{cursor:'pointer'}}>
                            <div className="card-text">
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='Read' key={1}>
                <div className="d-flex justify-content-end">
                    <h4 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All read</h4>
                </div>
                {
                    user?.seennotification.map(notificationMsg=>(
                        <div className="card" onClick={navigate(notificationMsg.onClickPath)} style={{cursor:'pointer'}}>
                            <div className="card-text">
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
      
    </Layout>
  )
}

export default NotificationPage
