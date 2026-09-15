import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import DashboardLayout from "./pages/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"






function App() {



  return (
    <div>

         <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/dashboardLayout" element={<DashboardLayout/>}>
                  <Route index element={<Dashboard/>} />
                  <Route path="profile" element={<Profile/>} />
                </Route>
                


            </Routes>
        </BrowserRouter>


       

    </div>
   
  )
  
}

export default App
