from google import genai
from env import GOOGLE_IA_KEY

client = genai.Client(api_key=GOOGLE_IA_KEY)

class ImageAgent:
    def __init__(self, modelo="imagen-4.0-generate-001"):
        self.client = client
        self.modelo = modelo

    def generate_image(self, prompt_text, output_path="temp/story-thumbnail.jpg"):
        """Generates an image and saves it to the given path"""
        for attempt in range(5):
            try:
                result = self.client.models.generate_images(
                    model=self.modelo,
                    prompt=prompt_text,
                    config=dict(
                        number_of_images=1,
                        output_mime_type="image/jpeg",
                        aspect_ratio="1:1"
                    )
                )
                if result.generated_images:
                    image_bytes = result.generated_images[0].image.image_bytes
                    with open(output_path, 'wb') as f:
                        f.write(image_bytes)
                    return True
                raise Exception(f"generated_images nao existe")
            except Exception as e:
                print(f"Erro na geração de imagem: {e}")
        else:
            print("Erro persistente após 5 tentativas. Saindo.")
            quit()
