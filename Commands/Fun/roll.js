const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Lanza dados con una cantidad específica y un número máximo de caras.')
        .addIntegerOption(option =>
            option.setName('cantidad')
                .setDescription('Cantidad de dados a lanzar.')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('numeromax')
                .setDescription('Número máximo de caras por dado.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const cantidad = interaction.options.getInteger('cantidad');
        const numeroMax = interaction.options.getInteger('numeromax');

        if (cantidad <= 0 || numeroMax <= 0) {
            await interaction.reply({ content: 'El número de dados y las caras deben ser mayores a 0.', ephemeral: true });
            return;
        }

        let total = 0;
        const rolls = [];

        for (let i = 0; i < cantidad; i++) {
            const roll = Math.floor(Math.random() * numeroMax) + 1;
            total += roll;
            rolls.push(roll);
        }

        const result = `\` ${total} \`  ⟵ [${rolls.join(', ')}] ${cantidad}d${numeroMax}`;


        await interaction.reply({ content: result });
    }
};
