const { Client, Collection } = require('discord.js');
const fs = require('fs');


// Start of Discord Bot
const client = new Client();
client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();
client.items = new Collection();

// Command Handler
['commandHandler'].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

// Event Handler
fs.readdir('./events', (files) => {
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.debugg = false;
client.supportSticky = true;
client.afk = new Map();
client.antiSpam = new Map();
client.queues = new Map();

String.prototype.toProperCase = function () {
  return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
color = '#FFFFFE'; //Cannot be #FFFFFF as Discord renders full white embeds incorrectly.

client.login(process.env.TOKEN);
