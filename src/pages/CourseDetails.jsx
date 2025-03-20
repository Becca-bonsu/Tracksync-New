import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  ClockIcon,
  UserIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import QRCode from 'qrcode.react';

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    id: courseId,
    name: 'Operating Systems',
    code: 'CS101',
    lecturer: 'Dr. Smith',
    schedule: 'Monday, Wednesday 9:00 AM',
    attendance: '85%',
    nextTest: '2024-04-15',
    description: 'This course covers the fundamentals of operating systems, including process management, memory management, and file systems.',
    topics: [
      'Introduction to Operating Systems',
      'Process Management',
      'Memory Management',
      'File Systems',
      'I/O Systems',
      'Security and Protection'
    ],
    assignments: [
      { id: 1, title: 'Process Scheduling Implementation', dueDate: '2024-04-10', status: 'Pending' },
      { id: 2, title: 'Memory Management Case Study', dueDate: '2024-04-20', status: 'Not Started' },
    ],
    attendanceHistory: [
      { date: '2024-03-01', status: 'Present' },
      { date: '2024-03-03', status: 'Present' },
      { date: '2024-03-08', status: 'Absent' },
      { date: '2024-03-10', status: 'Present' },
      { date: '2024-03-15', status: 'Present' },
    ]
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
              <p className="text-gray-500 mt-1">Course Code: {course.code}</p>
            </div>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Current Grade: A-
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <UserIcon className="w-6 h-6 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Lecturer</p>
                <p className="font-medium">{course.lecturer}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <ClockIcon className="w-6 h-6 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Schedule</p>
                <p className="font-medium">{course.schedule}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="font-medium">{course.attendance}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Next Test</p>
                <p className="font-medium">{new Date(course.nextTest).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <h2 className="text-lg font-semibold mb-2">Course Description</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Course Topics</h2>
              <ul className="space-y-2">
                {course.topics.map((topic, index) => (
                  <li key={index} className="flex items-center">
                    <BookOpenIcon className="w-5 h-5 text-blue-500 mr-2" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Upcoming Assignments</h2>
              <div className="space-y-3">
                {course.assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">{assignment.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded ${
                        assignment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Attendance History</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                {course.attendanceHistory.map((record, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                    title={`${record.date}: ${record.status}`}
                  >
                    {record.status === 'Present' ? '✓' : '✗'}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Course QR Code</h2>
            <div className="flex justify-center">
              <QRCode value={`course-${course.id}`} size={128} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CourseDetails; 