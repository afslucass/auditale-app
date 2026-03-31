from audio import convertAudioToMP3, generateStoryAudios, mergeStoryAudios
from image import createStoryThumbnail
from text import createStoryText, createStoryContentMetadata, createStoryInfo, mergeStoryContentMetadata
from uploads import uploadImage, createWords, createStory

def setup():
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