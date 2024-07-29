const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ttt')
        .setDescription('Juega al tres en raya con otro usuario.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario al que desafiar.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('usuario');
        try {
            if (interaction.user.id === targetUser.id) {
                interaction.reply({
                    content: '> No puedes jugar al tres en raya contigo mismo.',
                    ephemeral: true
                })
                return;
            }
            if (targetUser.bot) {
                interaction.reply({
                    content: '> No puedes jugar al tres en raya con un bot.',
                    ephemeral: true
                })
                return;
            }

            const embed = new EmbedBuilder()
                .setTitle(`Tres en raya`)
                .setDescription(`Es el turno de ${targetUser}.`)
                .setColor(0xFF0000)
                .setTimestamp(new Date());


            const row1 = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('cell0')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('cell1')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('cell2')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),
            )
            const row2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('cell3')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('cell4')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('cell5')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),
            )
            const row3 = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('cell6')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('cell7')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('cell8')
                    .setLabel('-')
                    .setStyle(ButtonStyle.Secondary),
            )

            await interaction.reply({ content: `${targetUser}, has sido retado ha jugar **Tres en Raya** por ${interaction.user}.\nPara empezar a jugar, haz click en uno de los botones de abajo`, embeds: [embed], components:[row1, row2, row3]})



        } catch (error) {
            console.log(error)
            await interaction.reply({ content: '> Hubo un error ', ephemeral: true });
        }
    }
};
