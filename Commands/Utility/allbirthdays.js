const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const BirthdayManager = require('../../Utils/birthdayManager.js');
const moment = require('moment');
require('moment/locale/es');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allbirthdays')
        .setDescription('Muestra todos los cumpleaños registrados.'),
    async execute(interaction) {
        const birthdays = BirthdayManager.getAllBirthdays();
        const embed = new EmbedBuilder()
            .setTitle('Cumpleaños Registrados')
            .setColor(0x1f8b4c);

        if (Object.keys(birthdays).length === 0) {
            embed.setDescription('No hay cumpleaños registrados.');
        } else {
            const groupedBirthdays = {};

            for (const userId in birthdays) {
                const date = birthdays[userId];
                const birthdayMoment = moment(date, 'DD/MM/YYYY').locale('es');
                const unixTimestamp = birthdayMoment.unix(); // Convertir a Unix timestamp
                const day = birthdayMoment.format('D');
                const month = birthdayMoment.format('MMMM');
                const age = moment().diff(birthdayMoment, 'years');

                if (!groupedBirthdays[month]) groupedBirthdays[month] = [];
                groupedBirthdays[month].push({ userId, day, month, unixTimestamp, age });
            }

            const monthsInSpanish = [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];

            for (const month of monthsInSpanish) {
                if (groupedBirthdays[month]) {
                    const monthBirthdays = groupedBirthdays[month]
                        .map(b => `<@${b.userId}> - <t:${b.unixTimestamp}:d> (${b.age} años)`)
                        .join('\n');
                    embed.addFields({ name: month.charAt(0).toUpperCase() + month.slice(1), value: monthBirthdays });
                }
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
