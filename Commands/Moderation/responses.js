const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const ResponseManager = require('./../../Utils/responsesManager.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('responses')
        .setDescription('Gestiona las respuestas automáticas del bot.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Añade una nueva respuesta.')
                .addStringOption(option =>
                    option.setName('phrase')
                        .setDescription('La frase que el bot debe detectar.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('response')
                        .setDescription('La respuesta que el bot debe enviar.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Elimina una respuesta existente.')
                .addStringOption(option =>
                    option.setName('phrase')
                        .setDescription('La frase cuya respuesta deseas eliminar.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('update')
                .setDescription('Actualiza una respuesta existente.')
                .addStringOption(option =>
                    option.setName('phrase')
                        .setDescription('La frase cuya respuesta deseas actualizar.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('new_response')
                        .setDescription('La nueva respuesta.')
                        .setRequired(true))),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
        }

        const subcommand = interaction.options.getSubcommand();
        const phrase = interaction.options.getString('phrase');
        const response = interaction.options.getString('response');
        const newResponse = interaction.options.getString('new_response');

        try {
            switch (subcommand) {
                case 'add':
                    ResponseManager.addResponse(phrase, response);
                    await interaction.reply(`Respuesta añadida: "${phrase}" - "${response}"`);
                    break;
                case 'remove':
                    ResponseManager.removeResponse(phrase);
                    await interaction.reply(`Respuesta eliminada para la frase: "${phrase}"`);
                    break;
                case 'update':
                    if (!newResponse) {
                        await interaction.reply({ content: 'La nueva respuesta es requerida para actualizar.', ephemeral: true });
                        return;
                    }
                    ResponseManager.updateResponse(phrase, newResponse);
                    await interaction.reply(`Respuesta actualizada: "${phrase}" - "${newResponse}"`);
                    break;
                default:
                    await interaction.reply({ content: 'Comando desconocido.', ephemeral: true });
                    break;
            }
        } catch (error) {
            console.error('Error al gestionar respuestas:', error);
            await interaction.reply({ content: 'Hubo un error al gestionar las respuestas.', ephemeral: true });
        }
    },
};
