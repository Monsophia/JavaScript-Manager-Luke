const { inspect } = require('util');
module.exports = {
  name: 'eval',
  category: 'Management',
  permLevel: '4',
  description: 'Evaluate some code',
  usage: '<code>',
  run: async (client, msg, args, MessageEmbed) => {
    if (!admin) return
    const emb = new MessageEmbed()
      .setFooter(msg.author.username, msg.author.avatarURL())
    const query = args.join(' ')
    if (query) {
      const code = (lang, code) => (`\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``).replace(client.token, '*'.repeat(client.token.length))
      try {
        const evald = eval(query)
        const res = (typeof evald === 'string' ? evald : inspect(evald, { depth: 0 }))
        emb.addField('Result', code('js', res))
          .addField('Type', code('css', typeof evald === 'undefined' ? 'Unknown' : typeof evald))
          .setColor('#8fff8d')
      } catch (err) {
        emb.addField('Error', code('js', err))
          .setColor('#ff5d5d')
      } finally {
        msg.channel.send(emb).catch(err => {
          msg.channel.send(`There was an error while displaying the eval result! \n ${err.message}`)
        })
      }
    } else {
      const em = new MessageEmbed()
        .setColor('RED')
        .setDescription('Please, write something so I can evaluate!');
      msg.channel.send(em);
    }
  }
} 