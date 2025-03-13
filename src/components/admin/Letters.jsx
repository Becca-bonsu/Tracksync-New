import { useState, useEffect } from 'react';
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

// Updated fallback data structure
const fallbackData = [
  {
    id: 1,
    referenceNumber: 'LTR-2024-001',
    subject: 'Job Application Review',
    sender: 'HR Department',
    recipient: 'Admin Office',
    date: '2024-02-27',
    priority: 'High',
    status: 'pending',
    type: 'incoming'
  },
  {
    id: 2,
    referenceNumber: 'LTR-2024-002',
    subject: 'Meeting Request',
    sender: 'Finance Department',
    recipient: 'Board Office',
    date: '2024-02-26',
    priority: 'Medium',
    status: 'reviewed',
    type: 'incoming'
  },
  {
    id: 3,
    referenceNumber: 'LTR-2024-003',
    subject: 'Interview Invitation',
    sender: 'HR Department',
    recipient: 'John Doe',
    date: '2024-02-27',
    priority: 'High',
    status: 'dispatched',
    type: 'outgoing'
  }
];

function Letters({ searchQuery }) {
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/letters');
      if (!response.ok) {
        throw new Error('Failed to fetch letters');
      }
      const data = await response.json();
      setLetters(data);
      setIsUsingFallback(false);
    } catch (err) {
      console.warn('Using fallback data:', err.message);
      setLetters(fallbackData);
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (letter) => {
    if (isUsingFallback) {
      alert('Edit functionality is not available in demo mode');
      return;
    }
    navigate(`/letters/${letter.type}/${letter.id}/edit`);
  };

  const handleDelete = async (letter) => {
    if (isUsingFallback) {
      alert('Delete functionality is not available in demo mode');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this letter?')) {
      return;
    }

    try {
      const response = await fetch(`/api/letters/${letter.type}/${letter.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete letter');
      }

      fetchLetters();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNew = () => {
    if (isUsingFallback) {
      alert('Add functionality is not available in demo mode');
      return;
    }
    navigate(`/letters/${letter.type === 'incoming' ? 'receive' : 'dispatch'}`);
  };

  const filteredLetters = letters.filter(letter => {
    const matchesSearch = 
      letter.subject?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      letter.sender?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      letter.recipient?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      letter.referenceNumber?.toLowerCase().includes(searchQuery?.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || letter.status === statusFilter;
    const matchesType = typeFilter === 'all' || letter.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      dispatched: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Letters Management</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search letters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="dispatched">Dispatched</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Types</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ref No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLetters.map((letter) => (
              <tr key={letter.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{letter.referenceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{letter.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{letter.sender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{letter.recipient}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{letter.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    letter.type === 'incoming' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {letter.type.charAt(0).toUpperCase() + letter.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(letter.status)}`}>
                    {letter.status.charAt(0).toUpperCase() + letter.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(letter)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(letter)} className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Letters; 