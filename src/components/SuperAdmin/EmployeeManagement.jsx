import { useState } from 'react';
import Employees from '../admin/Employees';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function EmployeeManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Employee Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage employee information, roles, and work status
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Active Employees</p>
              <p className="text-lg font-semibold text-blue-700">42</p>
            </div>
            <div className="px-4 py-2 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-600 font-medium">On Leave</p>
              <p className="text-lg font-semibold text-purple-700">8</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full max-w-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="p-6">
        <Employees searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default EmployeeManagement; 