from audio import convertAudioToMP3, generateStoryAudios, mergeStoryAudios
from image import createStoryThumbnail
from text import createStoryText, createStoryContentMetadata, createStoryInfo, mergeStoryContentMetadata
from uploads import uploadImage, createWords, createStory

def setup():
    createStoryText()

    generateStoryAudios()
    convertAudioToMP3()

    createStoryContentMetadata()
    createStoryInfo()

    mergeStoryContentMetadata()
    mergeStoryAudios()

    createStoryThumbnail()

    uploadImage()
    createWords()
    createStory()
    
    return None

setup()