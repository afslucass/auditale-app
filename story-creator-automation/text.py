import json

from agent_ia import Agent
from prompts import CREATE_STORY

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
    # create subtitles for each chapter and chapter description audio, separately
    # pay atention to timeline of each legend
    # stories it in files
    return None

def createStoryInfo():
    # create story name, description, etc
    return None

def mergeStoryContentMetadata():
    # merge content of files above
    return None