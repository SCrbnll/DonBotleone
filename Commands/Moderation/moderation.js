const { EmbedBuilder} = require('@discordjs/builders');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('Muestra todas los comandos de moderación.'),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando de moderación.', ephemeral: true });
        }
        const client = interaction.client;
        const entreteEmbed = new EmbedBuilder()
            .setTitle(`Comandos de moderación`)
            .setDescription(
                "> </allresponses:1270899284757319712> - Muestra todas las respuestas automáticas registradas\n> " +
                "</responses add:1270898557225799701> - Añade una nueva respuesta\n> " +
                "</responses remove:1270898557225799701> - Elimina una respuesta existente\n> " +
                "</responses update:1270898557225799701> - Actualiza una respuesta existente\n> " +
                "</slowmode:1268169465129078784> - Establece un slowmode en un canal específico\n> " +
                "</purge:1272652741834969119> - Limpia una cantidad específica de mensajes\n> " +
                "</setchannel:1268154803691716680> - Establece un canal específico (EventsBot)\n > " + 
                "</listevents:1272673008905097246> - Muestra información detallada de los EventsBot\n " 

            )
            .setColor(0x000000)
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }), });

        await interaction.reply({ embeds: [entreteEmbed] });
    },
};
