import React from 'react';
import QRCode from 'qrcode.react';

export default function QRCodeDisplay({ url, size = 200 }) {
  return (
    <div className="bg-[var(--surface)] rounded-3xl p-4 border border-[var(--line)]">
      <QRCode 
        value={url}
        size={size}
        bgColor="#14102B"
        fgColor="#7CF5D0"
        level="H"
        includeMargin={false}
      />
      <p className="text-center text-[var(--text-muted)] text-sm mt-2">
        Scannez pour jouer
      </p>
    </div>
  );
}
