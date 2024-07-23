const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Calcula el porcentaje de compatibilidad entre dos usuarios.')
        .addUserOption(option =>
            option.setName('usuario1')
                .setDescription('Primer usuario.')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('usuario2')
                .setDescription('Segundo usuario.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const usuario1 = interaction.options.getUser('usuario1');
        const usuario2 = interaction.options.getUser('usuario2');

        const porcentaje = Math.floor(Math.random() * 101);

        const barraProgreso = '█'.repeat(porcentaje / 10) + '░'.repeat(10 - (porcentaje / 10));

        let mensajeAmor;
        if (porcentaje < 20) {
            mensajeAmor = "Parece que no hay mucha química aquí. 😢";
        } else if (porcentaje < 40) {
            mensajeAmor = "Hay un poco de potencial. 😉";
        } else if (porcentaje < 60) {
            mensajeAmor = "¡Una buena pareja en proceso! 😊";
        } else if (porcentaje < 80) {
            mensajeAmor = "¡Una gran combinación! 😍";
        } else {
            mensajeAmor = "¡Hechos el uno para el otro! 💖";
        }

        const embed = new EmbedBuilder()
            .setTitle('Shipeo de Usuarios')
            .setDescription(`💖 <@${usuario1.id}> & <@${usuario2.id}> 💖\n\n` +
                            `**Compatibilidad:** ${porcentaje}%\n **Mensaje:** ${mensajeAmor}\n ${barraProgreso}`
                            )
            .setColor(0xFF69B4)
            .setThumbnail('https://images-ext-1.discordapp.net/external/Of0T2THrYg0JoPUkou8Wzfy8nX19GkYy3bxXaVxTkv8/https/media.tenor.com/17DcqIkp0e4AAAAj/heart-love.gif');

        await interaction.reply({ embeds: [embed] });
    }
};
