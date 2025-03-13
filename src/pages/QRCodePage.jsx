import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

function QRCodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQrData = location.state?.qrData;
  const [qrData, setQrData] = useState(initialQrData);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!initialQrData) return;

    const refreshQR = () => {
      const parsedData = JSON.parse(initialQrData);
      const newData = {
        ...parsedData,
        timestamp: new Date().toISOString(),
        sessionId: Math.random().toString(36).substring(2, 15),
      };
      setQrData(JSON.stringify(newData));
      setTimeLeft(300);
    };

    const timer = setInterval(refreshQR, 300000);
    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(countdown);
    };
  }, [initialQrData]);

  if (!qrData) {
    return <div>No QR data available</div>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const parsedData = JSON.parse(qrData);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Attendance QR Code</h2>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <QRCodeSVG 
                value={qrData}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
          <p className="text-center text-gray-600 mb-2">
            Course: {parsedData.courseName}
          </p>
          <p className="text-center text-sm text-gray-500 mb-6">
            QR Code refreshes in: {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default QRCodePage;
