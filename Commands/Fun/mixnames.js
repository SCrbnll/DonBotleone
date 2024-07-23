const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mixnames')
        .setDescription('Mezcla los nombres de dos usuarios.')
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

        const nombre1 = usuario1.globalName || usuario1.username;
        const nombre2 = usuario2.globalName || usuario2.username;

        const mezclarNombres = (nombreA, nombreB) => {
            const mitadA = Math.floor(nombreA.length / 2);
            const mitadB = Math.floor(nombreB.length / 2);
            return nombreA.slice(0, mitadA) + nombreB.slice(mitadB);
        };

        const nombreMezclado = mezclarNombres(nombre1, nombre2);

        const embed = new EmbedBuilder()
            .setTitle('🧩 Mezcla de Nombres')
            .setDescription(`La mezcla de los nombres <@${usuario1.id}> y <@${usuario2.id}> es :\n>  **${nombreMezclado}**`)
            .setColor(0x000000);

        await interaction.reply({ embeds: [embed] });
    }
};
