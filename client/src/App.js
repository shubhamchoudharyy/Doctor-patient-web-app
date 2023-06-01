
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Spinner from './components/Spinner'
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import SetAvatar from './pages/SetAvatar';
import Chat from './pages/Chat';
import BmiCalculator from './pages/Bmi';
import UserProfile from './pages/user/Profile';
import Underweight from './pages/underweight/Underweight';
import Overweight from './pages/overweight/Overweight';
import Port from './pages/Port';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  const {loading}=useSelector((state)=>state.alerts);
  return (
    <>
    <BrowserRouter>
    {loading ? <Spinner /> :
    
    <Routes>

      <Route path='/' 
      element={
      <ProtectedRoutes>
        <Port />
      </ProtectedRoutes> } />

      <Route path='/book' 
      element={
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes> } />

      <Route path='/diet' 
      element={
      <ProtectedRoutes>
        <BmiCalculator />
      </ProtectedRoutes> } />

      <Route path='/chat' 
      element={
      <ProtectedRoutes>
        <Chat />
      </ProtectedRoutes> } />

      <Route path='/menu' 
      element={<ProtectedRoutes>
        <Underweight />
      </ProtectedRoutes>} />

      <Route path='/menu2' 
      element={<ProtectedRoutes>
        <Overweight />
      </ProtectedRoutes>} />

      <Route path='/setAvatar' 
      element={
      <ProtectedRoutes>
        <SetAvatar />
      </ProtectedRoutes> } />

      <Route path='/apply-doctor' 
      element={
      <ProtectedRoutes>
        <ApplyDoctor />
      </ProtectedRoutes> } />

      <Route path='/admin/users' 
      element={
      <ProtectedRoutes>
        <Users />
      </ProtectedRoutes> } />

      <Route path='/admin/doctors' 
      element={
      <ProtectedRoutes>
        <Doctors />
      </ProtectedRoutes> } />

      <Route path='/doctor/profile/:id' 
      element={
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes> } />

      <Route path='/user/profile/:id' 
      element={
      <ProtectedRoutes>
        <UserProfile/>
      </ProtectedRoutes> } />

      <Route path='/admin/profile/:id' 
      element={
      <ProtectedRoutes>
        <AdminProfile/>
      </ProtectedRoutes> } />


      <Route path='/doctor/book-appointment/:doctorId' 
      element={
      <ProtectedRoutes>
        <BookingPage />
      </ProtectedRoutes> } />

      <Route path='/notification' 
      element={
      <ProtectedRoutes>
        <NotificationPage />
      </ProtectedRoutes> } />

      <Route path='/register'
       element={
        <PublicRoute>
          <Register />
        </PublicRoute>
       } />

      <Route path='/appointments'
       element={
        <ProtectedRoutes>
          <Appointments />
        </ProtectedRoutes>
       } />

      <Route path='/doctor-appointments'
       element={
        <ProtectedRoutes>
          <DoctorAppointments />
        </ProtectedRoutes>
       } />

      <Route path='/login' 
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      </Routes>
}</BrowserRouter>
    </>
  );
}

export default App;
