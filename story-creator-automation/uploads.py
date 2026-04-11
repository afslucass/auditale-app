
import uuid
import json
import time_helper
from supabase_infra import supabase

def uploadImage(story_id):
    file_path = "temp/story-thumbnail.jpg"
    file_name = f"{story_id}.jpg"
    
    supabase.storage.from_("story thumbnails").upload(
        path=file_name,
        file=file_path,
        file_options={"content-type": "image/jpeg"}
    )
    
    return file_name

def createWords(story_id):
    with open("temp/metadata.json", "r", encoding="utf-8") as f:
        metadata = json.load(f)

    learned_words_payload = []
    story_learned_words_payload = []

    for item in metadata:
        if item.get("type") == "REVIEW":
            chapter_review_id = item.get("id")
            for word_obj in item.get("newWords", []):
                learned_words_payload.append({
                    "id": word_obj["id"],
                    "word": word_obj["word"],
                    "language": word_obj["language"],
                    "word_category": word_obj["wordCategory"],
                    "translated_word": word_obj["translatedWord"],
                    "translated_language": word_obj["translatedLanguage"]
                })
                story_learned_words_payload.append({
                    "story_id": story_id,
                    "learned_word_id": word_obj["id"],
                    "chapter_review_id": chapter_review_id
                })

    if learned_words_payload:
        supabase.table("learnedwords").insert(learned_words_payload).execute()

    if story_learned_words_payload:
        supabase.table("story_learned_words").insert(story_learned_words_payload).execute()

    for payload in learned_words_payload:
        word_id = payload["id"]
        audio_file_path = f"temp/{word_id}.mp3"
        try:
            supabase.storage.from_("learned words audios").upload(
                path=f"{word_id}.mp3",
                file=audio_file_path,
                file_options={"content-type": "audio/mpeg"}
            )
        except Exception as e:
            print(f"Error uploading audio for word {word_id}: {e}")
            
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
        id = response.data[0]["id"]

        audio_file_path = f"temp/story.mp3"
        try:
            supabase.storage.from_("story audios").upload(
                path=f"{id}.mp3",
                file=audio_file_path,
                file_options={"content-type": "audio/mpeg"}
            )
        except Exception as e:
            print(f"Error uploading audio for story: {e}")

        return id
    return None