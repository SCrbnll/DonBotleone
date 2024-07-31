const { SlashCommandBuilder, PermissionsBitField  } = require('discord.js');
const config = require('./../../Utils/config.js');
const updateConfig = require('./../../Utils/updateConfig.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Establece un canal específico.')
        .addStringOption(option =>
            option.setName('tipo')
                .setDescription('El tipo de canal (e.g., welcome, goodbye).')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('El canal que se utilizará.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const channelType = interaction.options.getString('tipo');
        const channel = interaction.options.getChannel('canal');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
        }
        if (!config.channels.hasOwnProperty(channelType)) {
            return interaction.reply({ content: 'Tipo de canal no válido, los canales estabecidos son\n> `\ welcome \` `\ goodbye \` `\ logs \` `\ boost \` `\ birthday \` `\ alliance \` `\ support \` `\ suggestion \`', ephemeral: true });
        }

        console.log(`ID antes del cambio (${channelType}): `, config.channels[channelType]);
        config.channels[channelType] = channel.id;
        updateConfig(channelType, channel.id);

        await interaction.reply(`El canal para ${channelType} ha sido establecido a ${channel}.`);
        console.log(`ID después del cambio (${channelType}): `, config.channels[channelType]);
    },
};
