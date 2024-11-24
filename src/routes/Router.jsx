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
            <Route path="/supervisor/add-group" element={<AddGroups />} > 
                <Route path="add-students" element={<AddGroups />} />
                <Route path="check-prerequisites" element={<AddGroups />} />
                <Route path="upload-docs" element={<AddGroups />} />
                
            </Route>
            
            {/* Add more routes as needed */}
            </Route>
        </Routes>
    )
}

export default Router