import { useState } from "react";
import UrlForm from "./components/UrlForm";
import VideoPreview from "./components/VideoPreview";
import DownloadOptions from "./components/DownloadOptions";

const App: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleFormSubmit = (id: string) => {
    setVideoId(id);
  };

  const handleDownload = (quality: string, type: string) => {
    if (!videoId) return;

    console.log(`Downloading ${type} in ${quality} for video ID: ${videoId}`);

    fetch(`http://localhost:8000/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, quality, type }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Download started:", data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Form Section (Always Centered) */}
      <div className="w-full max-w-md">
        <UrlForm onSubmit={handleFormSubmit} />
        
      </div>

      {/* Video Preview (Appears Only When Video is Submitted) */}
      {videoId && (
        <div className="mt-8 w-full max-w-3xl flex flex-wrap justify-evenly">
          <VideoPreview videoId={videoId} />
          <div className="mt-6">
          <DownloadOptions onDownload={handleDownload} />
        </div>
        </div> 
        
      )}
    </div>
  );
};

export default App;
