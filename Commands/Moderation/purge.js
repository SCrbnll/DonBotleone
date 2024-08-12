const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Limpia una cantidad específica de mensajes en un canal.')
        .addIntegerOption(option => 
            option.setName('cantidad')
                .setDescription('Número de mensajes a eliminar.')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario cuyos mensajes deseas eliminar (opcional).')
                .setRequired(false)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando de moderación.', ephemeral: true });
        }

        const cantidad = interaction.options.getInteger('cantidad');
        const usuario = interaction.options.getUser('usuario');

        if (cantidad < 1 || cantidad > 100) {
            return interaction.reply({ content: 'Por favor, especifica un número de mensajes entre 1 y 100.', ephemeral: true });
        }

        const mensajes = await interaction.channel.messages.fetch({ limit: cantidad });

        let mensajesParaEliminar;
        if (usuario) {
            mensajesParaEliminar = mensajes.filter(msg => msg.author.id === usuario.id);
        } else {
            mensajesParaEliminar = mensajes;
        }

        try {
            await interaction.channel.bulkDelete(mensajesParaEliminar, true);
            if(usuario){
                await interaction.reply({ content: `✅ Se han eliminado ${mensajesParaEliminar.size} mensajes del usuario **${usuario.username}**.`, ephemeral: true });
            } else{
                await interaction.reply({ content: `✅ Se han eliminado ${mensajesParaEliminar.size} mensajes.`, ephemeral: true });
            }
        } catch (error) {
            console.error('Error al eliminar los mensajes:', error);
            await interaction.reply({ content: 'Hubo un error al intentar eliminar los mensajes.', ephemeral: true });
        }
    },
};
