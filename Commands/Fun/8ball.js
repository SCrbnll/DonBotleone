const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Realiza una pregunta a la mágica bola del 8.')
        .addStringOption(option =>
            option.setName('pregunta')
                .setDescription('La pregunta que deseas realizar.')
                .setRequired(true)
        ),
        async execute(interaction) {
            const responses = [
                'Sí.',
                'No.',
                'Tal vez.',
                'Definitivamente.',
                'Definitivamente no.',
                'Pregunta de nuevo más tarde.',
                'No puedo decirte ahora.',
                'Es muy probable.',
                'No cuentes con ello.',
                'Mis fuentes dicen que no.',
                'Todo apunta a que sí.',
                'Muy dudoso.',
                'Sin lugar a dudas.',
                'Sí, definitivamente.',
                'Debes confiar en ello.',
                'En mi opinión, sí.',
                'Es cierto.',
                'Lo veo claro.',
                'Lo más probable.',
                'Perspectiva buena.'
            ];
    
            const pregunta = interaction.options.getString('pregunta');
            const respuesta = responses[Math.floor(Math.random() * responses.length)];
    
            const embedConstructor = new EmbedBuilder()
                .setTitle('🎱 La mágica bola del 8')
                .setDescription(`> **Pregunta:** ${pregunta}\n> \n> **Respuesta :** ${respuesta}\n `)
                .setColor(0x000000)
                .setThumbnail('https://images-ext-1.discordapp.net/external/3BUNi4hKclpmx5X8Cm_2CbksA1GRealHptNV34p_QN8/https/media.tenor.com/jkhI4ah_1EMAAAAj/eightball.gif')
                
    
            await interaction.reply({ embeds: [embedConstructor] });
        }
};

