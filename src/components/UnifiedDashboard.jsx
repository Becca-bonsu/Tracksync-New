import React from 'react';
import roles from '../config/roles';
import LecturerDashboard from '../pages/LecturerDashboard';
import HrAdminDashboard from '../pages/HrAdminDashboard';
import AdministratorDashboard from '../components/SuperAdmin/AdministratorDashboard';
import StudentDashboard from '../pages/StudentDashboard';

const UnifiedDashboard = ({ userRole }) => {
  const canManageUsers = roles[userRole]?.permissions.includes('manage_users');

  const renderContent = () => {
    switch (userRole) {
      case 'superadmin':
        return <SuperAdminDashboard />;
      case 'administrator':
        return <AdministratorDashboard />;
      case 'hrAdmin':
        return <HrAdminDashboard />;
      case 'lecturer':
        return <LecturerDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <DefaultContent />;
    }
  };

  return (
    <div className="dashboard">
      {canManageUsers && <button>Manage Users</button>}
      {renderContent()}
    </div>
  );
};

const DefaultContent = () => <div>Please select a role.</div>;

export default UnifiedDashboard; 