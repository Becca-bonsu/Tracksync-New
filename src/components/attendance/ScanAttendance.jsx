import { useState } from 'react';
import QRCodeScanner from './QRCodeScanner';
import AttendanceForm from '../ui/AttendanceForm';

function ScanAttendance() {
  const [scannedData, setScannedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleScan = (data) => {
    console.log('Received scan data:', data); // Debug log
    if (data && data.courseId && data.courseName) {
      setScannedData(data);
    }
  };

  const handleSubmitAttendance = async (formData) => {
    setIsLoading(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Submitting attendance:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting attendance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debug render log
  console.log('Current state:', { scannedData, isLoading, success });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Attendance System
        </h1>
        
        {!scannedData && (
          <div className="mb-8">
            <QRCodeScanner onScan={handleScan} />
          </div>
        )}
        
        {scannedData && !success && (
          <div className="mb-8">
            <AttendanceForm 
              courseData={scannedData}
              onSubmit={handleSubmitAttendance}
              isLoading={isLoading}
            />
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Attendance Marked Successfully!
            </h3>
            <p className="text-green-600">
              Your attendance has been recorded for {scannedData.courseName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScanAttendance;
