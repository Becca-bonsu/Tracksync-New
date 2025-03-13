import { useNavigate } from 'react-router-dom';

function QRCodeGenerator({ courseData, isActive }) {
  const navigate = useNavigate();
  
  const generateQRData = () => {
    const data = {
      courseId: courseData.id || 1, // Fallback to 1 if id is not present
      courseName: courseData.name || 'OPS',
      timestamp: new Date().toISOString(),
      sessionId: Math.random().toString(36).substring(2, 15)
    };
    return JSON.stringify(data); // Remove base64 encoding
  };

  const handleGenerateQR = () => {
    const qrData = generateQRData();
    navigate('/qr-code', { state: { qrData } });
  };

  if (!isActive) return null;

  return (
    <div className="mt-4">
      <button
        onClick={handleGenerateQR}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Open QR Code Page
      </button>
    </div>
  );
}

export default QRCodeGenerator;