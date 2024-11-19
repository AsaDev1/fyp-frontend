import { Route, Routes, Navigate } from "react-router-dom";
import Login from '../components/Login & Forgot Password/Login'
import SupervisorDashboard from '../components/Supervisor/Dashboard/Dashboard'
import AddGroups from "../components/Supervisor/AddGroups/AddGroups";

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/dashboard" element={<SupervisorDashboard />} />
            <Route path="/supervisor/add-groups" element={<AddGroups />} />
            {/* Add more routes as needed */}
        </Routes>
    )
}

export default Router