feat: Adicionar palavras aprendidas

- Precisamos de um audio de introducao para a secao de palavras novas
- Precisamos dos audios das palavras e suas traducoes (x traduz para y)
- estrutura de dados:

```json
{
  "id": "uuid", // id q sera o nome do audio da traducao
  "word": "Brazier",
  "language": "EN_US",
  "wordCategory": WordCategory,
  "translatedWord": "Braseiro",
  "translatedLanguage": "PT_BR"
}
```

```ts
export enum WordCategory {
  NOUN = "NOUN",
  VERB = "VERB",
  ADJECTIVE = "ADJECTIVE",
  ADVERB = "ADVERB",
  INTERJECTION = "INTERJECTION",
  PHRASAL_VERB = "PHRASAL_VERB",
}
```

OBS: Feature so possivel para usuarios logados

- Apos o app terminar algum resumo, o app deve pausar o audio principal
- O app deve tocar o audio de introducao da secao de palavras aprendidas e apos deve tocar todos os audios de palavras aprendidas
- Se o usuario mexer no playback, o app deve interromper os audios das palavras.
- Apos terminar os audios das palavras, o app deve continuar de onde parou na historia

salvar os dados de palavras novas

- apos terminar de ler os audios, o app deve verificar se as novas palavras n estao presentes na lista de palavras q o usuario ja aprendeu

# Criar uma tabela, LearnedWords:

com a estrutura do json acima

- no json das storias, vai ter so o id para linkar com a tabela das palavras
- o app vai ter q buscar na tabela pelas palaras atravez do id
- para as palavras q sao novas, o app deve adicionar

adicionar relacoes entre a tabela Words e Profiles e Stories

# Fazer ja com a melhoria, vamos ter 2 tables de relacao N:N

LearnedWords : Profiles

LearnedWords : Stories (adicionando uma prop, qual capitulo eh aquela palavra)
