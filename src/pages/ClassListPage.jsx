import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CourseListCard from '../components/class/CourseListCard';

function ClassListPage() {
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

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">My Classes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseListCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ClassListPage;
