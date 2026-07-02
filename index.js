const destruidor de minas = exigir('destruidor de minas')

const donos = ['name', 'name']

const robô = destruidor de minas.criarBot({
  hospedar: 'ip',
  nome de usuário: 'name_bot',
  porta: 'your_port'
})

robô.sobre('bater papo', assíncrono (nome de usuário, mensagem) => {
  se (nome de usuário === robô.nome de usuário) retornar
  se (!donos.inclui(nome de usuário)) retornar

  tentar {
    const resposta = espere buscar(
      'http://localhost:11434/api/generate',
      {
        método: 'PUBLICAR',
        cabeçalhos: {
          'Tipo de conteúdo': 'aplicativo/json'
        },
        corpo: JSON.restringir({
          modelo: 'lhama3',
          incitar: mensagem,
          fluxo: falso
        })
      }
    )

    const dados = espere resposta.JSON()

    robô.bater papo(dados.resposta.substring(0, 100))
  } pegar (errar) {
    console.registro(errar)
    robô.bater papo('Erro ao falar com a IA')
  }
})
