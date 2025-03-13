import { 
  HomeIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon,
  ChartBarIcon,
  UserIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';

function AdminSidebar({ onSelectSection, currentSection }) {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    window.location.href = '/login';
  };

  const menuItems = [
    { name: 'Dashboard', icon: ChartBarIcon, section: 'dashboard' },
    { name: 'Employees', icon: UserIcon, section: 'employees' },
    { name: 'Attendance', icon: QrCodeIcon, section: 'attendance' },
    { name: 'Visitor Logs', icon: UserGroupIcon, section: 'visitors' },
    { name: 'Letters', icon: EnvelopeIcon, section: 'letters' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">TrackSync Admin</h1>
        <p className="text-sm text-gray-500 mt-1">HR Management</p>
      </div>
      
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onSelectSection(item.section)}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors shadow-md ${
                currentSection === item.section 
                  ? 'bg-blue-50 text-blue-600 shadow-lg'
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${
                currentSection === item.section 
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`} />
              <span className={`font-medium ${
                currentSection === item.section 
                  ? 'text-blue-600'
                  : ''
              }`}>{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar; 