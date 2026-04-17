# DB arch

## CONSTANTS

GENDER: ROMANCE | SCI_FI | TERROR
CAPTION_TYPE: CAPTION | REVIEW
LANGUAGE: PT_BR | EN_US | ES_ES
WORD_TYPE: VERB | PHRASAL_VERB | SUBSTANTIVE | ADJECTIVE
DIFFICULTY: BEGGINER | INTERMEDIATE | ADVANCED

## STORY CONTENT FORMAT

Captions

CAPTION type

id: uuid,
text: string
translated_text: string
time: 'MM:SS:ML'
type: CAPTION_TYPE

REVIEW type

id: uuid
type: CAPTION_TYPE,
time: 'MM:SS:ML'
description: string
translated_text: string

## TABLES

Story

id: uuid
learning_language: LANGUAGE
native_language: LANGUAGE
title: string
description: string
gender: GENDER
duration: 'HH:MM:SS'
free: boolean
content: string
audio: audio_url
difficulty: DIFFICULTY

DICTIONARY

id: uuid
caption_id: uuid
user_id: uuid
word: string
type: WORD_TYPE
language: LANGUAGE

User

id: uuid
paying: boolean
dictionary: DICTIONARY
