import json
import uuid

from agent_ia import Agent
from audio_agent_ia import AudioAgent
from prompts import CREATE_STORY, GENERATE_CHAPTER_SUBTITLE, CREATE_STORY_INFO
from time_helper import time_to_millis, millis_to_time, get_audio_duration_ms

def createStoryText():
    chapters_number = int(input("Digite a quantidade de capitulos: "))
    genre = input("Digite o genero literario da historia: ")

    chat = Agent()

    chat.prompt(CREATE_STORY)
    overview = chat.prompt(f"{genre}. chapter number: {chapters_number}")
    print(overview)

    approved = int(input("Continuar com geracao da historia? 0/1: "))
    if (approved == 0):
        return None

    story = []
    for i in range(chapters_number):
        res = chat.prompt("approved and continue")
        story.append(json.loads(res))

    with open('temp/story.json', 'w', encoding='utf-8') as arquivo:
        json.dump(story, arquivo, indent=4, ensure_ascii=False)

    return None

def createStoryContentMetadata():
    with open('temp/story.json', 'r', encoding='utf-8') as arquivo:
        dados = json.load(arquivo)
    
    for index, item in enumerate(dados):
        agent = AudioAgent()
        try:
            audio = agent.upload_audio(f"temp/chapter-{index}.mp3")
            response = agent.prompt_com_audio(GENERATE_CHAPTER_SUBTITLE, audio)
            response_json = json.loads(response)

            with open(f'temp/chapter-{index}-metadata.json', 'w', encoding='utf-8') as arquivo:
                json.dump(response_json, arquivo, indent=4, ensure_ascii=False)
        except Exception as e:
            print(f"Erro: {e}")

    for index, item in enumerate(dados):
        description_data = {
            "id": str(uuid.uuid4()),
            "type": "REVIEW",
            "time": "00:00:000",
            "description": "",
            "translate": [
                {
                    "text": item["description"],
                    "language": "PT_BR"
                }
            ],
            "newWords": item["words"]
        }

        with open(f'temp/chapter-desc-{index}-metadata.json', 'w', encoding='utf-8') as arquivo:
            json.dump(description_data, arquivo, indent=4, ensure_ascii=False)

    return None

def createStoryInfo():
    with open('temp/story.json', 'r', encoding='utf-8') as f:
        story_content = f.read()

    chat = Agent()
    response = chat.prompt(CREATE_STORY_INFO + story_content)

    # Clean the response to ensure it's valid JSON
    response_clean = response.strip()
    if response_clean.startswith("```json"):
        response_clean = response_clean[7:]
    elif response_clean.startswith("```"):
        response_clean = response_clean[3:]
    if response_clean.endswith("```"):
        response_clean = response_clean[:-3]
    response_clean = response_clean.strip()

    info_json = json.loads(response_clean)

    with open('temp/story-info.json', 'w', encoding='utf-8') as f:
        json.dump(info_json, f, indent=4, ensure_ascii=False)

    return None

def mergeStoryContentMetadata():
    with open('temp/story.json', 'r', encoding='utf-8') as arquivo:
        dados = json.load(arquivo)
        
    metadata = []
    current_duration_ms = 0
    
    for index in range(len(dados)):
        # READ chapter-{index}-metadata.json
        with open(f'temp/chapter-{index}-metadata.json', 'r', encoding='utf-8') as f:
            chapter_metadata = json.load(f)
            
        for item in chapter_metadata:
            if current_duration_ms > 0:
                original_ms = time_to_millis(item['time'])
                item['time'] = millis_to_time(original_ms + current_duration_ms)
            metadata.append(item)
            
        # Add chapter duration
        ch_duration = get_audio_duration_ms(f'temp/chapter-{index}.mp3')
        current_duration_ms += ch_duration
        
        # READ chapter-desc-{index}-metadata.json
        with open(f'temp/chapter-desc-{index}-metadata.json', 'r', encoding='utf-8') as f:
            chapter_desc_metadata = json.load(f)
            
        # Set time to current_duration_ms
        chapter_desc_metadata['time'] = millis_to_time(current_duration_ms)
        metadata.append(chapter_desc_metadata)
        
        # Add desc duration to current_duration
        desc_duration = get_audio_duration_ms(f'temp/chapter-desc-{index}.mp3')
        current_duration_ms += desc_duration

    # write metadata to temp/metadata.json
    with open('temp/metadata.json', 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=4, ensure_ascii=False)

    return None