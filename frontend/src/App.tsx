import { useState } from "react";
import UrlForm from "./components/UrlForm";
import VideoPreview from "./components/VideoPreview";

const App: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleFormSubmit = (id: string) => {
    setVideoId(id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      {/* If no video is submitted, center only the form */}
      {!videoId ? (
        <div className="w-full max-w-md">
          <UrlForm onSubmit={handleFormSubmit} />
        </div>
      ) : (
        // Show form & video preview side by side when a video is submitted
        <div className="max-w-4xl w-full flex justify-center items-center flex-col md:flex-row gap-8">
          {/* Left Section - Form */}
          <div className="md:w-1/2">
            <UrlForm onSubmit={handleFormSubmit} />
          </div>

          {/* Right Section - Video Preview (only appears after submission) */}
          {videoId && (
            <div className="md:w-1/2">
              <VideoPreview videoId={videoId} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
