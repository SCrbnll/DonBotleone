const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Limpia una cantidad específica de mensajes.')
        .addIntegerOption(option =>
            option.setName('cantidad')
                .setDescription('Número de mensajes a eliminar.')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando de moderación.', ephemeral: true });
        }

        const cantidad = interaction.options.getInteger('cantidad');

        if (cantidad < 1 || cantidad > 100) {
            return interaction.reply({ content: 'Por favor, especifica un número de mensajes entre 1 y 100.', ephemeral: true });
        }

        try {
            const mensajes = await interaction.channel.messages.fetch({ limit: cantidad });
            let mensajesParaEliminar = mensajes;
        
            if (mensajesParaEliminar.size === 0) {
                return interaction.reply({ content: 'No se encontraron mensajes para eliminar.', ephemeral: true });
            }

            await interaction.channel.bulkDelete(mensajesParaEliminar, { filterOld: true });
            await interaction.reply({ content: `✅ Se han eliminado ${mensajesParaEliminar.size} mensajes.`, ephemeral: true });
        } catch (error) {
            console.error('Error al eliminar los mensajes:', error);
            await interaction.reply({ content: 'Hubo un error al intentar eliminar los mensajes.', ephemeral: true });
        }
    },
};
