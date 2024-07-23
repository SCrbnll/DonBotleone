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
      .setImage('https://media.discordapp.net/attachments/1258826112059052134/1258827035720286248/about.jpeg?ex=6699f049&is=66989ec9&hm=3d27a46ac8f6d0adceccfd186c13a6c00d375b767ec9f73c12f95547c288ddbe&=&format=webp&width=1018&height=636')
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

