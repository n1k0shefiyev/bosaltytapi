const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const ayarlar = require("./ayarlar.json");
require("./util/eventLoader")(client);
const db = require("quick.db");
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`...`);
  console.error("---");

  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

let prefix = ayarlar.prefix;
  




console.log("Ben Şuan Aktifim...");
console.log("Made By FadeAway x Plasmic");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek. Benim Ailem Plasmictir !.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return message.author.send("**Beni Sunucuda Deneyin**");
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};






////////////////////////
client.on('message', msg => {

if (!msg.content.startsWith(prefix)) {
    return;
  }

  });


client.on('message', async message => {
  
let aktif = await db.fetch(`reklamEngelcodework_${message.channel.id}`)
if (!aktif) return 
  
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = message.content.slice(" ").split(/ +/g)

if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
  
if (message.member.hasPermission("BAN_MEMBERS")) return; message.delete()
  
message.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  
let aktif = await db.fetch(`reklamEngelcodework_${oldMsg.channel.id}`)
if(!aktif) return
  
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = newMsg.content.slice(" ").split(/ +/g)

if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
  
if (newMsg.member.hasPermission("BAN_MEMBERS")) return; newMsg.delete()
  
oldMsg.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});


//KanalKoruma

client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})
//KanalKoruma Son

//Mute
client.on('roleDelete', async role => {
    const data = await require('quick.db').fetch(`codework-mute.${role.guild.id}`);
    if(data && data === role.id) require('quick.db').delete(`codework-mute.${role.guild.id}`); 
    });
//Mute Son

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(ch => ch.id === '797468787778912316')
    channel.send(`${member} Server\'a Hoşgeldin`)
})

client.on('guildMemberRemove', member =>{
    const channel = member.guild.channels.cache.find(ch => ch.id === '797468787778912316')
    channel.send(`${member} Tekrar Görüşmek Üzere`)
})


client.login(process.env.TOKEN);