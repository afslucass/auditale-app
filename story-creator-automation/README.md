# Requisitos

- O bot ira gerar uma historia de cada vez, cabendo ao usuario escolher o genero e aprovando a historia.
- Se o usuario aprovar, o bot precisa criar a historia, e armazenar todo o conteudo em arquivos, ao final, o bot deve fazer o upload de tudo no supa base.
- O bot deve quardar metadados das operacoes.
- Se der algum erro, ao reiniciar o bot, ele deve perguntar ao usuario se eh para continuar de onde ele parou, ou gerar outra historia

# Partes de uma historia

- Texto da historia em ingles, contendo os titulos em capitulos
- Descricao da historia em portugues
- Palavras novas aprendidas no formato da tabela do supabase
- JSON das legendas
- Imagem da capa
- Dados da historia:
  - Nome
  - Duracao
  - Genero
  - Dificudade
  - Resumo
- Audio da historia
- Audio das palavras novas aprendidas

# Vamos ter q integrar com

1. Google IA studio
   - Gerar texto
   - Gerar audio atravez do texto
   - Gerar legendas atravez do audio
   - Gerar imagens
