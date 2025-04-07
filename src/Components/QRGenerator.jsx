import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.png';
    a.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4">
      <div className="flex flex-col items-center bg-white shadow-xl p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
        <input
          type="text"
          placeholder="Enter text or link"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded w-full text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <label className="flex items-center gap-2">
            <span>Foreground:</span>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-10 h-10 cursor-pointer border rounded"
            />
          </label>
          <label className="flex items-center gap-2">
            <span>Background:</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 cursor-pointer border rounded"
            />
          </label>
        </div>
        {text && (
          <div ref={qrRef} className="relative mt-6 bg-white p-4 rounded-lg shadow-lg">
            <QRCodeCanvas value={text} size={200} fgColor={fgColor} bgColor={bgColor} />
          </div>
        )}
        {text && (
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Download QR Code
          </button>
        )}
      </div>
    </div>
  )
  
};

export default QRGenerator;
