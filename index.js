require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// Commands laden
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

console.log(`Lade ${commandFiles.length} Commands aus ${commandsPath}`);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        console.log(`[OK] Command geladen: ${command.data.name}`);
    } else {
        console.log(`[WARNING] Command ${file} fehlt "data" oder "execute"`);
    }
}

// Events laden
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

console.log(`[DEBUG] Gefundene Event-Dateien: ${eventFiles.join(", ")}`);

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`[OK] Event registriert: ${event.name}`);
}

client.login(process.env.TOKEN);