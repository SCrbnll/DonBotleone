const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Muestra el banner del usuario.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario cuyo banner quieres ver.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('usuario') || interaction.user;
        const fetchedUser = await user.fetch()
        const bannerURL = fetchedUser.bannerURL({ dynamic: true, size: 1024 });
        if (bannerURL) {
            const bannerEmbed = new EmbedBuilder()
                .setTitle(`Banner de ${user.username}`)
                .setImage(bannerURL)
                .setColor(0x00b0f4);
            await interaction.reply({ embeds: [bannerEmbed] });
        } else {
            await interaction.reply({ content: `> **${user.username}** no tiene un banner establecido.` });
        }
    }
};

