import { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import VisitorLogs from '../components/VisitorLogs';
import Letters from '../components/admin/Letters';
import Employees from '../components/admin/Employees';
import Attendance from '../components/admin/Attendance';
import ActivityChart from '../components/admin/ActivityChart';
import RecentActivity from '../components/admin/RecentActivity';
import { 
  MagnifyingGlassIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ClockIcon,
  CalendarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [metrics, setMetrics] = useState({
    totalVisitors: 0,
    totalLetters: 0,
    pendingVisitors: 0,
    pendingLetters: 0
  });

  const [chartData, setChartData] = useState({
    visitors: [25, 30, 45, 35, 55, 40, 35],
    letters: [15, 20, 25, 30, 20, 15, 10]
  });

  // Simulated metrics data
  useEffect(() => {
    // In a real app, this would be an API call
    setMetrics({
      totalVisitors: 156,
      totalLetters: 89,
      pendingVisitors: 12,
      pendingLetters: 8
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-gray-900">{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? (
                <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">{trendValue}%</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl ${
          title.includes('Visitor') 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
            : 'bg-gradient-to-br from-purple-500 to-purple-600'
        }`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const renderDashboardContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Visitors"
          value={metrics.totalVisitors}
          icon={UserGroupIcon}
          trend="up"
          trendValue={12}
        />
        <StatCard
          title="Total Letters"
          value={metrics.totalLetters}
          icon={EnvelopeIcon}
          trend="up"
          trendValue={8}
        />
       
        <StatCard
          title="Pending Letters"
          value={metrics.pendingLetters}
          icon={CalendarIcon}
          trend="down"
          trendValue={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ActivityChart 
            data={chartData}
            title="Weekly Activity Overview"
          />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </>
  );

  const renderMainContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return renderDashboardContent();
      case 'employees':
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
      case 'attendance':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Attendance Management
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Track employee attendance and generate QR codes
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <Attendance />
            </div>
          </div>
        );
      case 'visitors':
      case 'letters':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {currentSection === 'visitors' ? 'Visitor Management' : 'Letter Management'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {currentSection === 'visitors' 
                      ? 'Track and manage visitor logs' 
                      : 'Manage incoming and outgoing letters'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="px-4 py-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Today's {currentSection}</p>
                    <p className="text-lg font-semibold text-blue-700">
                      {currentSection === 'visitors' ? '24' : '12'}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-600 font-medium">This Week</p>
                    <p className="text-lg font-semibold text-purple-700">
                      {currentSection === 'visitors' ? '156' : '89'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${currentSection}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full max-w-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="p-6">
              {currentSection === 'visitors' ? (
                <VisitorLogs searchQuery={searchQuery} />
              ) : (
                <Letters searchQuery={searchQuery} />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar onSelectSection={setCurrentSection} currentSection={currentSection} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentSection === 'dashboard' ? 'Dashboard Overview' :
               currentSection === 'employees' ? 'Employee Management' :
               currentSection === 'visitors' ? 'Visitor Management' : 'Letter Management'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">HR Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 