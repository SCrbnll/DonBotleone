const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discoverybanner')
        .setDescription('Muestra el banner de descubrimiento del servidor.'),
    async execute(interaction) {
        const iconURL = interaction.guild.discoverySplashURL({ dynamic: true, size: 1024 });
        if (iconURL) {
            const iconEmbed = new EmbedBuilder()
                .setTitle('banner de descubrimiento del servidor')
                .setImage(iconURL)
                .setColor(0x00b0f4);
            await interaction.reply({ embeds: [iconEmbed] });
        } else {
            await interaction.reply({ content: `> **${interaction.guild.name}** no tiene un banner de descubrimiento establecido.` });
        }

    }
};

