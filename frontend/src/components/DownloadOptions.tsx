import { useState } from "react";

interface DownloadOptionsProps {
  onDownload: (quality: string, type: string) => void;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ onDownload }) => {
  const [quality, setQuality] = useState("1080p");
  const [type, setType] = useState("video");

  return (
    <div className="mt-6 p-4 border border-gray-600 rounded-lg w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2 text-center">Download Options</h2>

      {/* Quality Selection */}
      <label className="block text-sm font-medium">Select Resolution:</label>
      <select title="Select Resolution"
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
      >
        <option value="1080p">1080p</option>
        <option value="720p">720p</option>
        <option value="480p">480p</option>
      </select>

      {/* Type Selection */}
      <label className="block text-sm font-medium">Download Type:</label>
      <select title="Download Type"
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="video">Video</option>
        <option value="audio">Audio</option>
      </select>

      {/* Download Button */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        onClick={() => onDownload(quality, type)}
      >
        Download
      </button>
    </div>
  );
};

export default DownloadOptions;
