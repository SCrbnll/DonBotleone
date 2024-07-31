const { SlashCommandBuilder } = require('@discordjs/builders');
const BirthdayManager = require('./../../Utils/birthdayManager.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbirthday')
        .setDescription('Añade o actualiza tu cumpleaños.')
        .addStringOption(option => 
            option.setName('fecha')
                .setDescription('Tu fecha de cumpleaños (DD/MM/YYYY)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const date = interaction.options.getString('fecha');
        const userId = interaction.user.id;

        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!datePattern.test(date)) {
            return interaction.reply({ content: 'Formato de fecha no válido. Por favor usa DD/MM/YYYY.', ephemeral: true });
        }

        BirthdayManager.addBirthday(userId, date);

        await interaction.reply(`Tu cumpleaños ha sido registrado como: ${date}.`);
    },
};
