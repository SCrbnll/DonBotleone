const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const path = require('path')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const config = require('./Utils/config.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
    ]
});
const clientco = {
    commands: new Map(), // Simulación de la estructura de comandos del cliente
};

clientco.commands = new Collection();
const clientId = config.client_id;
const guildId = config.guild_id;

// Registro de comandos slash
const commands = [];
function readCommands(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
            readCommands(filePath); // Llamada recursiva
        } else if (file.endsWith('.js')) {
            const command = require(filePath);
            commands.push(command.data);
            clientco.commands.set(command.data.name, command);
        }
    }
}

readCommands(path.resolve(__dirname, './commands'));

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log('Bot is ready!');
    client.user.setPresence({
        activities: [{ name: `Peaky Blinders`, type: ActivityType.Watching }],
        status: 'online',
      });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = clientco.commands.get(commandName);

    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '> Ha habido un error ejecutando el comando', ephemeral: true });
    }
});


client.login(config.token);