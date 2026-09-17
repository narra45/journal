import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import DashboardLayout from './pages/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'






function App() {



  return (
    <div>

         <HashRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/dashboardLayout" element={<DashboardLayout/>}>
                  <Route index element={<Dashboard/>} />
                  <Route path="profile" element={<Profile/>} />
                </Route>
                


            </Routes>
        </HashRouter>


       

    </div>
   
  )
  
}

export default App
