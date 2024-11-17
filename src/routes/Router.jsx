import { Route, Routes, Navigate } from "react-router-dom";
import Login from '../components/Login & Forgot Password/Login'
import SupervisorDashboard from '../components/Supervisor/Dashboard/Dashboard'

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/dashboard" element={<SupervisorDashboard />} />
            {/* Add more routes as needed */}
        </Routes>
    )
}

export default Router