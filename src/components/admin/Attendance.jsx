import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import {
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Fallback data for development/testing
const fallbackData = [
  {
    id: 1,
    employeeName: 'John Doe',
    department: 'HR',
    checkIn: '2024-02-28 08:30 AM',
    checkOut: '2024-02-28 05:30 PM',
    status: 'Present'
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    department: 'Finance',
    checkIn: '2024-02-28 09:00 AM',
    checkOut: null,
    status: 'Present'
  },
  {
    id: 3,
    employeeName: 'Robert Johnson',
    department: 'IT',
    checkIn: null,
    checkOut: null,
    status: 'Absent'
  }
];

function Attendance() {
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [stats, setStats] = useState({
    totalPresent: 0,
    totalAbsent: 0,
    onTime: 0
  });

  useEffect(() => {
    fetchAttendanceRecords();
    generateQRCode();
  }, []);

  const fetchAttendanceRecords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/attendance');
      if (!response.ok) {
        throw new Error('Failed to fetch attendance records');
      }
      const data = await response.json();
      setAttendanceRecords(data);
      updateStats(data);
      setIsUsingFallback(false);
    } catch (err) {
      console.warn('Using fallback data:', err.message);
      setAttendanceRecords(fallbackData);
      updateStats(fallbackData);
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  const generateQRCode = () => {
    // Generate a unique code that includes timestamp and any other relevant data
    const qrData = {
      timestamp: new Date().toISOString(),
      location: 'Main Office',
      type: 'attendance',
      sessionId: Math.random().toString(36).substring(7)
    };
    setQrCodeData(JSON.stringify(qrData));
  };

  const updateStats = (records) => {
    const present = records.filter(r => r.status === 'Present').length;
    const absent = records.filter(r => r.status === 'Absent').length;
    const onTime = records.filter(r => {
      if (!r.checkIn) return false;
      const checkInTime = new Date(r.checkIn);
      return checkInTime.getHours() < 9; // Consider 9 AM as the cutoff for "on time"
    }).length;

    setStats({
      totalPresent: present,
      totalAbsent: absent,
      onTime: onTime
    });
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-${color}-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${color}-600 text-sm font-medium`}>{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isUsingFallback && (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Currently showing demo data. Connect to an API to see real data.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Present Today"
          value={stats.totalPresent}
          icon={CheckCircleIcon}
          color="green"
        />
        <StatCard
          title="Absent Today"
          value={stats.totalAbsent}
          icon={XCircleIcon}
          color="red"
        />
        <StatCard
          title="On Time"
          value={stats.onTime}
          icon={ClockIcon}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance QR Code</h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <QRCode
                value={qrCodeData}
                size={200}
                level="H"
                includeMargin={true}
                renderAs="svg"
              />
            </div>
            <button
              onClick={generateQRCode}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate New Code
            </button>
            <p className="text-sm text-gray-500">
              Scan this QR code to mark your attendance
            </p>
          </div>
        </div>

        {/* Today's Records */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Records</h3>
          {isLoading ? (
            <div className="text-center text-gray-500">Loading records...</div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {record.employeeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {record.checkIn || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === 'Present'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance; 