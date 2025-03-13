import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRCodeScanner({ onScan }) {
  const [error, setError] = useState(null);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    // Create scanner instance
    const qrScanner = new Html5QrcodeScanner(
      "qr-reader", // HTML element ID
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      },
      false // verbose flag
    );

    // Define success callback
    const onScanSuccess = (decodedText) => {
      try {
        const scannedData = JSON.parse(decodedText);
        console.log('Scanned data:', scannedData);
        onScan(scannedData);
        qrScanner.clear();
      } catch (err) {
        console.error('QR Code parsing error:', err);
        setError('Invalid QR Code format');
      }
    };

    // Define error callback
    const onScanError = (err) => {
      // Ignore frequent scan errors
      if (err?.message?.includes('No QR code found')) {
        return;
      }
      console.error('Camera error:', err);
      setError('Error accessing camera');
    };

    // Render the scanner
    qrScanner.render(onScanSuccess, onScanError);
    setScanner(qrScanner);

    // Cleanup on unmount
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [onScan]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Scan Attendance QR Code
        </h3>
        
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <div id="qr-reader" className="w-full"></div>
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        
        <p className="mt-4 text-sm text-gray-500">
          Position the QR code within the frame to scan
        </p>
      </div>
    </div>
  );
}

export default QRCodeScanner;
