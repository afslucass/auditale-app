from audio import convertAudioToMP3, generateStoryAudios, mergeStoryAudios
from image import createStoryThumbnail
from text import createStoryText, createStoryContentMetadata, createStoryInfo, mergeStoryContentMetadata
from uploads import uploadImage, createWords, createStory
import os
import shutil

def cleanTemp():
    temp_dir = "temp"
    if os.path.exists(temp_dir):
        for filename in os.listdir(temp_dir):
            file_path = os.path.join(temp_dir, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")

def setup():
    cleanTemp()
    
    createStoryText()

    generateStoryAudios()
    convertAudioToMP3()

    createStoryContentMetadata()

    mergeStoryContentMetadata()
    mergeStoryAudios()

    createStoryInfo()
    createStoryThumbnail()

    story_id = createStory()
    if story_id:
        uploadImage(story_id)
        createWords(story_id)
    
    return None

setup()