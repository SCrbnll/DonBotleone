const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const ResponseManager = require('./../../Utils/responsesManager.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allresponses')
        .setDescription('Muestra todas las respuestas automáticas registradas.'),
    async execute(interaction) {
        const responses = ResponseManager.getAllResponses();
        const embed = new EmbedBuilder()
            .setTitle('Respuestas Registradas')
            .setColor(0x1f8b4c);

        if (Object.keys(responses).length === 0) {
            embed.setDescription('No hay respuestas registradas.');
        } else {
            const responseEntries = Object.entries(responses);
            
            responseEntries.forEach(([phrase, response], index) => {
                embed.addFields({
                    name: `Respuesta ${index + 1}`,
                    value: `**Frase:** ${phrase}\n**Respuesta:** ${response}`,
                    inline: false
                });
            });
        }

        await interaction.reply({ embeds: [embed] });
    },
};
