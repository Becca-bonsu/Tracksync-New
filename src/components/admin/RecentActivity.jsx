import { UserIcon, EnvelopeIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'visitor',
      name: 'John Doe',
      action: 'checked in',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'letter',
      name: 'Budget Approval',
      action: 'received',
      time: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'visitor',
      name: 'Jane Smith',
      action: 'checked out',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'letter',
      name: 'Meeting Minutes',
      action: 'sent',
      time: '2 hours ago',
      status: 'completed'
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'visitor':
        return UserIcon;
      case 'letter':
        return EnvelopeIcon;
      default:
        return UserIcon;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <p className="text-blue-100 text-sm">Latest updates from your department</p>
      </div>
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors shadow-md">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.type === 'visitor' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    activity.type === 'visitor' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.action}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {activity.status === 'completed' ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ClockIcon className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-100 shadow-inner">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
}

export default RecentActivity; 