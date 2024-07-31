const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Muestra latencia del bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setDescription('🏓 Pinging...')
            .setColor(0x1f8b4c);

        const client = interaction.client;
        if (client.user) {
            embed.setTitle("Ping de " + client.user.username)
        }
        const sent = await interaction.reply({ embeds: [embed], fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        embed.setDescription(`🏓 Ping : **${latency}ms**.`)

        await interaction.editReply({embeds: [embed]});
    },
};