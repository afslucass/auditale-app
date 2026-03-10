import json
import uuid

from agent_ia import Agent
from audio_agent_ia import AudioAgent
from prompts import CREATE_STORY, GENERATE_CHAPTER_SUBTITLE

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
    # create story name, description, etc
    return None

def mergeStoryContentMetadata():
    # merge content of files above, and update time of each subtitle and chapter description section
    return None