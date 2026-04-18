# Story Creator Automation - Agent Context

This module (`story-creator-automation`) is an automated pipeline designed to generate audio stories, their metadata, subtitles, and thumbnails, all powered by Google Generative AI (Gemini).

## Architecture & Pipeline (`main.py`)

The system follows a strict sequential pipeline mediated by `temp` directory artifacts:

1. **Text Generation**: Generates chapters, translation metadata, and vocabulary.
2. **Audio Synthesis**: Converts text and vocabulary into WAV using TTS.
3. **Audio Processing**: Converts WAV to MP3 using `ffmpeg`.
4. **Metadata & CaptionsExtraction**: Uses the audio to prompt the AI for exact time-synced captions.
5. **Merging & Orchestration**: Compiles metadata, generates generic information, create thumbnails, and finally uploads the content.

## AI Agents (`*_ia.py`)

The directory uses specialized AI wrappers around the `google.genai` SDK:

- `Agent` (`agent_ia.py`): A conversational text agent (uses `gemini-3-flash-preview`). Maintains chat history.
- `TextToSpeechAgent` (`text_to_speech_agent_ia.py`): A TTS agent (uses `gemini-2.5-flash-preview-tts`), allowing multiple voice profiles (`kore`, `puck`, `leda`, `zephyr`) and emotional style prompts. Data is saved natively to `.wav`.
- `AudioAgent` (`audio_agent_ia.py`): Uploads audio to Gemini and prompts against it (e.g., to generate captions from spoken audio).

## Prompts & Data Structures (`prompts.py`)

All prompts enforce strict JSON schemas for robustness.

- **Story Schema**: Returns a single compressed line for the text body, a translated summary, and an array of 5-10 challenging vocabulary words in English with PT-BR translations.
- **Captions Schema**: Extracts timestamps (`HH:MM:SS:MMM`) synced to the audio along with PT-BR translations from English audio.

## State Management (`temp/`)

- Intermediary payloads, generated audio (`.wav` and `.mp3`), and JSON files (e.g., `story.json`, `chapter-X-metadata.json`, `chapter-desc-X-metadata.json`) are stored and read from the `temp/` folder throughout the execution cycle.

## Best Practices for this Module

- **Environment**: Requires `GOOGLE_IA_KEY` in `env.py`.
- **Dependencies**: Depends heavily on system-level `ffmpeg` for WAV targeting MP3 conversion (`audio.py`).
- **Development**: When modifying prompts, ensure rigorous instruction to output **only** valid JSON. Do not add markdown blocks. Keep all `temp/` file read/write operations synchronized.
