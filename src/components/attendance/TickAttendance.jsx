import React, { useEffect, useState } from 'react';
import AttendanceForm from '../ui/AttendanceForm';

const TickAttendance = ({ courseId }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/students/${courseId}`); // Ensure this endpoint is correct
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data); // Ensure this is setting the state correctly
        // Initialize attendance state
        const initialAttendance = {};
        data.forEach(student => {
          initialAttendance[student.id] = false; // Default to absent
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  const handleAttendanceChange = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId], // Toggle attendance status
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const attendanceData = students.map(student => ({
      id: student.id,
      present: attendance[student.id] || false, // Mark as present or absent
    }));
    console.log('Submitting attendance:', attendanceData);
    // Here you would typically send the attendanceData to your backend
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Take Tick Attendance
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {students.map(student => (
            <div key={student.id} className="flex items-center justify-between">
              <span className="text-gray-700">{student.name} ({student.indexNumber})</span>
              <input
                type="checkbox"
                checked={attendance[student.id] || false}
                onChange={() => handleAttendanceChange(student.id)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default TickAttendance; 