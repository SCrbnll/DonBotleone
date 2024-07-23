
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra la lista de comandos disponibles.'),
    async execute(interaction) {
        const user = interaction.user;
        const embedConstructor = new EmbedBuilder()
            .setDescription("Bienvenido a la ayuda de <@1258738952089899078>, aquí encontrarás todos \nlos comandos disponibles.")
            .addFields(
                {
                    name: "Comandos",
                    value: "> Utilice el menú de selección de la parte inferior.",
                    inline: false
                },
            )
            .setColor(0x000000)
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL(),
            });

        const client = interaction.client;
        if (client.user) {
            embedConstructor.setAuthor({name: client.user.username ,iconURL: client.user.displayAvatarURL({ dynamic: true }),})
        }

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(`infoSelect-${user.id}`)
            .setPlaceholder('Selecciona una opción')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Menú principal')
                    .setEmoji('🍷')
                    .setValue('menu'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Información')
                    .setEmoji('🍷')
                    .setDescription('Muestra comandos sobre información.')
                    .setValue('info'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Entretenimiento')
                    .setEmoji('🃏')
                    .setDescription('Muestra comandos sobre entretenimiento.')
                    .setValue('entrete'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Utilidad')
                    .setEmoji('☕')
                    .setDescription('Muestra los comandos sobre utilidad.')
                    .setValue('util'),
            );

        const selectRow = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ embeds: [embedConstructor], components: [selectRow] });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            try {
                if (i.customId.includes('infoSelect')) {
                    if (i.values[0] === 'menu') {
                        await i.update({ embeds: [embedConstructor], components: [selectRow] });

                    } else if (i.values[0] === 'info') {
                        
                        const infoEmbed = new EmbedBuilder()
                            .setTitle(`Comandos de información`)
                            .setDescription(
                                "> </about:1260220375699296266> - Muestra información sobre.\n> " +
                                "</credits:1260220375699296268> - Muestra información tecnica sobre el bot.\n> " +
                                "</help:1263540927558058068> - Muestra la lista de comandos disponibles\n> " + 
                                "</ping:1260220375699296269> - Muestra latencia del bot\n> " +
                                "</avatar:1260220375699296267> - Muestra el avatar del usuario\n> " + 
                                "</banner:1260246312469659712> - Muestra el banner del usuario\n> " + 
                                "</userinfo:1260220375699296271> - Muestra información sobre el usuario\n> " +
                                "</discoverybanner:1260259005440458782> - Muestra el banner de descubirmiento del servidor\n> " + 
                                "</emojis:1260259005440458783> - Muestra los emojis del servidor\n> " + 
                                "</icon:1260259005440458784> - Muestra el icono del servidor\n> " + 
                                "</roles:1260259005440458785> - Muestra los roles del servidor\n> " + 
                                "</serverbanner:1260259005440458786> - Muestra el banner del servidor\n> " + 
                                "</serverinfo:1260220375699296270> - Muestra información sobre el servidor\n "
                            )
                            .setColor(0x00b0f4)
                            .setAuthor({name: client.user.username ,iconURL: client.user.displayAvatarURL({ dynamic: true }),});

                        await i.update({ embeds: [infoEmbed], components: [selectRow] });

                    } else if (i.values[0] === 'entrete') {
                        // EDITAR SOBRE LA MARCHA
                        await i.update({ embeds: [embedConstructor], components: [selectRow] });
                    }
                }
            } catch (error) {
                console.error('Error al responder a la interacción:', error);
            }
        });
    }
};

