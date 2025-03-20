import { useState, useEffect } from 'react';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import EmployeeForm from './EmployeeForm';

// Fallback data for development/testing
const fallbackData = [
  {
    id: 1,
    fullName: 'John Doe',
    department: 'HR',
    role: 'HR Manager',
    checkIn: '2024-02-28 08:30 AM',
    checkOut: '2024-02-28 05:30 PM',
    status: 'Active'
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    department: 'Finance',
    role: 'Financial Analyst',
    checkIn: '2024-02-28 09:00 AM',
    checkOut: null,
    status: 'On Leave'
  },
  {
    id: 3,
    fullName: 'Robert Johnson',
    department: 'IT',
    role: 'Senior Developer',
    checkIn: '2024-02-28 08:45 AM',
    checkOut: null,
    status: 'Active'
  }
];

const departments = [
    'Administration',
    'Human Resources',
    'Finance',
    'Research and Innovation',
    'Corporate',
    'IT',
    'Consultancy',
    'Faculty'
];

function Employees({ searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    department: '',
    role: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }
      const data = await response.json();
      setEmployees(data);
      setIsUsingFallback(false);
    } catch (err) {
      console.warn('Using fallback data:', err.message);
      setEmployees(fallbackData);
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (employee) => {
    if (isUsingFallback) {
      return;
    }
    // Add your edit logic here
  };

  const handleDelete = async (employee) => {

    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      const response = await fetch(`/api/employees/${employee.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      // Update the state to remove the deleted employee
      setEmployees(employees.filter((e) => e.id !== employee.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  const handleCancel = () => {
    setShowAddModal(false);
  };

  const handleSubmit = async (values) => {
    try {
      // Add your API call here to save the employee
      console.log('New employee data:', values);
      setShowAddModal(false);
      // Refresh the employees list
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleStatusToggle = async (employee) => {
    if (isUsingFallback) {
      alert('Status toggle functionality is not available in demo mode');
      return;
    }

    const newStatus = employee.status === 'Active' ? 'On Leave' : 'Active';
    try {
      const response = await fetch(`/api/employees/${employee.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee status');
      }

      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-3xl transition-all">
      {/* {isUsingFallback && (
        <div className="bg-yellow-50 p-4">
          <p className="text-yellow-800 text-sm">
            Currently showing demo data. Connect to an API to see real data.
          </p>
        </div>
      )} */}

      <div className="border-b border-gray-200">
        <div className="sm:flex sm:items-center p-6">
          <div className="sm:flex-auto">
            <h2 className="text-lg font-semibold text-gray-900">Employees</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage employee information, roles, and work status
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading employees...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.checkIn || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.checkOut || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusToggle(employee)}
                        className={`px-3 py-1 inline-flex items-center space-x-1 rounded-full text-xs font-semibold ${
                          employee.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {employee.status === 'Active' ? (
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 mr-1" />
                        )}
                        {employee.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(employee)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => page + 1)}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">{filteredEmployees.length}</span> of{' '}
                  <span className="font-medium">{filteredEmployees.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(page => page + 1)}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}

      {showAddModal && (
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default Employees; 