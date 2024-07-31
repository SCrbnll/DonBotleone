const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const config = require('./../../Utils/config.js');
const updateConfig = require('./../../Utils/updateConfig.js');

module.exports = {
    data: (() => {
        const command = new SlashCommandBuilder()
            .setName('setchannel')
            .setDescription('Establece un canal específico.')
            .addChannelOption(option =>
                option.setName('canal')
                    .setDescription('El canal que se utilizará.')
                    .setRequired(true)
            );

        const channelOptions = Object.keys(config.channels).map(key => {
            return { name: key, value: key };
        });

        command.addStringOption(option =>
            option.setName('tipo')
                .setDescription('El tipo de canal')
                .setRequired(true)
                .addChoices(...channelOptions)
        );

        return command;
    })(),
    async execute(interaction) {
        const channelType = interaction.options.getString('tipo');
        const channel = interaction.options.getChannel('canal');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
        }

        config.channels[channelType] = channel.id;
        updateConfig(channelType, channel.id);

        await interaction.reply(`El canal para ${channelType} ha sido establecido a ${channel}.`);
    },
};
