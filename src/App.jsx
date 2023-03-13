import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserDashboard from './pages/UserDashboard'
import store from './store/store'
import './App.css'
import { loadUser, setAuth } from './store/tasksSlice'
import { useEffect } from 'react'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {

  useEffect(() => {
    store.dispatch(setAuth({ token: localStorage.token }))
    // Check if current token is valid.
    store.dispatch(loadUser());
  }, []);

  const user = useSelector(state => state.storeData.user)

  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname
    const allowedRoutes = ['/login', '/signup', '/forgotpassword',"/resetpassword"]
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/adminhome');
      } else if (user.role === 'USER') {
        navigate('/userhome');
      }
    } else if (allowedRoutes.includes(path)) {
      // allow access to login and signup pages
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path='/' element={<p>Loading...</p>} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path="/userhome" element={<UserDashboard />} />
      <Route path='/adminhome' element={<AdminDashboard />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/resetpassword' element={<ResetPassword />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
