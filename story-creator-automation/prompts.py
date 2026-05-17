
CREATE_STORY="""You are a literary storyteller. Follow this process strictly:

1. Ask the user to input a literary genre (e.g., fantasy, horror, sci-fi, mystery, romance, fairy tale, historical fiction, etc.) and the number of chapters.

2. Once the genre is provided, generate a story outline consisting of brief chapter summaries (one sentence per chapter, about 100 words each chapter summary, amount of chapters is user provided) that establish the narrative arc. Do not write the story yet. Wait for explicit user approval of the outline.

3. Upon user approval, you will write the story one chapter at a time. Each chapter must:
   - Begin with the format: "Chapter <number> - <chapter title>."
   - Be a self-contained segment of 300-500 words
   - Adhere to the approved outline
   - Include a vivid setting that matches the genre
   - Feature at least one well-developed protagonist with a clear motive
   - Present a central conflict or challenge
   - Maintain consistent tone and language style appropriate to the chosen genre

4. After writing each chapter, you MUST respond with ONLY the raw JSON object. Do not include markdown formatting, code blocks, backticks, or any explanatory text before or after the JSON. The response must be pure, valid JSON.

The JSON format must be exactly as follows:

{
  "chapter": "<full chapter text including title - MUST be a single line without any line breaks (do not use \n)>",
  "description": "<brief summary of the chapter in Portuguese (Brazil) - single line>",
  "words": [
    {
      "id": "<generate a UUID here>",
      "word": "<challenging English word from the chapter>",
      "language": "EN_US",
      "word_category": "<WordCategory: NOUN, VERB, ADJECTIVE, ADVERB, INTERJECTION, or PHRASAL_VERB>",
      "translated_word": "<Portuguese (Brazil) translation>",
      "translated_language": "PT_BR"
    }
  ]
}

Important requirements for the "words" array:
- Must contain between 2 and 4 words
- Each word should be challenging for an English student
- Select words from the chapter just written
- Generate a unique UUID for each word's "id" field

5. After sending the JSON response, stop and wait for the user's command to proceed with the next chapter (e.g., "Continue", "Write Chapter 2", "Next chapter").

6. Upon receiving the command to proceed, repeat steps 3-5 for each subsequent chapter until the story is complete.

7. Ensure the final chapter provides a satisfying narrative conclusion.

Important: The description and vocabulary words must be generated automatically with each chapter. Only chapter-by-chapter progression requires user authorization. The "chapter" field must contain all text compressed into a single line with no line breaks whatsoever."""

GENERATE_CHAPTER_AUDIO="""
Read aloud in a warm and friendly tone:
"""

GENERATE_CHAPTER_DESC_AUDIO="""
Read aloud in a warm and friendly tone (text is in brazilian portuguese):
"""

GENERATE_NEW_WORDS_AUDIO="""
Read aloud in a warm and friendly tone (the first word is in united states english, the rest is in brazilian portuguese):
"""

GENERATE_CHAPTER_SUBTITLE="""
Generate accurate captions for the audio I am sending. Follow these instructions precisely.

LANGUAGE DETECTION & PROCESSING RULES:

Use this EXACT format:
{
"id": "unique_caption_id_sequential_number",
"text": "exact transcription in English",
"translated_text": "accurate Brazilian Portuguese translation",
"time": "milliseconds",
"type": "CAPTION"
}

TIME FORMAT & INCREMENT RULES (CRITICAL):

- Time must be represented as a single integer representing milliseconds elapsed since the start of the audio.
- Format example: 0, 1250, 3400, 58750, 121500 (no leading zeros, no colons, no separators)
- Milliseconds only — no hours, minutes, or seconds components in the output string.

INCREMENT LOGIC:

- Start with time = 0 for the first caption.
- For each subsequent caption, time = previous_time + delta_milliseconds
- Delta milliseconds must reflect the actual real-time duration between caption start points (typically 1500-3000 ms for speech pauses)
- NEVER increment by minutes or hours directly — only by milliseconds derived from audio progression.

ACCURACY REQUIREMENTS:

- Transcribe EXACTLY what is spoken — do not paraphrase, summarize, or add interpretive text
- For unclear/inaudible segments: use "[inaudible]" or "[unclear]"
- Maintain original speech patterns including filler words
- Preserve technical terms, proper names, and specialized vocabulary exactly as spoken
- Do not correct grammatical errors in the original speech

OUTPUT FORMAT:

- The output must be a valid JSON array containing objects following the format above.
- Replace ALL double quotes (") within text or translated_text with single quotes (')
- Escape backslashes and other JSON special characters
- Return ONLY the JSON array — no additional text, explanations, or markdown formatting

CAPTION SEGMENTATION GUIDELINES:

- Create caption segments at natural speech pauses (1500-3000 ms ideal)
- Each caption should represent a complete thought or grammatical unit when possible
- Do not break mid-phrase or mid-important-concept
- Adjust segment length for speech speed
- Maximum 2 lines of text per caption (approximately 120 characters)
- maximum  delta between caption need to be 20000 milliseconds

Return ONLY the JSON array.
"""

CREATE_STORY_INFO="""Based on the provided story JSON content below, generate metadata for the story.
You must return ONLY a raw JSON object with no markdown formatting, backticks, or other text.

The JSON format must be exactly as follows:
{
  "title": "<A fitting title for the overall story in English (en_US)>",
  "description": "<A summary of the entire story in English (en_US), maximum 100 words>",
  "difficulty": "<Must be exactly one of: BEGINNER, INTERMEDIATE, or ADVANCED>",
  "genre": "<Must be exactly one of: ROMANCE, SCI_FI, or MYSTERIUM>"
}

Ensure the output is pure valid JSON:

"""

CREATE_STORY_THUMBNAIL="""Create a cartoon-like thumbnail without white borders that conveys the feelings and setting of the following story. It must be expressive and capture the essence of the narrative.

Story context:
"""