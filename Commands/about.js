const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Muestra información sobre el bot.'),
  async execute(interaction) {
    const embedConstructor = new EmbedBuilder()
      .setURL("https://discord.gg/R7FpaB42S3")
      .setDescription(`¡Hola! Soy el bot **oficial** del servidor **${interaction.guild.name}**. \nEstoy aquí para ayudarte y hacer que tu experiencia sea más divertida.`)
      .addFields(
        {
          name: "Comandos",
          value: "`/help` : Muestra la lista de comandos disponibles\n`/credits` : Información técnica sobre el bot.",
          inline: false
        },
      )
      .setImage('https://www.short.ink/LuVWmcEvzBF')
      .setColor(0x000000)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      });
    // Obtener la foto de perfil del bot
    const client = interaction.client;
    if (client.user) {
      embedConstructor.setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
      embedConstructor.setTitle("Información de " + client.user.username)
    }
    interaction.reply({ embeds: [embedConstructor] });
  }
};

