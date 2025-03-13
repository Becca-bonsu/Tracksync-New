import React, { useState, useEffect } from 'react';

const LecturerManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ id: null, name: '', email: '', courses: '', totalClasses: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await fetch('/api/lecturers');
        if (!response.ok) {
          throw new Error('Failed to fetch lecturers');
        }
        const data = await response.json();
        setLecturers(data);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing lecturer
      setLecturers(lecturers.map(lecturer => (lecturer.id === formData.id ? formData : lecturer)));
    } else {
      // Add new lecturer
      setLecturers([...lecturers, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', email: '', courses: '', totalClasses: 0 });
    setIsEditing(false);
  };

  const handleEdit = (lecturer) => {
    setFormData(lecturer);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setLecturers(lecturers.filter(lecturer => lecturer.id !== id));
  };

  if (isLoading) {
    return <div>Loading lecturers...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Lecturer Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 rounded mr-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          name="courses"
          value={formData.courses}
          onChange={handleChange}
          placeholder="Courses Assigned (comma separated)"
          required
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          name="totalClasses"
          value={formData.totalClasses}
          onChange={handleChange}
          placeholder="Total Classes"
          required
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isEditing ? 'Update Lecturer' : 'Add Lecturer'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="bg-gray-500 text-white p-2 rounded ml-2">
            Cancel
          </button>
        )}
      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Courses Assigned</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total Classes</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lecturers.map((lecturer) => (
            <tr key={lecturer.id}>
              <td className="px-4 py-2">{lecturer.name}</td>
              <td className="px-4 py-2">{lecturer.email}</td>
              <td className="px-4 py-2">{lecturer.courses.join(', ')}</td>
              <td className="px-4 py-2">{lecturer.totalClasses}</td>
              <td className="px-4 py-2">
                <button onClick={() => handleEdit(lecturer)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(lecturer.id)} className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LecturerManagement; 