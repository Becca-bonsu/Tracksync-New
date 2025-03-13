import { useState } from 'react';

function AttendanceForm({ courseData, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    programme: '',
    indexNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, courseId: courseData.courseId, courseName: courseData.courseName });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Mark Attendance</h2>
      <p className="text-gray-600 mb-6">Course: {courseData.courseName}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="programme" className="block text-sm font-medium text-gray-700 mb-1">
            Programme of Study
          </label>
          <input
            type="text"
            id="programme"
            name="programme"
            required
            value={formData.programme}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="indexNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Index Number
          </label>
          <input
            type="text"
            id="indexNumber"
            name="indexNumber"
            required
            value={formData.indexNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Marking Attendance...' : 'Mark Attendance'}
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;
