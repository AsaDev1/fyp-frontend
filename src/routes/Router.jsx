import { Route, Routes, Navigate } from "react-router-dom";
import SideBar from "../components/Global/SideBar/Sidebar"
import Login from '../components/Login & Forgot Password/Login'
import SupervisorDashboard from '../components/Supervisor/Dashboard/Dashboard'
import AddGroups from "../components/Supervisor/AddGroups/AddGroups";


const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route element={<SideBar/>}> 
            <Route path="/dashboard" element={<SupervisorDashboard />} />

            {/* supervisor and its child routes for navigation */}
            <Route path="/supervisor/add-groups" element={<AddGroups />} > 
                <Route path="step2" element={<AddGroups />} />
                <Route path="step3" element={<AddGroups />} />
            </Route>
            
            {/* Add more routes as needed */}
            </Route>
        </Routes>
    )
}

export default Router