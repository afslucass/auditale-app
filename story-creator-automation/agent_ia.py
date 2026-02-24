from google import genai
from google.genai import types

from env import GOOGLE_IA_KEY

client = genai.Client(
    api_key=GOOGLE_IA_KEY
)

class Agent:
    def __init__(self, modelo="gemini-3-flash-preview"):
        self.client = client
        self.modelo = modelo
        self.historico = []

    def prompt(self, mensagem_usuario):
        """
        Envia uma mensagem, incluindo o histórico, e atualiza o histórico com a resposta.
        """
        conteudos_para_enviar = self.historico.copy()
        conteudos_para_enviar.append(
            types.Content(
                    role="user",
                    parts=[types.Part.from_text(text=mensagem_usuario)]
            )
        )
        
        try:
            response = self.client.models.generate_content(
                model=self.modelo,
                contents=conteudos_para_enviar
            )

            if response and hasattr(response, 'text'):
                texto_resposta = response.text

                self.historico.append(
                    types.Content(
                        role="user",
                        parts=[types.Part.from_text(text=mensagem_usuario)]
                    )
                )
                self.historico.append(
                    types.Content(
                        role="model",
                        parts=[types.Part.from_text(text=texto_resposta)]
                    )
                )
                return texto_resposta
            else:
                return "Erro: Resposta vazia ou inválida."
        except Exception as e:
            return f"Erro na chamada da API: {e}"

    def clear_history(self):
        """Limpa o histórico da conversa."""
        self.historico = []

    def get_history(self):
        """Retorna o histórico atual."""
        return self.historico

# chat = Agent()
# resposta1 = chat.prompt("Oi, meu nome é João.")
# print(f"IA: {resposta1}")

