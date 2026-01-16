# Gerar historia, capitulo por capitulo

"Wait for the user to input a literary genre (e.g., fantasy, horror, sci-fi, mystery, romance, fairy tale, historical fiction, etc.). Once the genre is provided, generate an original short story in English in the style of a literary tale.

Structure and Process:

First, present a story outline consisting of 3 to 5 brief chapter summaries (one sentence per chapter) that establish the narrative arc.

Do not write the story yet. Await explicit user approval of the outline.
Upon approval, you will write the story one chapter at a time.
Each chapter must be a self-contained segment of 300–500 words, adhering to the approved outline.
After writing each chapter, stop and follow this three-step sequence:

Step 1: Wait for the user's command to proceed with the next chapter (e.g., "Continue," "Write Chapter 2").

Step 2: After receiving the command to proceed, wait for the user's explicit authorization to generate a Portuguese (Brazil) summary of the chapter just written.

Step 3: After generating the summary, immediately and automatically provide a list titled "Vocabulary Builder (Chapter X)" with 5 words from the chapter in English that might be challenging for an English student, followed by their Portuguese (Brazilian) translation.

After completing steps 2 and 3 for the previous chapter, then proceed to write the next chapter, returning to point 5 of this sequence.

Ensure the complete story includes:

A vivid setting that matches the genre.
At least one well-developed protagonist with a clear motive.
A central conflict or challenge.
A consistent tone and language style appropriate to the chosen genre.
A satisfying narrative conclusion in the final chapter.
Begin by asking for the literary genre."

# Gerar legenda para o audio

Generate captions for the audio I am sending.
The output must be an array in valid JSON format.
Each caption must follow exactly this structure:

{
"id": "unique caption id",
"text": "caption text in English",
"translate": [
{
"text": "caption translated according to the language property below",
"language": "PT_BR"
}
],
"time": "MM:SS:MMM (milliseconds)",
"type": "CAPTION"
}

IMPORTANT JSON RULES

The output must be valid JSON.
Never use double quotes (") inside any string value.
If the spoken text contains quotation marks, replace them with single quotes (').

Example:

❌ "text": ""Good morning," a voice said."
✅ "text": "'Good morning,' a voice said."

Caption Rules

The text field must contain the caption in English, matching the audio.
The translate field must contain the Brazilian Portuguese translation.
The time field must represent the start time of the caption (HH:MM:SS).
Create a new caption at natural pauses or sentence changes.
Do not include explanations, comments, or markdown.
Return only the JSON array.

# gerar audio dos capitulos e resumos

1. vai gerar arquivos .wav, colocar eles em uma pasta e executar o seguinte script:
   for input in \*.wav; do ffmpeg -i "$input" -codec:a libmp3lame -qscale:a 2 "${input%.wav}.mp3"; done
2. para juntar os audio, criar um arquivo e listar os audios, ex:
   file 'cap1.mp3'
   file 'res cap1.mp3'
   file 'cap2.mp3'
   file 'res cap2.mp3'
   file 'cap3.mp3'
   file 'res cap3.mp3'
   file 'cap4.mp3'
   file 'res cap4.mp3'

dps, executar: ffmpeg -f concat -safe 0 -i mylist.txt -c copy output.mp3

3. execute 'ffmpeg -i input.mp3 -b:a 128k output.mp3' para comprimir
