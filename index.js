const mineflayer = require('mineflayer')

const donos = ['meninoroxo', 'q1wn']

const bot = mineflayer.createBot({
  host: 'galinhaxd.aternos.me',
  username: 'botzin',
  port: '21656'
})

bot.on('chat', async (username, message) => {
  if (username === bot.username) return
  if (!donos.includes(username)) return

  try {
    const response = await fetch(
      'http://localhost:11434/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3',
          prompt: message,
          stream: false
        })
      }
    )

    const data = await response.json()

    bot.chat(data.response.substring(0, 100))
  } catch (err) {
    console.log(err)
    bot.chat('Erro ao falar com a IA')
  }
})