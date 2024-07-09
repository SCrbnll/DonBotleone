const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Muestra los roles del servidor.'),

    async execute(interaction) {
        const guild = interaction.guild;
        const allRoles = guild.roles.cache;
        const members = await guild.members.fetch();

        const botNames = members.filter(member => member.user.bot).map(bot => {
            const botName = bot.user.username.toLowerCase();
            return botName === 'disboard' ? `${botName}.org` : botName;
        });

        const filteredRoles = allRoles.filter(role => {
            const roleName = role.name.toLowerCase();
            return roleName !== '@everyone' &&
                !role.name.startsWith('@+─') &&
                !botNames.includes(roleName); 
        }).sort((a, b) => b.position - a.position);

        let description = '';
        filteredRoles.forEach(role => {
            description += `<@&${role.id}>\n`;
        });

        if (description) {
            const emojiEmbed = new EmbedBuilder()
                .setTitle(`Roles de ${interaction.guild.name}`)
                .setDescription(description)
                .setColor(0x00b0f4);

            await interaction.reply({ embeds: [emojiEmbed] });
        } else {
            await interaction.reply({ content: `> **${interaction.guild.name}** no tiene roles.` });
        }
    }
};

