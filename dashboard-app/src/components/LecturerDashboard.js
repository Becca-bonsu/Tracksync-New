import React from 'react';
import Sidebar from './Sidebar';
import VisitorLogsSummary from './VisitorLogsSummary';
import LettersSummary from './LettersSummary';
import './styles/main.css';

const LecturerDashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Lecturer Dashboard</h1>
                <VisitorLogsSummary />
                <LettersSummary />
            </div>
        </div>
    );
};

export default LecturerDashboard;