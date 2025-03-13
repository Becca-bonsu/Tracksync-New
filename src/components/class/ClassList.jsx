import { useState, useEffect } from 'react';
import { 
  DocumentDuplicateIcon, 
  TableCellsIcon, 
  DocumentIcon,
  AdjustmentsHorizontalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

function ClassList({ courseId }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      index: 'CS/2023/001',
      test: 8,
      assign: 9,
      midSem: 18,
      total: 35
    },
    {
      id: 2,
      name: 'Jane Smith',
      index: 'CS/2023/002',
      test: 7,
      assign: 8,
      midSem: 16,
      total: 31
    },
    // Add more sample data as needed
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'index', label: 'Index', sortable: true },
    { key: 'test', label: 'Test(10)', sortable: true },
    { key: 'assign', label: 'Assign(10)', sortable: true },
    { key: 'midSem', label: 'MidSem(20)', sortable: true },
    { key: 'total', label: 'Total(40)', sortable: true },
    { key: 'action', label: 'Action', sortable: false }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
    // Implement export logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4 text-red-500">
        {students.length === 0 && "No student registered under this program course."}
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => handleExport('copy')}
            className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
            Copy
          </button>
          <button 
            onClick={() => handleExport('excel')}
            className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <TableCellsIcon className="w-4 h-4 mr-2" />
            Excel
          </button>
          <button 
            onClick={() => handleExport('pdf')}
            className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <DocumentIcon className="w-4 h-4 mr-2" />
            PDF
          </button>
          <button 
            className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
            Column visibility
          </button>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r cursor-pointer"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && (
                      <span className="ml-2">
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          )
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r"
                  >
                    {column.key === 'action' ? (
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      student[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing {students.length ? '1' : '0'} to {students.length} of {students.length} entries
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
          <button className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}

export default ClassList;
