from google import genai
from env import GOOGLE_IA_KEY

client = genai.Client(
    api_key=GOOGLE_IA_KEY
)

def runPrompt(contents):
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=contents,
    )
    return response.text

