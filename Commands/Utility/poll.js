const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Realiza una encuesta con opciones separadas por |.')
        .addStringOption(option =>
            option.setName('pregunta')
                .setDescription('La pregunta de la encuesta.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('opciones')
                .setDescription('Las opciones de la encuesta, separadas por |.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const pregunta = interaction.options.getString('pregunta');
        const opcionesStr = interaction.options.getString('opciones');
        const opciones = opcionesStr.split('|').map(opcion => opcion.trim());
        const user = interaction.user;

        const numeroEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

        if (opciones.length < 2 || opciones.length > 10) {
            return interaction.reply({ content: 'Necesitas proporcionar entre 2 y 10 opciones separadas por |.', ephemeral: true });
        }

        let descripcion = '';
        for (let i = 0; i < opciones.length; i++) {
            descripcion += `${numeroEmojis[i]}  ${opciones[i]}\n\n`;
        }

        const embed = new EmbedBuilder()
            .setTitle(`📊 ${pregunta}`)
            .setDescription(descripcion)
            .setColor(0x000000)
            .setFooter({
                text: user.username,
                iconURL: user.displayAvatarURL({ dynamic: true, size: 1024 }),
              });

        const message = await interaction.reply({ content: 'Nueva encuesta', embeds: [embed], fetchReply: true });

        for (let i = 0; i < opciones.length; i++) {
            await message.react(numeroEmojis[i]);
        }
    }
};
