const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const BirthdayManager = require('./../../Utils/birthdayManager.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Gestiona los cumpleaños registrados.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Añade o actualiza tu cumpleaños.')
                .addStringOption(option => 
                    option.setName('fecha')
                        .setDescription('Tu fecha de cumpleaños (DD/MM/YYYY)')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Elimina un cumpleaños registrado.')
                .addUserOption(option =>
                    option.setName('usuario')
                        .setDescription('El usuario cuyo cumpleaños deseas eliminar (solo administradores).')
                        .setRequired(false))
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const userId = interaction.options.getUser('usuario')?.id || interaction.user.id;

        if (subcommand === 'add') {
            const date = interaction.options.getString('fecha');

            const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            if (!datePattern.test(date)) {
                return interaction.reply({ content: 'Formato de fecha no válido. Por favor usa DD/MM/YYYY.', ephemeral: true });
            }

            BirthdayManager.addBirthday(userId, date);
            await interaction.reply(`Tu cumpleaños ha sido registrado como: ${date}.`);

        } else if (subcommand === 'remove') {
            if (interaction.options.getUser('usuario') && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                return interaction.reply({ content: 'No tienes permisos para usar este comando para otros usuarios.', ephemeral: true });
            }

            const birthdays = BirthdayManager.getAllBirthdays();

            if (!birthdays[userId]) {
                return interaction.reply({ content: 'No se encontró ningún cumpleaños registrado para el usuario especificado.', ephemeral: true });
            }

            BirthdayManager.removeBirthday(userId);
            await interaction.reply(`El cumpleaños de ${userId === interaction.user.id ? 'tuyo' : `<@${userId}>`} ha sido eliminado de los registros.`);
        } else {
            await interaction.reply({ content: 'Comando desconocido.', ephemeral: true });
        }
    },
};
