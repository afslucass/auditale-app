from google import genai
from google.genai import types
import wave

from env import GOOGLE_IA_KEY

client = genai.Client(
    api_key=GOOGLE_IA_KEY
)

class TextToSpeechAgent:
    """
    Agente simples para conversão de texto em fala
    """
    
    VOZES = {
        "kore": "Kore",      # Profissional
        "puck": "Puck",      # Energético
        "leda": "Leda",      # Jovem
        "zephyr": "Zephyr",  # Claro
    }
    
    def __init__(self, modelo="gemini-2.5-flash-preview-tts", voz_padrao="puck"):
        """
        Inicializa o agente TTS
        
        Args:
            modelo: Modelo TTS a ser usado
            voz_padrao: Voz padrão para síntese
        """
        self.client = client
        self.modelo = modelo
        self.voz_padrao = self._normalizar_voz(voz_padrao)
    
    def _normalizar_voz(self, voz):
        """Normaliza o nome da voz"""
        voz = voz.lower()
        return self.VOZES.get(voz, "Kore")
    
    def _salvar_wav(self, dados_pcm, caminho_arquivo):
        """Salva dados PCM em arquivo WAV"""
        with wave.open(caminho_arquivo, "wb") as wf:
            wf.setnchannels(1)  # Mono
            wf.setsampwidth(2)   # 16-bit
            wf.setframerate(24000)  # 24kHz
            wf.writeframes(dados_pcm)
    
    def falar(self, texto, voz=None, estilo=None, arquivo=None):
        """
        Converte texto em fala
        
        Args:
            texto: Texto a ser convertido
            voz: Nome da voz (kore, puck, leda, zephyr)
            estilo: Instrução de estilo (ex: "alegre", "triste", "animado")
            arquivo: Nome do arquivo para salvar (opcional)
        
        Returns:
            bytes: Dados de áudio ou None em erro
        """
        voz_selecionada = self._normalizar_voz(voz) if voz else self.voz_padrao
        
        # Adicionar estilo se fornecido
        if estilo:
            texto = f"Say {estilo}: {texto}"
        
        try:
            response = self.client.models.generate_content(
                model=self.modelo,
                contents=texto,
                config=types.GenerateContentConfig(
                    response_modalities=["AUDIO"],
                    speech_config=types.SpeechConfig(
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                voice_name=voz_selecionada,
                            )
                        )
                    ),
                )
            )
            
            if response and response.candidates:
                dados_audio = response.candidates[0].content.parts[0].inline_data.data
                
                # Salvar arquivo se especificado
                if arquivo:
                    self._salvar_wav(dados_audio, arquivo)
                    print(f"Áudio salvo em: {arquivo}")
                
                return dados_audio
            else:
                print("Erro: Resposta vazia")
                return None
                
        except Exception as e:
            print(f"Erro: {e}")
            return None
    
    def listar_vozes(self):
        """Retorna vozes disponíveis"""
        return self.VOZES

# Exemplo de uso
if __name__ == "__main__":
    # Criar agente
    tts = TextToSpeechAgent()
    
    # Listar vozes
    print("Vozes disponíveis:", tts.listar_vozes())
    
    # Exemplos de uso
    tts.falar("Olá mundo!", arquivo="ola.wav")
    tts.falar("Que dia feliz!", voz="puck", estilo="alegre", arquivo="feliz.wav")
    tts.falar("Isto é um teste", voz="leda", arquivo="teste.wav")
    
    print("Áudios gerados com sucesso!")
