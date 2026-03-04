from audio import generateChapterDescriptionAudios, generateStoryAudios, generateWordsAudios, mergeStoryAudios
from image import createStoryThumbnail
from text import createStoryText, createStoryContentMetadata, createStoryInfo, mergeStoryContentMetadata
from uploads import uploadImage, createWords, createStory

def setup():
    createStoryText()

    generateStoryAudios()
    generateChapterDescriptionAudios()
    generateWordsAudios()

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