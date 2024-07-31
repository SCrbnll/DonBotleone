const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const choices = [
    { name: 'Piedra', emoji: '🪨', beats: 'Tijeras' },
    { name: 'Papel', emoji: '📄', beats: 'Piedra' },
    { name: 'Tijeras', emoji: '✂️', beats: 'Papel' },
]
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Juega al piedra, papel o tijeras con otro usuario.')
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
                    content: '> No puedes jugar al piedra, papel y tijeras contigo mismo.',
                    ephemeral: true
                })
                return;
            }

            if (targetUser.bot) {
                interaction.reply({
                    content: '> No puedes jugar al piedra, papel y tijeras con un bot.',
                    ephemeral: true
                })
                return;
            }

            const embed = new EmbedBuilder()
                .setTitle(`Piedra, Papel y Tijeras`)
                .setDescription(`Es el turno de ${targetUser}.`)
                .setColor(0xFF0000)
                .setThumbnail('https://media.discordapp.net/attachments/1258826112059052134/1266522987771727903/com.png?ex=66a574f3&is=66a42373&hm=62318a83a7c4926ca3f2d7500db6bde6cea22da806b84744cbfe8a59e4a0420c&=&format=webp&quality=lossless&width=281&height=281')
                .setTimestamp(new Date());

            const buttons = choices.map((choice) => {
                return new ButtonBuilder()
                    .setCustomId(choice.name)
                    .setLabel(choice.name)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(choice.emoji)
            })

            const row = new ActionRowBuilder().addComponents(buttons)

            const reply = await interaction.reply({
                content: `${targetUser}, has sido retado ha jugar **Piedra, Papel y Tijeras** por ${interaction.user}.\nPara empezar a jugar, haz click en uno de los botones de abajo`,
                embeds: [embed],
                components: [row],
            });

            const targetUserInteraction = await reply
                .awaitMessageComponent({
                    filter: (i) => i.user.id === targetUser.id,
                    time: 30_000,
                }).catch(async (error) => {
                    embed.setDescription(`Game over. ${targetUser} no ha respondido a tiempo.`)
                    reply.edit({ content: '', embeds: [embed], components: [] })
                });

            if (!targetUserInteraction) return;

            const targetUserChoice = choices.find(
                (choice) => choice.name === targetUserInteraction.customId,
            );

            await targetUserInteraction.reply({
                content: `Has elegido ${targetUserChoice.name + targetUserChoice.emoji}`,
                ephemeral: true
            })

            embed.setDescription(`Es el turno de ${interaction.user}`)
            await reply.edit({
                content: `${interaction.user} es tu turno ahora`,
                embeds: [embed]
            })

            const initialUserInteraction = await reply
                .awaitMessageComponent({
                    filter: (i) => i.user.id === interaction.user.id,
                    time: 30_000,
                }).catch(async (error) => {
                    embed.setDescription(`Game over. ${interaction.user} no ha respondido a tiempo.`)
                    reply.edit({ content: '', embeds: [embed], components: [] })
                });

            if (!initialUserInteraction) return;

            const initialUserChoice = choices.find(
                (choice) => choice.name === initialUserInteraction.customId,
            );

            let result;

            if(targetUserChoice.beats === initialUserChoice.name) {
                result = `${targetUser} gana !!!` 
            }
            if(initialUserChoice.beats === targetUserChoice.name) {
                result = `${interaction.user} gana !!!` 
            }
            if(targetUserChoice.name === initialUserChoice.name) {
                result = `Es un empate !!!` 
            }

            embed.setDescription(
                `${targetUser} eligió ${targetUserChoice.name + ' ' + targetUserChoice.emoji}\n
                ${interaction.user} eligió ${initialUserChoice.name + ' ' + initialUserChoice.emoji}`
            )

            reply.edit({content: `Partida finalizada\n**${result}**`, embeds: [embed], components: []})

        } catch (error) {
            console.log(error)
            await interaction.reply({ content: '> Hubo un error ', ephemeral: true });
        }
    }
};
