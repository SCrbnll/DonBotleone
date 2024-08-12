const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const config = require('./../../Utils/config.js');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('Realiza una sugerencia para el servidor')
        .addStringOption(option =>
            option.setName('sugerencia')
                .setDescription('Sugerencia a realizar')
                .setRequired(true)
        ),
    async execute(interaction) {
        const sugerencia = interaction.options.getString('sugerencia');
        const suggestionChannel = interaction.guild.channels.cache.get(config.channels.suggestion);
        try {
            const embed = new EmbedBuilder()
                .setTitle(`Nueva sugerencia realizada`)
                .setDescription(sugerencia)
                .setThumbnail('https://images-ext-1.discordapp.net/external/C28y6fSe8Q8DvRcOBqEHVAT-pFZXPdclg2zZMtQWIP8/https/media.tenor.com/cFwoEuBIp7oAAAAM/noted-anime.gif?width=242&height=242')
                .setColor(0xFF0000)
                .setFooter({
                    text: interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                  })
                .setTimestamp();

            await suggestionChannel.send({ embeds: [embed] });
            await interaction.reply({ content: `> Sugerencia realizada con éxito, puedes visualizarla en <#${config.channels.suggestion}>`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '> Hubo un error al enviar la sugerencia.\n', ephemeral: true });
        }
    }
};
