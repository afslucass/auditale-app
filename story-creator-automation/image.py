import json
from image_agent_ia import ImageAgent
from prompts import CREATE_STORY_THUMBNAIL

def createStoryThumbnail():
    with open('temp/story.json', 'r', encoding='utf-8') as f:
        story_content = f.read()

    agent = ImageAgent()
    prompt = f"{CREATE_STORY_THUMBNAIL}\n{story_content}"
    
    # 1024x1024 is the default for imagen-3 in our agent configuration
    agent.generate_image(prompt_text=prompt, output_path="temp/story-thumbnail.jpg")

    return None