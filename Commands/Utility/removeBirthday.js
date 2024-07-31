const { SlashCommandBuilder, PermissionsBitField  } = require('discord.js');
const BirthdayManager = require('./../../Utils/birthdayManager.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removebirthday')
        .setDescription('Elimina tu cumpleaños registrado.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario cuyo cumpleaños deseas eliminar (solo administradores).')
                .setRequired(false)
        ),
    async execute(interaction) {
        const userId = interaction.options.getUser('usuario')?.id || interaction.user.id;

        if (interaction.options.getUser('usuario') && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'No tienes permisos para usar este comando para otros usuarios.', ephemeral: true });
        }

        const birthdays = BirthdayManager.getAllBirthdays();

        if (!birthdays[userId]) {
            return interaction.reply({ content: 'No se encontró ningún cumpleaños registrado para el usuario especificado.', ephemeral: true });
        }

        BirthdayManager.removeBirthday(userId);

        await interaction.reply(`El cumpleaños de ${userId === interaction.user.id ? 'tuyo' : `<@${userId}>`} ha sido eliminado de los registros.`);
    },
};
