
import uuid
import json
import time_helper
from supabase_infra import supabase

def uploadImage():
    file_path = "temp/story-thumbnail.jpg"
    file_name = f"{uuid.uuid4()}.jpg"
    
    supabase.storage.from_("story thumbnails").upload(
        path=file_name,
        file=file_path,
        file_options={"content-type": "image/jpeg"}
    )
    
    return file_name

def createWords():
    
    return None

def createStory():
    with open("temp/story-info.json", "r", encoding="utf-8") as f:
        story_info = json.load(f)
        
    with open("temp/metadata.json", "r", encoding="utf-8") as f:
        metadata = json.load(f)
        
    duration_ms = time_helper.get_audio_duration_ms("temp/story.mp3")
    duration_str = time_helper.millis_to_time(duration_ms)
    
    payload = {
        "language": "EN_US",
        "title": story_info.get("title"),
        "description": story_info.get("description"),
        "gender": story_info.get("genre"),
        "duration": duration_str,
        "free": True,
        "thumbnail": None,
        "content": metadata,
        "difficulty": story_info.get("difficulty")
    }
    
    response = supabase.table("Story").insert(payload).execute()
    
    if hasattr(response, 'data') and len(response.data) > 0:
        return response.data[0]["id"]
    return None