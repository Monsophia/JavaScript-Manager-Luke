const Enmap = require('enmap');
require("moment-duration-format");

module.exports = {
  name: 'editcanned',
  category: 'Management',
  aliases: [],
  usage: '<tag> <\\`info\\`>',
  description: 'Edit a canned message (only for staff)',
  run: async (msg, args) => {
    if (!staff) return msg.reply(`I'm sorry but you have to be in the management team to use this command!`);
    if (!args[0]) return msg.reply('Please use the command like this: .editcanned <prefix> <canned message>');
    const infoName = args[0];
    if (!args.join(' ').replace(args[0], '').includes('`')) return msg.reply('Please put the canned message in a single backtick codeblock \`like this\`');
    let info = args.join(' ').replace(args[0], '').replace(/\n/g, '\\n').trim();
    info = info.replace(info.charAt(0), '');
    info = info.replace(/.$/, '');
    info = info.trim();
    if (!new Enmap({ name: 'cannedMsgs' }).has(infoName)) return msg.reply(`There isn't a canned message with the prefix \`${infoName}\`. Please add it first using \`.addinfo <tag>\``);
    new Enmap({ name: 'cannedMsgs' }).set(infoName, info);
    return msg.reply(`You successfully edited the canned message for the prefix \`${infoName}\``);
  }
}