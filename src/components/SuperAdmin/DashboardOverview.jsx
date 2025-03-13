import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  AcademicCapIcon,
  UserIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

function DashboardOverview() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalPrograms: 0,
    totalVisitors: 0,
    totalLecturers: 0
  });

  useEffect(() => {
    // In a real app, fetch actual data
    setStats({
      totalEmployees: 157,
      totalStudents: 2450,
      totalAdmins: 8,
      totalPrograms: 28,
      totalVisitors: 145,
      totalLecturers: 87
    });
  }, []);

  const cards = [
    { name: 'Employees', value: stats.totalEmployees, icon: UserIcon, color: 'bg-blue-500' },
    { name: 'Students', value: stats.totalStudents, icon: BookOpenIcon, color: 'bg-green-500' },
    { name: 'Programs', value: stats.totalPrograms, icon: AcademicCapIcon, color: 'bg-purple-500' },
    { name: 'Admins', value: stats.totalAdmins, icon: UserGroupIcon, color: 'bg-red-500' },
    { name: 'Lecturers', value: stats.totalLecturers, icon: UserGroupIcon, color: 'bg-yellow-500' },
    { name: 'Recent Visitors', value: stats.totalVisitors, icon: ClipboardDocumentListIcon, color: 'bg-indigo-500' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to the super admin dashboard. Here's a summary of your system data.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${card.color} rounded-md p-3`}>
                  <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {card.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
        <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      Activity {item}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        User {item}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <ClipboardDocumentListIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Action details
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <ClipboardDocumentListIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
