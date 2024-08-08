const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder } = require('discord.js');
const path = require('path')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const config = require('./Utils/config.js');
const ErrorNotifier = require('./Utils/errorNotifier.js');
const ResponseManager = require('./Utils/responsesManager.js');

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

const errorNotifier = new ErrorNotifier(client);

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

client.once('ready', async () => {
    console.log('Bot is ready!');
    client.user.setPresence({
        activities: [{ name: `Peaky Blinders`, type: ActivityType.Watching }],
        status: 'online',
    });
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const boostRoleId = config.roles.boost;
    const boostChannelId = config.channels.boost;
    const channel = client.channels.cache.get(boostChannelId);

    if (!oldMember.roles.cache.has(boostRoleId) && newMember.roles.cache.has(boostRoleId)) {
        if (channel) {
            const embed = new EmbedBuilder()
                .setTitle('<:Booster:1260224196412309614> ¡ Nueva mejora en el servidor !')
                .setDescription(`${newMember.user} ha mejorado el servidor con Nitro.`)
                .setImage('https://images-ext-1.discordapp.net/external/iOBRdjq7z-LCzd19tOxTPFdRZ2OuHDeYvxr_st1ZfxM/%3Ffit%3D500%252C200%26ssl%3D1/https/i0.wp.com/blackgirlswhobrunch.com/wp-content/uploads/2015/07/giphy.gif?width=550&height=220')
                .setColor(0x000000)
                .setTimestamp();

            channel.send({ content: ` ${newMember.user} gracias por boostear este servidor <:Booster:1260224196412309614>`, embeds: [embed] });
        }
    }
});

client.on('guildMemberAdd', async (member) => {
    console.log(`Nuevo miembro: ${member.user.tag}`);
    updateMemberCount(member.guild);
});

client.on('guildMemberRemove', async (member) => {
    console.log(`Miembro salió: ${member.user.tag}`);
    updateMemberCount(member.guild);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const responses = ResponseManager.getAllResponses();
    const response = responses[message.content.toLowerCase()];

    if (response) {
        await message.reply(response);
    }
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

async function updateMemberCount(guild) {
    const countChannel = guild.channels.cache.get(config.channels.memberCount);
    if (!countChannel) {
        await errorNotifier.notifyErrorEmbed('index.js', 'No se encuentra el canal especificado para mostrar **countChannel**\nCompruebe que el canal existe o realice el comando **/setchannel**', Date.now());
        return;
    }

    try {
        const members = guild.memberCount;
        await countChannel.setName(`🍷 || Members: ${members}`);
        console.log('Miembros actuales:', members);
    } catch (error) {
        await errorNotifier.notifyErrorEmbed('index.js', 'Error al cambiar el nombre al canal establecido para mostrar **countChannel**', Date.now());
    }

}

client.login(config.token);