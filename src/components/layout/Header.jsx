  import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';

  function Header({ lecturerName }) {
    return (
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden">
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-gray-600" />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">{lecturerName}</span>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(lecturerName)}&background=random`}
                  alt={lecturerName}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  export default Header;
