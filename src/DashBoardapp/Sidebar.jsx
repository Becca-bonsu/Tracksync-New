import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Sidebar.css'; // Ensure this path is correct

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Dashboard Navigation</h2>
            <ul>
                <li>
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                </li>
                <li>
                    <Link to="/lecturer-dashboard">Lecturer Dashboard</Link>
                </li>
                <li>
                    <Link to="/visitor-logs">Visitor Logs Summary</Link>
                </li>
                <li>
                    <Link to="/letters-summary">Letters Summary</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;