import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CourseCard from '../components/dashboard/CourseCard';
import StatsCard from '../components/dashboard/StatsCard';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ClockIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';

function LecturerDashboard() {
  const [courses] = useState([
    {
      id: 1,
      name: 'OPS',
      code: 'CS101',
      time: '9:00 AM',
      students: 45,
    },
    {
      id: 2,
      name: 'CCNA',
      code: 'CS201',
      time: '11:00 AM',
      students: 38,
    },
    {
      id: 3,
      name: 'CSD',
      code: 'CS301',
      time: '2:00 PM',
      students: 42,
    },
    {
      id: 4,
      name: 'DBC',
      code: 'CS401',
      time: '4:00 PM',
      students: 35,
    },
  ]);

  const stats = [
    { title: 'Total Courses', value: '4', icon: AcademicCapIcon },
    { title: 'Total Students', value: '160', icon: UserGroupIcon },
    { title: 'Hours Today', value: '6', icon: ClockIcon },
    { title: 'Active Days', value: '5', icon: CalendarIcon },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
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

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LecturerDashboard;
