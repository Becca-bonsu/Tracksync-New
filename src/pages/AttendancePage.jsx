import { useParams } from 'react-router-dom';
import AttendanceList from '../components/attendance/AttendanceList';
import DashboardLayout from '../components/layout/DashboardLayout';

function AttendancePage() {
  const { courseId } = useParams(); // Get courseId from URL parameters

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <AttendanceList courseId={courseId} /> {/* Pass courseId to AttendanceList */}
      </div>
    </DashboardLayout>
  );
}

export default AttendancePage;
