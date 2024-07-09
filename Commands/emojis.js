const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojis')
        .setDescription('Muestra los emojis del servidor.'),
    async execute(interaction) {
        const emojis = interaction.guild.emojis.cache.map(emoji => emoji.toString()).join(' ');
        if (emojis) {
            const emojiEmbed = new EmbedBuilder()
                .setTitle(`Emojis de ${interaction.guild.name}`)
                .setDescription(emojis || `> **${interaction.guild.name}** no dispone de ningún emoji`)
                .setColor(0x00b0f4);

            await interaction.reply({ embeds: [emojiEmbed] });
        } else {
            await interaction.reply({ content: `> **${interaction.guild.name}** no tiene emojis.` });
        }
    }
};

