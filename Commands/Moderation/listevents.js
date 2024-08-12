const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('./../../Utils/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listevents')
        .setDescription('Muestra información detallada de los eventos del servidor.'),
    async execute(interaction) {
        const guild = interaction.guild;
        const channels = config.channels;
        const roles = config.roles;
        const errorUserId = config.errorUserId;

        const embed = new EmbedBuilder()
            .setTitle('Información de Eventos del Servidor')
            .setDescription(`Para cambair dichos eventos deberá realizar los comandos\n- </setchannel:1268154803691716680> para cambiar los **canales**\n- XX para cambiar los **roles**`)
            .setColor(0x000000)

        let channelDescriptions = '';
        for (const [key, value] of Object.entries(channels)) {
            const channel = guild.channels.cache.get(value);
            if (channel) {
                channelDescriptions += `> **${key}:** ${channel}\n`;
            } else {
                channelDescriptions += `> **${key}:** Canal no establecido\n`;
            }
        }

        let roleDescriptions = '';
        for (const [key, value] of Object.entries(roles)) {
            const role = guild.roles.cache.get(value);
            if (role) {
                roleDescriptions += `> **${key}:** ${role}\n`;
            } else {
                roleDescriptions += `> **${key}:** Rol no establecido\n`;
            }
        }

        const errorUser = guild.members.cache.get(errorUserId);
        const errorUserMention = errorUser ? errorUser.toString() : 'Usuario no establecido';
        const errorUserDescription = `> **errorUserId:** ${errorUserMention}`;

        embed.addFields(
            { name: 'Canales', value: channelDescriptions },
            { name: 'Roles', value: roleDescriptions },
            { name: 'Usuario de Errores', value: errorUserDescription }
        );

        await interaction.reply({ embeds: [embed] });
    },
};
