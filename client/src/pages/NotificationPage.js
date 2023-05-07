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
            const res = await axios.get('/api/v1/user/get-all-notification',{userId:user._id},{
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
    const handleDeleteAllRead=()=>{

    }
  return (
    <Layout>
        <h4 className='=text center p-3'>Notifiction Page</h4>
        <Tabs>
            <Tabs.TabPane tab='unread' key={0}>
                <div className="d-flex">
                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark All read</h4>
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
            <Tabs.TabPane tab='read' key={1}>
                <div className="d-flex">
                    <h4 className='p-2' onClick={handleDeleteAllRead}>Delete All read</h4>
                </div>
            </Tabs.TabPane>
        </Tabs>
      
    </Layout>
  )
}

export default NotificationPage
