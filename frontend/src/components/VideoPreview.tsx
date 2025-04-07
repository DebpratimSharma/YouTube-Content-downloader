import { useState, useEffect } from "react";
import { fetchVideoDetails } from "../utils/youtube";

interface VideoPreviewProps {
  videoId: string;
}

interface VideoDetails {
  title: string;
  thumbnail: string;
  duration: string;
}

const formatDuration = (isoDuration: string): string => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "Unknown Duration";

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  return [
    hours > 0 ? hours.toString().padStart(2, "0") : null,
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":");
};

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoId }) => {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideoDetails = async () => {
      setLoading(true);
      setError(null);

      const details = await fetchVideoDetails(videoId);

      if (!details) {
        setError("Failed to load video details");
      } else {
        setVideoDetails({
          ...details,
          duration: formatDuration(details.duration),
        });
      }

      setLoading(false);
    };

    loadVideoDetails();
  }, [videoId]);

  if (loading) return <p className="text-gray-400">Loading video details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-6 flex border rounded-lg p-3 border-gray-600 flex-col items-center text-center">
      <h2 className="text-lg font-semibold mb-2">{videoDetails?.title}</h2>
      <img
        src={videoDetails?.thumbnail}
        alt="Video Thumbnail"
        className="rounded-lg shadow-lg mb-2"
        width={270}
        height={150}
      />
      <p className="text-gray-300">Duration: {videoDetails?.duration}</p>
    </div>
  );
};

export default VideoPreview;
