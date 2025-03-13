import { ClockIcon, UsersIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function CourseListCard({ course }) {
  const navigate = useNavigate();

  const viewClassList = () => {
    navigate(`/class-list/${course.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-1">
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
      
      <button
        onClick={viewClassList}
        className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        View Class List
      </button>
    </div>
  );
}

export default CourseListCard; 