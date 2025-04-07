import { useState } from "react";

interface UrlFormProps {
  onSubmit: (id: string) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState("");

  const extractVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    );
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(url);
    if (videoId) {
      onSubmit(videoId);
    } else {
      alert("Invalid YouTube URL. Please enter a valid link.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="p-2 border border-gray-500 rounded w-80 text-white"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default UrlForm;
