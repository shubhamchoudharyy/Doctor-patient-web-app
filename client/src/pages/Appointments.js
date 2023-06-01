import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import {Table} from 'antd'

const Appointments = () => {
    const [appointments, setAppointments] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getAppointments = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')}{' '} 
                    {moment(record.time).format('HH:mm')}
                </span>
            )

        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ]
    return (
        <Layout>
            {/* <div style={{ height: '100vh',width:'170vh', display: 'flex', flexDirection: 'column',transform: 'translate(0, 0)' }}> */}
            <h2 className='text-center' style={{marginTop:'' ,color:'white',width:'170vh'}}> Appointment List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {appointments && <Table columns={columns}  dataSource={appointments} />}
            {/* </div> */}
        </Layout>
    )
}

export default Appointments
