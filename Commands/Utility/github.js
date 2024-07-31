const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Muestra información de un usuario de GitHub.')
        .addStringOption(option =>
            option.setName('usuario')
                .setDescription('El nombre de usuario de GitHub.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const username = interaction.options.getString('usuario');

        try {
            const userResponse = await axios.get(`https://api.github.com/users/${username}`);
            const userData = userResponse.data;

            const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated`);
            const repos = reposResponse.data;

            let description = '';
            if (userData.name) description += `> **Nombre :** ${userData.name}\n`;
            if (userData.bio) description += `> **Biografía :** ${userData.bio}\n`;
            if (userData.company) description += `> **Compañía :** ${userData.company}\n`;
            if (userData.blog) description += `> **Blog :** ${userData.blog}\n`;
            if (userData.location) description += `> **Ubicación :** ${userData.location}\n`;
            if (userData.email) description += `> **Email :** ${userData.email}\n`;
            if (userData.twitter_username) description += `> **Twitter :** @${userData.twitter_username}\n`;
            if (userData.public_repos !== null) description += `> **Repositorios Públicos :** ${userData.public_repos}\n`;
            if (userData.followers !== null) description += `> **Seguidores :** ${userData.followers}\n`;
            if (userData.following !== null) description += `> **Siguiendo :** ${userData.following}\n`;

            const repoDescriptions = repos.map(repo => {
                return `- [${repo.name}](${repo.html_url}) ${repo.description ? ` :: ${repo.description}` : ''}\n`;
            }).join('');

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`githubSelect-${interaction.id}-${username}`)
                .setPlaceholder('Selecciona una opción')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Información')
                        .setEmoji('🧑‍💻')
                        .setDescription('Muestra la información del usuario')
                        .setValue('info'),
                        ...(repos.length > 0 ? [
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Repositorios')
                                .setEmoji('📁')
                                .setDescription('Muestra los repositorios públicos del usuario')
                                .setValue('repos')
                        ] : [])
                );

                const selectRow = new ActionRowBuilder().addComponents(selectMenu);

                const userEmbed = new EmbedBuilder()
                    .setTitle(`Información de ${username}`)
                    .setURL(userData.html_url)
                    .setDescription(description || 'No se encontró información.')
                    .setThumbnail(userData.avatar_url)
                    .setColor(0x1f8b4c);
    
                    const reply = await interaction.reply({ embeds: [userEmbed], components: [selectRow], fetchReply: true });
    
                const filter = i => i.user.id === interaction.user.id && i.message.id === reply.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    
                collector.on('collect', async i => {
                    try {
                        if (i.customId.includes('githubSelect')) {
                            if (i.values[0] === 'info') {
                                await i.update({ embeds: [userEmbed], components: [selectRow] });
                            } else if (i.values[0] === 'repos') {
                                const reposEmbed = new EmbedBuilder()
                                    .setTitle(`Repositorios Públicos de ${username}`)
                                    .setURL(`https://github.com/${username}?tab=repositories`)
                                    .setDescription(repoDescriptions || 'No se encontraron repositorios.')
                                    .setThumbnail(userData.avatar_url)
                                    .setColor(0x1f8b4c);
    
                                await i.update({ embeds: [reposEmbed], components: [selectRow] });
                            }
                        }
                    } catch (error) {
                        console.error(error);
                        await i.update({ content: 'Hubo un error al procesar la solicitud.', components: [], ephemeral: true });
                    }
                });
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                await interaction.reply({ content: 'Usuario no encontrado.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Hubo un error al buscar la información del usuario.', ephemeral: true });
            }
        }   
    }
};

