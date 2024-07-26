const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shiny')
        .setDescription('Visualiza el shiny de un pokemon.')
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('El nombre del Pokémon.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const nombre = interaction.options.getString('nombre').toLowerCase();

        try {
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
            const pokemonData = pokemonResponse.data;

            let img = null;
            if (pokemonData.id >= 650) {
                img = pokemonData.sprites.front_shiny.toString()
            } else {
                img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${pokemonData.id}.gif`;
            }

            const capitalizedName = capitalizeFirstLetter(pokemonData.name);

            const embed = new EmbedBuilder()
                .setTitle(`Shiny de ${capitalizedName}`)
                .setDescription('Para ver la información del pokemon ejecute el comando\n ' + `**/pokemon nombre: ${pokemonData.name}**`)
                .setImage(img)
                .setColor(0xFF0000);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: '> Hubo un error al obtener la información del Pokémon.\n> Asegúrate de que escribiste el nombre del pokemon correctamente.', ephemeral: true });
        }
    }
};
