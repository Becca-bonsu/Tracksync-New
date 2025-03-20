import { useState } from 'react';
import { ClockIcon, UsersIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import QRCodeGenerator from '../attendance/QRCodeGenerator';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course, buttonType }) {
  const [isAttendanceActive, setIsAttendanceActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const toggleAttendance = () => {
    setIsAttendanceActive(!isAttendanceActive);
  };

  const toggleAttendanceOptions = () => {
    setShowOptions(!showOptions);
  };

  const viewAttendance = () => {
    navigate(`/attendance/${course.id}`);
  };

  const takeAttendance = () => {
    setShowOptions(true);
  };

  const viewDetails = () => {
    console.log(`Navigating to course details for course ID: ${course.id}`);
    navigate(`/student-dashboard/courses/${course.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md transition-all transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
          <ClipboardIcon className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-500">{course.code}</span>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 mr-2">
            <ClockIcon className="w-4 h-4 text-white" />
          </div>
          {course.time}
        </div>
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 mr-2">
            <UsersIcon className="w-4 h-4 text-white" />
          </div>
          {course.students} students
        </div>
      </div>
      
      {buttonType === 'view' ? (
        <button
          onClick={viewAttendance}
          className={`w-full py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 transition-all`}
        >
          View Attendance
        </button>
      ) : (
        <button
          onClick={takeAttendance}
          className={`w-full py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-green-500 hover:to-green-600 focus:ring-green-500 transition-all`}
        >
          Take Attendance
        </button>
      )}

      {showOptions && (
        <div className="mt-4">
          <button
            onClick={() => navigate(`/scan-attendance/${course.id}`)}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-2"
          >
            Scan Student QR Code
          </button>
          <button
            onClick={() => navigate(`/tick-attendance/${course.id}`)}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            Take Tick Attendance
          </button>
        </div>
      )}

      {isAttendanceActive && (
        <div className="mt-4">
          <QRCodeGenerator 
            courseData={course}
            isActive={isAttendanceActive}
          />
        </div>
      )}

      <button
        onClick={viewDetails}
        className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        View Details
      </button>
    </div>
  );
}

export default CourseCard;
