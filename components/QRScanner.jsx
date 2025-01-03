"use client";
import { useState } from "react";
import QrReader from "react-qr-scanner";
import PropTypes from "prop-types"; // For prop validation

const QRScanner = ({ onQRCodeData }) => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data.text);
      onQRCodeData(data.text); // Send QR code data to the parent
    }
  };

  const handleError = (err) => {
    setError(err?.message || "Error reading QR code");
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const cameraConstraints = {
    facingMode: "environment",
  };

  return (
    <div className="text-center bg-slate-950/80 backdrop-blur-xl p-6 rounded-xl shadow-2xl max-w-lg mx-auto border border-slate-800/50">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-transparent bg-clip-text">
        QR Code Reader
      </h1>

      <div className="mb-6 bg-slate-900/90 p-4 rounded-lg shadow-2xl border border-emerald-500/20">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
          constraints={cameraConstraints}
          className="w-full rounded-lg transform transition-all duration-300 ease-in-out hover:scale-102 
        ring-2 ring-emerald-500/30 hover:ring-emerald-500/50"
        />
      </div>

      {error && (
        <p className="text-rose-500 text-lg font-medium bg-rose-500/10 py-2 px-4 rounded-lg">
          Error: {error}
        </p>
      )}
    </div>
  );
};

// Prop validation using PropTypes
QRScanner.propTypes = {
  onQRCodeData: PropTypes.func.isRequired, // onQRCodeData should be a required function
};

export default QRScanner;
