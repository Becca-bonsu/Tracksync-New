import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import LecturerDashboard from './components/LecturerDashboard';
import Sidebar from './components/Sidebar';
import './styles/main.css';

function App() {
    const [userType, setUserType] = useState('lecturer');

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Dashboard Application</h1>
                <select onChange={handleUserTypeChange} value={userType}>
                    <option value="lecturer">Sign in as Lecturer</option>
                    <option value="administrator">Sign in as Administrator</option>
                </select>
            </header>
            <div className="dashboard-container">
                <Sidebar />
                {userType === 'administrator' ? <AdminDashboard /> : <LecturerDashboard />}
            </div>
        </div>
    );
}

export default App;