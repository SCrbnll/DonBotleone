const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rate')
        .setDescription('El bot puntúa tu perfil')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a puntuar el perfil.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const usuario = interaction.options.getUser('usuario') || interaction.user;
        const selectedUser = await interaction.guild.members.fetch(usuario.id);
        const fetchedUser = await selectedUser.fetch()
        const bannerURL = fetchedUser.user.bannerURL({ dynamic: true, size: 1024 });

        const prcname = Math.floor(Math.random() * 11);
        const prcimg = usuario.displayAvatarURL({dynamic: true }) ? Math.floor(Math.random() * 11).toString()+'/10' : 'No puedo valorar tu imagen ya que no dispones de ninguna';
        const prcbanner = bannerURL ? Math.floor(Math.random() * 11).toString()+'/10'  : 'No puedo valorar tu banner ya que no dispones de ninguno';

        
        const embed = new EmbedBuilder()
            .setTitle('Puntuación de usuario')
            .setDescription(`<@${usuario.id}>\n> **Nombre :** ${prcname}/10\n>  **Imagen :** ${prcimg}\n>  **Banner :** ${prcbanner}`)
            .setColor(0xFF69B4)
            .setThumbnail('https://images-ext-1.discordapp.net/external/C28y6fSe8Q8DvRcOBqEHVAT-pFZXPdclg2zZMtQWIP8/https/media.tenor.com/cFwoEuBIp7oAAAAM/noted-anime.gif')
        await interaction.reply({ embeds: [embed] });
    }
};