import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Replace with your API key
const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";

export const fetchVideoDetails = async (videoId: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        part: "snippet,contentDetails",
        id: videoId,
        key: API_KEY,
      },
    });

    console.log("YouTube API Response:", response.data); // DEBUG LOG

    if (response.data.items.length === 0) {
      throw new Error("Video not found");
    }

    const video = response.data.items[0];

    return {
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      duration: video.contentDetails.duration, // Check this in console
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
};
