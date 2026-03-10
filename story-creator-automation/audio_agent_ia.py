from google import genai
from google.genai import types
import time
from pathlib import Path

from env import GOOGLE_IA_KEY

client = genai.Client(api_key=GOOGLE_IA_KEY)

class AudioAgent:
    def __init__(self, modelo="gemini-3.1-flash-lite-preview"):
        self.client = client
        self.modelo = modelo
        self.historico = []

    def upload_audio(self, caminho_arquivo):
        """Upload simples de arquivo de áudio."""
        arquivo = Path(caminho_arquivo)
        if not arquivo.exists():
            raise FileNotFoundError(f"Arquivo não encontrado: {caminho_arquivo}")
        
        arquivo_enviado = self.client.files.upload(file=arquivo)
        
        # Aguarda processamento
        while arquivo_enviado.state.name == "PROCESSING":
            time.sleep(2)
            arquivo_enviado = self.client.files.get(name=arquivo_enviado.name)
        
        return arquivo_enviado

    def prompt_com_audio(self, mensagem_usuario, arquivo_audio):
        """Envia mensagem com arquivo de áudio."""
        response = self.client.models.generate_content(
            model=self.modelo,
            contents=[
                types.Part.from_uri(file_uri=arquivo_audio.uri, mime_type=arquivo_audio.mime_type),
                types.Part.from_text(text=mensagem_usuario)
            ]
        )
        
        return response.text if response and hasattr(response, 'text') else "Erro na resposta"

# Exemplo de uso
if __name__ == "__main__":
    agent = AudioAgent()
    
    try:
        # Upload do áudio
        audio = agent.upload_audio("caminho/para/seu/arquivo.mp3")
        
        # Qualquer pergunta sobre o áudio
        resposta = agent.prompt_com_audio("O que tem neste áudio?", audio)
        print(resposta)
        
    except Exception as e:
        print(f"Erro: {e}")