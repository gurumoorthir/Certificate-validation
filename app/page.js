'use client'
import { useState } from "react";
import QRImageReader from "../components/QRImageReader";
import { toast } from "react-toastify";
import CustomModal from "../components/Modal";
import QRScanner from "../components/QRScanner";
import Link from "next/link";
import { QrCode, Upload } from "lucide-react";
const User = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [textInput, setTextInput] = useState(""); // State for the text input
  const [open, setOpen] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [fetchData,setFetchData] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClickForScanner = () => {
    setScannerVisible(true);
    setImageUploadVisible(false);
  };

  const handleButtonClickForImageUpload = () => {
    document.getElementById("file-input").click();
    setImageUploadVisible(true);
    setScannerVisible(false);
  };

  const handleQRCodeData = async (data) => {
    setQrCodeData(data);
    console.log(data);
  
    if (data !== "Wrong Input") {
      try {
        // Use the data directly if it represents the unique_id
        const response = await fetch(`http://localhost:3000/api/fetchQrDetails?unique_id=${data}`, {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error("Failed to validate certificate");
        }
  
        const responseData = await response.json();
        setFetchData(responseData);
        console.log(responseData);
  
        toast.success(`Certificate Validated Successfully`, {
          className: "toast-success-custom",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-progress-bar",
        });
  
        handleOpen();
        if (scannerVisible) {
          setScannerVisible(false);
        }
      } catch (error) {
        console.error("Error validating certificate:", error);
        toast.error("Failed to validate the certificate. Please try again.", {
          className: "toast-error-custom",
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Invalid QR Code", {
        className: "toast-error-custom",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  

  const handleValidate = () => {
    if (textInput.trim() === "") {
      
      // Fetch details
      
      toast.error("Please enter a valid certification id to validate!", {
        className: "toast-error-custom", autoClose: 2000
      });
    } else {
      
      toast.success(`Validated ID: ${textInput}`, {
        className: "toast-success-custom",
        bodyClassName: "custom-toast-body", // Optional if you need body-specific styles
        progressClassName: "custom-progress-bar", // Optional for progress bar styles
        autoClose: 2000
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-custom-background">
      {/* Company Header - Fixed Position */}
      <div className="absolute  top-0 right-0 z-10 p-4 md:p-5 flex items-center gap-3">
        <img
          src="/CTF-Logo.png"
          alt="Company Logo"
          className="w-8 h-8 md:w-12 md:h-9 object-contain"
        />
        <h1 className="text-lg md:text-xl  font-bold text-white hidden sm:block">
          CEG Tech Forum
        </h1>
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col md:flex-row"
        style={{ minHeight: "110vh", background: "cover" }}
      >
        {/* Left Section: Image */}
        <div className="w-full sm:w-3/4 md:w-3/4 h-auto">
          <img
            src="/landing-2.png"
            alt="Landing"
            className="h-auto sm:h-auto md:h-auto object-cover animate"
          />
        </div>

        {/* Right Section: QR Scanner, Image Upload, Text Input, and Buttons */}
        <div className="flex flex-col w-full h-auto md:h-screen justify-center items-center space-y-8 p-4">
          {/* QR Scanner */}
          {scannerVisible && (
            <div className="flex justify-center items-center w-full sm:w-3/4 md:w-1/2 h-auto mb-8">
              <QRScanner onQRCodeData={handleQRCodeData} />
            </div>
          )}

          {/* Image Upload Section */}
          <div className="w-full sm:w-3/4 md:w-1/2 mb-8">
            <QRImageReader onQRCodeData={handleQRCodeData} />
          </div>

          {/* Text Input with Validate Button */}
          <div className="flex flex-wrap items-center w-full sm:w-3/4 md:w-1/2 mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Enter Certification ID"
              className="w-full sm:flex-1 h-12 px-4 rounded-md border-2 bg-slate-950 border-zinc-600 focus:border-emerald-500 focus:outline-none text-slate-100 placeholder-slate-400"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button
              onClick={handleValidate}
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-emerald-600 text-white font-bold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
            >
              Validate
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center w-full space-y-8 sm:space-y-0 sm:space-x-8 mb-12">
            {[
              {
                label: "Scan QR",
                icon: QrCode,
                onClick: handleButtonClickForScanner,
              },
              {
                label: "Upload Image",
                icon: Upload,
                onClick: handleButtonClickForImageUpload,
              },
            ].map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="w-64 sm:w-56 md:w-64 h-20 rounded-3xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                <div className="absolute inset-0 border border-zinc-700/50 rounded-3xl group-hover:border-emerald-500/50 transition-all duration-300" />
                <div className="relative flex items-center justify-center space-x-3">
                  <Icon className="w-6 h-6 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">{label}</span>
                </div>
                <div className="absolute inset-0 -left-full group-hover:left-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 ease-in-out" />
              </button>
            ))}
          </div>

          <div>
            <h1 className="text-2xl font-medium text-slate-200">
              Not an user?
              <Link
                href={"/login"}
                className="ml-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-400/30 hover:decoration-emerald-300 decoration-2 underline-offset-4"
              >
                Click here to login as admin
              </Link>
            </h1>
          </div>
          
          {/* Display Modal only if QR Code data is generated */}
          {((qrCodeData && qrCodeData !== "" && qrCodeData !== "Wrong Input" )||(textInput.length > 0)) && (
            <CustomModal open={open} handleClose={handleClose} fetchData={fetchData}  />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;