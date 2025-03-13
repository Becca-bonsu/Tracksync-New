import { useState, useEffect } from 'react';
import {
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Fallback data for development/testing
const fallbackData = [
  {
    id: 1,
    name: 'John Doe',
    purpose: 'Meeting with HR',
    checkIn: '2024-02-27 09:30 AM',
    checkOut: '2024-02-27 11:30 AM',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Jane Smith',
    purpose: 'Job Interview',
    checkIn: '2024-02-27 02:00 PM',
    checkOut: null,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    purpose: 'Document Submission',
    checkIn: '2024-02-27 03:15 PM',
    checkOut: '2024-02-27 04:00 PM',
    status: 'Completed'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    purpose: 'Consultation',
    checkIn: '2024-02-27 10:00 AM',
    checkOut: '2024-02-27 10:45 AM',
    status: 'Completed'
  }
];

function VisitorLogs() {
  const [visitors, setVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/visitors');
      if (!response.ok) {
        throw new Error('Failed to fetch visitors');
      }
      const data = await response.json();
      setVisitors(data);
    } catch (err) {
      console.warn('Using fallback data:', err.message);
      setVisitors(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Visitor Logs</h2>
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading visitor logs...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Purpose</th>
              <th className="px-4 py-2 text-left">Check In</th>
              <th className="px-4 py-2 text-left">Check Out</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(visitor => (
              <tr key={visitor.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{visitor.name}</td>
                <td className="px-4 py-2">{visitor.purpose}</td>
                <td className="px-4 py-2">{visitor.checkIn}</td>
                <td className="px-4 py-2">{visitor.checkOut || 'N/A'}</td>
                <td className="px-4 py-2">{visitor.status}</td>
                <td className="px-4 py-2">
                  <button onClick={() => console.log('Edit visitor:', visitor)}>
                    <PencilIcon className="h-5 w-5 text-blue-500" />
                  </button>
                  <button onClick={() => console.log('Delete visitor:', visitor)}>
                    <TrashIcon className="h-5 w-5 text-red-500 ml-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VisitorLogs;
