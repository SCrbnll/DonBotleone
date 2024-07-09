const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const UserFlags = require('./../Utils/userflags');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Muestra información sobre el usuario')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario cuyo avatar quieres ver.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const guild = interaction.guild;
        const user = interaction.options.getUser('usuario') || interaction.user;
        const member = await guild.members.fetch(user.id);
        const nick = member.nickname || 'No tiene';
        const name = user.globalName || user.username

        const creationTimestamp = Math.floor(user.createdAt / 1000);
        const joiningTimestamp = Math.floor(member.joinedAt / 1000);

        const roles = member.roles.cache
            .filter(role => role.name !== '@everyone')
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .join(' ') || 'No tiene roles';

        const highestRoleWithColor = member.roles.cache
            .filter(role => role.color !== 0) // Filtrar roles que tengan un color
            .sort((a, b) => b.position - a.position) // Ordenar roles por su posición
            .first(); // Obtener el primer rol (el más alto con color)

        const color = highestRoleWithColor ? `#${highestRoleWithColor.color.toString(16).padStart(6, '0')}` : 'Predeterminado';
        let flags = user.flags ? user.flags.toArray().map(flag => UserFlags.getEmoji(flag)).join(' ') : 'No tiene';

        const embedConstructor = new EmbedBuilder()
            .setTitle(name)
            .setURL(`https://discord.com/users/${user.id}`)
            .setDescription(`**ID:** ${user.id}\n**Usuario:** ${user.username}\n**Nombre:** ${name}\n**Nick:** ${nick}\n**Color:** ${color}\n**Insignias:** ${flags}`)
            .addFields(
                {
                    name: "Membresía en Discord",
                    value: `<t:${creationTimestamp}:d> (<t:${creationTimestamp}:R>)`,
                    inline: false
                },
                {
                    name: `Membresía en ${guild.name}`,
                    value: `<t:${joiningTimestamp}:d> (<t:${joiningTimestamp}:R>)`,
                    inline: false
                },
                {
                    name: "Roles",
                    value: roles,
                    inline: false
                },
            )
            .setThumbnail(member.displayAvatarURL({dynamic: true }))
            .setColor(color != 'Predeterminado' ? color : '000000')
            .setFooter({
                text: interaction.client.user.username,
                iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`userIcon-${user.id}`)
                    .setLabel('Icono')
                    .setEmoji('🖼️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`userBanner-${user.id}`)
                    .setLabel('Banner')
                    .setEmoji('🖼️')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ embeds: [embedConstructor], components: [row] });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            try {
                const userId = i.customId.split('-')[1];
                const selectedUser = await guild.members.fetch(userId);
                const fetchedUser = await selectedUser.fetch()
                if (i.customId.includes('userIcon')) {
                    const iconURL = selectedUser.displayAvatarURL({ dynamic: true, size: 1024 });
                    if (iconURL) {
                        const iconEmbed = new EmbedBuilder()
                            .setTitle(`Avatar de ${selectedUser.user.username}`)
                            .setImage(iconURL)
                            .setColor(0x000000)
                            .setFooter({
                                text: `User ID: ${selectedUser.id}`,
                            });
                        await i.reply({ embeds: [iconEmbed], ephemeral: true });
                    } else {
                        await i.reply({ content: `> **${selectedUser.user.username}** no tiene un avatar establecido.`, ephemeral: true });
                    }
                } else if (i.customId.includes('userBanner')) {
                    const bannerURL = fetchedUser.user.bannerURL({ dynamic: true, size: 1024 });
                    if (bannerURL) {
                        const bannerEmbed = new EmbedBuilder()
                            .setTitle(`Banner de ${selectedUser.user.username}`)
                            .setImage(bannerURL)
                            .setColor(0x00b0f4);
                        await i.reply({ embeds: [bannerEmbed], ephemeral: true });
                    } else {
                        await i.reply({ content: `> **${selectedUser.user.username}** no tiene un banner establecido.`, ephemeral: true });
                    }
                }
            } catch (error) {
                console.error('Error al responder a la interacción:', error);
            }
        });
    }
};