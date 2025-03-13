import React from 'react';
import Sidebar from './Sidebar';
import VisitorLogsSummary from './VisitorLogsSummary';
import LettersSummary from './LettersSummary';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Administrator Dashboard</h1>
                <div className="summary-section">
                    <VisitorLogsSummary />
                    <LettersSummary />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;