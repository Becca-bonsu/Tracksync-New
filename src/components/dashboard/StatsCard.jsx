import { 
  AcademicCapIcon, 
  UsersIcon, 
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const icons = {
  'academic-cap': AcademicCapIcon,
  'users': UsersIcon,
  'clock': ClockIcon,
};

function StatsCard({ title, value, icon: Icon }) {
  // Simulate trend data (you can make this dynamic later)
  const trend = Math.random() > 0.5 ? 'up' : 'down';
  const trendValue = Math.floor(Math.random() * 20);

  const getGradientColor = () => {
    switch (title) {
      case 'Total Courses':
        return 'from-blue-500 to-blue-600';
      case 'Total Students':
        return 'from-purple-500 to-purple-600';
      case 'Hours Today':
        return 'from-green-500 to-green-600';
      case 'Active Days':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-gray-900">{value}</h3>
          <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? (
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-medium">{trendValue}%</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${getGradientColor()}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
