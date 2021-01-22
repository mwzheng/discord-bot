const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
require('dotenv').config();

const cooldowns = new Discord.Collection();
const client = new Discord.Client();

client.songQueue = new Map();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Require all the commands form commands dir
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Discord client ready!");
})

client.on('message', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Command doesn't exist
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    // Set up cooldowns for the commands ----------------------
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
    // ------------------------------------------------------------

    try {
        command.execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});

client.login(process.env.BOT_TOKEN);

