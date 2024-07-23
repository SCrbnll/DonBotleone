const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('Realiza una elección entre opciones.')
        .addStringOption(option =>
            option.setName('elección1')
                .setDescription('Elección 1.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('elección2')
                .setDescription('Elección 2.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('elección3')
                .setDescription('Elección 3.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('elección4')
                .setDescription('Elección 4.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('elección5')
                .setDescription('Elección 5.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('elección6')
                .setDescription('Elección 6.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('elección7')
                .setDescription('Elección 7.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('elección8')
                .setDescription('Elección 8.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('elección9')
                .setDescription('Elección 9.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('elección10')
                .setDescription('Elección 10.')
                .setRequired(false)
        ),
        
    async execute(interaction) {
        const opciones = [];

        for (let i = 1; i <= 10; i++) {
            const opcion = interaction.options.getString(`elección${i}`);
            if (opcion) {
                opciones.push(opcion);
            }
        }
        
        const respuesta = opciones[Math.floor(Math.random() * opciones.length)];

        const embedConstructor = new EmbedBuilder()
            .setTitle('🎲 Elección realizada')
            .setDescription(`> **Opciones:**\n> ${opciones.join('\n> ')}\n\n> **Elección:** ${respuesta}`)
            .setColor(0x000000);

        await interaction.reply({ embeds: [embedConstructor] });
    }
};
