const { SlashCommandBuilder, PermissionsBitField  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Establece un slowmode en un canal específico.')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('El canal que se editará.')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('segundos')
                .setDescription('Segundos a establecer.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const channel = interaction.options.getChannel('canal');
        const seg = interaction.options.getInteger('segundos')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
        }
        
        channel.setRateLimitPerUser(seg).then(async () => {
            await interaction.reply(`Se ha establecido un slowmode de **${seg}** segundos en el canal ${channel}`);
        });      
    },
};
