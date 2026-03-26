
import uuid
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
    # upload word audio
    # create word data in table
    return None

def createStory():
    # upload story audio
    # create story data in table
    return None