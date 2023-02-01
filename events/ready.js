const { MessageEmbed } = require('discord.js');
const Enmap = require('enmap');
const moment = require('moment');
module.exports = async client => {
  // Log that the bot is online.
  console.log(`${client.user.tag}, ready in ${client.guilds.cache.size} servers.`, "ready");
  client.appInfo = await client.fetchApplication();

  // Fetch all client users.
  await client.guilds.cache.forEach(g => g.available && g.members.fetch());

  // Fetch all starboard messages.
  const starboard = client.channels.cache.get('778429519639347210');
  await starboard.messages.fetch()
  starboard.messages.cache.filter(m => !m.deleted && m.embeds.size > 0).forEach(async (mesg) => {
    const chanID = mesg.embeds[0].footer.text.split(' : ')[1]
    const messageID = mesg.embeds[0].footer.text.split(' : ')[0]
    await client.channels.cache.get(chanID).messages.fetch(messageID);
  })

  // Staff messages check.
  const db = new Enmap({ name: 'staffChecks' });
  const MINUTE = 60 * 1000;
  const WEEK = 7 * 24 * 60 * 60 * 1000;

  async function check(db) {
    const startDate = new Date(2020, 11, 20, 0, 0, 0, 0).getTime();
    db.ensure('last_check', startDate);
    let lastPost = db.get('last_check');
    setInterval(async () => {
      if (Date.now() - lastPost > WEEK) {
        lastPost += WEEK;
        const filter = db.filter(d => d.id && typeof d.id == 'string');
        const checkChan = client.channels.cache.get('792711754311794728');
        const em = new MessageEmbed()
          .setColor(color)
          .setTitle(`Staff Checks | ${moment(Date.now()).format('LL')}`);
        for (const data of filter) {
          em.addField(`${(await client.users.fetch(data[1].id)).tag} | ${(await client.guilds.cache.get('720661480143454340').members.fetch(data[1].id)) ? (await client.guilds.cache.get('720661480143454340').members.fetch(data[1].id)).roles.highest.name : 'N/A'}`, `${data[1].count.toLocaleString()} messages sent`);
        }
        checkChan.send(em);
        db.clear()
        db.set('last_check', lastPost);
      }
    },
      MINUTE
    )
  };
  check(db);

  // Mutes system
  setInterval(() => {
  }, 60000)
};
