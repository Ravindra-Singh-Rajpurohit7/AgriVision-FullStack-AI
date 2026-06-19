import { useState } from "react";
import React from "react";
import axios from "axios";

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
const onSelectFile = (e) => {
  if (!e.target.files || e.target.files.length === 0) {
    clearData();
    return;
  }

  const file = e.target.files[0];

  setSelectedFile(file);
  setImage(true);
  setData(null);

  const objectUrl = URL.createObjectURL(file);
  setPreview(objectUrl);
};

  const processImage = async () => {
    if (!selectedFile) return;
    
    setIsloading(true);
    setData(null);

    let formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Direct local fallback string to prevent environment variable crash
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000/predict";
      
      const res = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("API Error: ", error);
      alert("Backend se connect karne mein error aayi! Console check karein.");
    } finally {
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setIsloading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* 🌐 Header Section */}
      <nav className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
              🌱
            </div>
            <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              AgriVision <span className="text-emerald-400 text-xs font-mono font-medium tracking-normal border border-emerald-500/30 px-1.5 py-0.5 rounded-md ml-1 bg-emerald-500/10">v1.0</span>
            </span>
          </div>
          <div className="text-sm font-mono text-slate-500">Potato Disease Analyzer</div>
        </div>
      </nav>

      {/* 🚀 Main Layout */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-b from-slate-50 to-slate-300 bg-clip-text text-transparent sm:text-4xl">
            Scan Leaves. Detect Diseases.
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Upload a high-resolution image of a potato plant leaf to instantly run computer vision diagnostics.
          </p>
        </div>

        {/* 🎛️ Interactive Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Viewport Dashboard */}
          <div className="md:col-span-7 bg-slate-900/40 border border-slate-900 rounded-3xl p-4 shadow-2xl backdrop-blur-sm min-h-[400px] flex flex-col justify-center">
            {!image ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-12 transition-all duration-300 cursor-pointer group bg-slate-950/40 min-h-[360px]">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300 text-2xl">
                  📷
                </div>
                <span className="mt-4 font-medium text-sm text-slate-300">Drop leaf image here</span>
                <span className="mt-1 text-xs text-slate-500">Click to browse local directory</span>
                <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden shadow-inner border border-slate-800 bg-slate-950 flex items-center justify-center min-h-[360px]">
                {preview && (
                  <img src={preview} alt="Leaf Preview" className="w-full h-auto max-h-[450px] object-contain block" />
                )}
                {isLoading && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                    <div className="h-10 w-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p className="text-sm font-mono text-emerald-400 tracking-wider animate-pulse">ANALYZING MATRIX...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Block: Diagnostics Panel */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-3xl p-6 shadow-xl">
              <h3 className="font-semibold text-slate-200 tracking-wide mb-4 flex items-center space-x-2">
                <span>📊</span> <span>Diagnostic Metrics</span>
              </h3>
              
              {!data && !isLoading && (
                <div className="text-center py-12 border border-dashed border-slate-900 rounded-2xl">
                  <p className="text-sm text-slate-500">Awaiting payload input.</p>
                </div>
              )}

              {isLoading && (
                <div className="space-y-4 py-4">
                  <div className="h-4 bg-slate-900 rounded-full animate-pulse w-3/4"></div>
                  <div className="h-12 bg-slate-900 rounded-2xl animate-pulse"></div>
                </div>
              )}

              {data && !isLoading && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-1">Detected Pathology</span>
                    <span className={`text-2xl font-bold tracking-tight ${data.class === 'Healthy' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {data.class}
                    </span>
                  </div>

                  <div className="border-t border-slate-900 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Confidence Score</span>
                      <span className="text-sm font-mono font-semibold text-emerald-400">
                        {(parseFloat(data.confidence) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${parseFloat(data.confidence) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Manual Analyze & Clear Action Triggers */}
            {image && (
              <div className="space-y-3">
                {!data && !isLoading && (
                  <button
                    onClick={processImage}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-5 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/10"
                  >
                    <span>⚡</span>
                    <span>Run AI Diagnostic</span>
                  </button>
                )}
                
                <button
                  onClick={clearData}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 font-medium py-3.5 px-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>🔄</span>
                  <span>Reset Viewport</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};