const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('credits')
    .setDescription('Muestra información técnica sobre el bot.'),
  async execute(interaction) {
    const embedConstructor = new EmbedBuilder()
      .addFields(
        {
          name: "⌨ Developers",
          value: "<@720332640498221106>\n a",
          inline: true
        },
        {
          name: "📚 Libraries",
          value: "[Discord.js](https://discord.js.org/)\n a",
          inline: true
        },
        {
          name: "🔍 APIs",
          value: "[PokéAPI](https://pokeapi.co/)\n [GitHub API](https://docs.github.com/es/rest)",
          inline: true
        },
    )
      .setColor(0x000000)
    // Obtener la foto de perfil del bot
    const client = interaction.client;
    if (client.user) {
      embedConstructor.setAuthor({name: client.user.username + " credits",iconURL: client.user.displayAvatarURL({ dynamic: true }),})
    }
    interaction.reply({ embeds: [embedConstructor] });
}};

