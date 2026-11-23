import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeDisplay() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-3">
        Scanne ce QRCode avec ton téléphone
      </p>
      <div className="flex justify-center">
        <QRCode value={url} size={150} />
      </div>
      <p className="text-xs text-gray-500 mt-3">{url}</p>
    </div>
  );
}
