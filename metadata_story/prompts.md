# Gerar historia, capitulo por capitulo

"Wait for the user to input a literary genre (e.g., fantasy, horror, sci-fi, mystery, romance, fairy tale, historical fiction, etc.). Once the genre is provided, generate an original short story in English in the style of a literary tale.

Structure and Process:

First, present a story outline consisting of 7 to 10 brief chapter summaries (one sentence per chapter) that establish the narrative arc.

Do not write the story yet. Await explicit user approval of the outline.
Upon approval, you will write the story one chapter at a time.
Each chapter must be a self-contained segment of 300–500 words, adhering to the approved outline.
After writing each chapter, stop and follow this three-step sequence:

Step 1: Wait for the user's command to proceed with the next chapter (e.g., "Continue," "Write Chapter 2").

Step 2: After receiving the command to proceed, wait for the user's explicit authorization to generate a brief Portuguese (Brazil) summary (less than 500 words) of the chapter just written.

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

Generate accurate captions for the audio I am sending. Follow these instructions precisely:
LANGUAGE DETECTION & PROCESSING RULES:

PORTUGUESE SEGMENTS: When you detect a segment that:

Is spoken in Brazilian Portuguese
Begins with the word "Resumo" or similar clear indicator
Treat the ENTIRE segment from that point until speech returns to English as Portuguese content
ENGLISH SEGMENTS: All other audio should be transcribed in English

SPECIAL FORMAT FOR PORTUGUESE "RESUMO" SEGMENTS:
When processing Portuguese segments beginning with "Resumo", use this EXACT format:
{
"id": "unique_caption_id_sequential_number",
"type": "REVIEW",
"time": "MM (minutes):SS (seconds):MMM (milliseconds)",
"newWords": [],
"translate": [
{
"text": "Full Brazilian Portuguese transcription of the segment",
"language": "PT_BR"
}
],
"description": ""
}

STANDARD FORMAT FOR ENGLISH SEGMENTS:

For all other audio, use this EXACT format:
{
"id": "unique_caption_id_sequential_number",
"text": "exact transcription in English",
"translate": [
{
"text": "accurate Brazilian Portuguese translation",
"language": "PT_BR"
}
],
"time": "MM (minutes):SS (seconds):MMM (milliseconds)",
"type": "CAPTION"
}

ACCURACY REQUIREMENTS:

Transcribe EXACTLY what is spoken - do not paraphrase, summarize, or add interpretive text
For Portuguese segments: transcribe the complete Portuguese speech in the translate[0].text field
For unclear/inaudible segments in either language: use "[inaudible]" or "[unclear]"
Maintain original speech patterns including filler words
Preserve technical terms, proper names, and specialized vocabulary exactly as spoken
Do not correct grammatical errors in the original speech

LANGUAGE TRANSITION HANDLING:

When language switches from English to Portuguese: create a new caption with type: "REVIEW"
When language switches back from Portuguese to English: resume standard type: "CAPTION" format
Capture the EXACT moment of language transition in timing

OUTPUT FORMAT:
The output must be a valid JSON array containing mixed objects following the appropriate format based on language.

CRITICAL FORMATTING RULES:

The JSON must be syntactically valid
Replace ALL double quotes (") within text with single quotes (')
Escape backslashes and other JSON special characters
Time format must be exactly: two-digit minutes, two-digit seconds, three-digit milliseconds

CAPTION SEGMENTATION GUIDELINES:

Create caption segments at natural speech pauses (1.5-3 seconds ideal)
Each caption should represent a complete thought or grammatical unit when possible
Do not break mid-phrase or mid-important-concept
Adjust segment length for speech speed
Maximum 2 lines of text per caption (approximately 120 characters)

VALIDATION CHECK:
Before finalizing, ensure:

Language detection is accurate (listen for "Resumo" and Portuguese speech patterns)
Portuguese segments use type: "REVIEW" format with empty newWords and description
English segments use standard type: "CAPTION" format
Timing aligns with speech patterns and language transitions
No captions contain fabricated or assumed content

Return ONLY the JSON array with no additional text, explanations, or markdown formatting.

# gerar imagem com base na descricao da historia

Vou passar resumos de contos, gere thumbnais para esses contos no estilo cartoon, nao coloque palavras, letras ou numeros: <descricao>

# gerar audio dos capitulos e resumos

1. vai gerar arquivos .wav, colocar eles em uma pasta e executar o seguinte script:
   for input in \*.wav; do ffmpeg -i "$input" -codec:a libmp3lame -qscale:a 2 "${input%.wav}.mp3"; done
   (remove '\')
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

3. execute 'ffmpeg -i output.mp3 -b:a 128k output_comp.mp3' para comprimir

# gerar audio das palavras aprendidas:

1. ir em https://aistudio.google.com/generate-speech?model=gemini-2.5-pro-preview-tts
2. selecionar single spealer audio e voice: puck
3. colocar em STYLE STRUCTIONS: Read aloud in a warm and friendly tone (the first word is in english, the others is in brazilian portuguese)
4. colocar o texto no formato: {ingles} traduz para {portugues}
5. baixar e converter .wav para .mp3
