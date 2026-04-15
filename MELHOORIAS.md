1. mudar CAPTIONS no metadata para: 
```json
{
    "id": "3",
    "text": "Clara's sanctuary and coastal antique bookstore.",
    "translated_text": "o santuário de Clara e livraria de antiguidades costeira.",
    "time": "00:07:954",
    "type": "CAPTION"
}
```

2. adicionar learning_language e native_language na Story

3. mudar REVIEW no metadata para:
```json
{
    "text": "",
    "translated_text": "o santuário de Clara e livraria de antiguidades costeira.",
    "type": "REVIEW"
    ...
}
```

4. remover newWords do objeto REVIEW

No DB, usar snake case:
5. alterar nome tabela: stories
6. alterar nome tabela: learned_words

7. remover prop thumbnail da tabela stories
8. refatorar gender para genre
9. adicionar e implementar enum no DB para genre
10. adicionar e implementar enum no DB para difficulty
10. adicionar e implementar enum no DB para language
11. mudar formato de tompo das legendas para HS:MM:SS:MS

12. em story audios storage, adicionar pastar ex: US_EN-PT_BR, (aprendendo-nativa) e organizar as histories dentro delas

12. refatorar BEGINER para BEGGINER


