para a historia, usar voz do mp3

vamos ter um audio so para a historia completa

vamos precisar de audios de ia para cada palavra nova.

vamos precisar dce audios de ia para cada descricao de review.

quando o usuario iniciar uma track, o app vai chamar a funcao TrackPlayer.add as historias e os resumos e palavras.

quando o usuario entrar em um resumos, guardamos o tempo da historia q parou, iniciamos o resumo, e quando terminar, voltamos para a historia de onde ela parou

O Q ESTA ACIMA NAO FUNCIONOU

NOVa abordagem:

vamos ter o audio com a historia e os reviews tudo junto,

e vamos ter nos metadados, os tempos dos CAPTIONS e do REVIEW

a cada instante, vamos verificar se o audio esta em uma CAPTION ou em uma REVUEW

se estiver no CAPTION, mostra a timeline, se estiver no REVIEW, exibe a tela de REVIEW

na TELA de REVIEW, vai ter o msm componente playback, se o usuario sair da review, o app volta para a tela anterior

NOVAS PALAVRAS

quando o app terminar um review, o app vai parar o audio corrente, e carregar o audio das palavras aprendidas
