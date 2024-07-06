// commands/ping.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Muestra latencia del bot'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};