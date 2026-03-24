import json
import os

from text_to_speech_agent_ia import TextToSpeechAgent
from prompts import GENERATE_CHAPTER_AUDIO, GENERATE_CHAPTER_DESC_AUDIO, GENERATE_NEW_WORDS_AUDIO

def generateStoryAudios(): 
    with open('temp/story.json', 'r', encoding='utf-8') as arquivo:
        dados = json.load(arquivo)

    tts = TextToSpeechAgent()

    for index, item in enumerate(dados):
        tts.falar(item["chapter"], estilo=GENERATE_CHAPTER_AUDIO, arquivo=f"temp/chapter-{index}.wav")
        tts.falar(item["description"], estilo=GENERATE_CHAPTER_DESC_AUDIO, arquivo=f"temp/chapter-desc-{index}.wav")
        for word in item["words"]:
            tts.falar(f"{word['word']} traduz para {word['translatedWord']}", estilo=GENERATE_NEW_WORDS_AUDIO, arquivo=f"temp/{word['id']}.wav")

    return None

def convertAudioToMP3(): 
    os.system('cd temp && for input in *.wav; do ffmpeg -i "$input" -codec:a libmp3lame -qscale:a 2 "${input%.wav}.mp3"; done')
    return None

def mergeStoryAudios():
    with open('temp/story.json', 'r', encoding='utf-8') as arquivo:
        dados = json.load(arquivo)

    with open('temp/concat_list.txt', 'w', encoding='utf-8') as f:
        for index in range(len(dados)):
            f.write(f"file 'chapter-{index}.mp3'\n")
            f.write(f"file 'chapter-desc-{index}.mp3'\n")

    os.system("cd temp && ffmpeg -y -f concat -safe 0 -i concat_list.txt -c copy story.mp3")

    return None