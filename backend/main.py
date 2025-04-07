from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import os

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DOWNLOADS_FOLDER = "downloads"

# Ensure the downloads directory exists
os.makedirs(DOWNLOADS_FOLDER, exist_ok=True)

@app.post("/download")
async def download_video(data: dict):
    video_id = data.get("videoId")
    quality = data.get("quality")
    media_type = data.get("type")  # 'video' or 'audio'

    if not video_id or not quality or not media_type:
        raise HTTPException(status_code=400, detail="Missing required parameters")

    url = f"https://www.youtube.com/watch?v={video_id}"

    ydl_opts = {
        "outtmpl": os.path.join(DOWNLOADS_FOLDER, "%(title)s.%(ext)s"),
        "format": "bestaudio" if media_type == "audio" else f"bestvideo[height={quality}]+bestaudio/best",
        "merge_output_format": "mp4" if media_type == "video" else "mp3",
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)

        return {"message": "Download successful", "filename": filename}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading video: {str(e)}")
