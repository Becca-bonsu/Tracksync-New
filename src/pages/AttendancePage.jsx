import { useState } from 'react';
import ScanAttendance from '../components/attendance/ScanAttendance';
import DashboardLayout from '../components/layout/DashboardLayout';

function AttendancePage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <ScanAttendance />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AttendancePage;
