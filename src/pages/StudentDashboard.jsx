import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CourseCard from '../components/dashboard/CourseCard';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import StatsCard from '../components/dashboard/StatsCard';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  BookOpenIcon,
  QrCodeIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

function StudentDashboard() {
  const [courses] = useState([
    {
      id: 1,
      name: 'Operating Systems',
      code: 'CS101',
      time: '9:00 AM',
      lecturer: 'Dr. Smith',
      attendance: '85%'
    },
    {
      id: 2,
      name: 'Computer Networks',
      code: 'CS201',
      time: '11:00 AM',
      lecturer: 'Prof. Johnson',
      attendance: '92%'
    },
    {
      id: 3,
      name: 'Software Design',
      code: 'CS301',
      time: '2:00 PM',
      lecturer: 'Dr. Williams',
      attendance: '78%'
    },
    {
      id: 4,
      name: 'Database Concepts',
      code: 'CS401',
      time: '4:00 PM',
      lecturer: 'Prof. Davis',
      attendance: '88%'
    },
  ]);

  const stats = [
    { title: 'Enrolled Courses', value: '4', icon: AcademicCapIcon },
    { title: 'Attendance Rate', value: '86%', icon: ClockIcon },
    { title: 'Upcoming Tests', value: '2', icon: BookOpenIcon },
    { title: 'Active Days', value: '5', icon: CalendarIcon },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <WelcomeCard studentName="John Doe" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Courses</h2>
          <button
            onClick={() => {}} // Will be implemented for QR code generation
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <QrCodeIcon className="w-5 h-5 mr-2" />
            Generate QR Code
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-500">{course.code}</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Lecturer:</span>
                  <span className="font-medium">{course.lecturer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{course.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Attendance:</span>
                  <span className={`font-medium ${
                    parseInt(course.attendance) >= 80 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {course.attendance}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {}} // Will be implemented for viewing course details
                className="mt-4 w-full py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard; 