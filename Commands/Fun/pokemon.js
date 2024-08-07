const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Obtén información sobre un Pokémon.')
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

            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`);
            const speciesData = speciesResponse.data;
            const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
            const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\x0C/g, ' ') : 'Descripción no disponible';

            let img = null;

            if (pokemonData.id >= 650) {
                img = pokemonData.sprites.front_default.toString()
            } else {
                img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonData.id}.gif`;
            }

            const capitalizedName = capitalizeFirstLetter(pokemonData.species.name);

            const embed = new EmbedBuilder()
                .setTitle(`Información sobre ${capitalizedName}`)
                .setDescription(description)
                .addFields(
                    { name: 'ID', value: `${pokemonData.id}`, inline: true },
                    { name: 'Altura', value: `${pokemonData.height / 10} m`, inline: true },
                    { name: 'Peso', value: `${pokemonData.weight / 10} kg`, inline: true },
                    { name: 'Tipos', value: pokemonData.types.map(typeInfo => typeInfo.type.name).join(', '), inline: true },
                    { name: 'Habilidades', value: pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '), inline: true }
                )
                .setThumbnail(img)
                .setColor(0xFF0000);

            await interaction.reply({ embeds: [embed] , files: [{
                attachment: pokemonData.cries.latest,
                name: `${pokemonData.name}.ogg`
              }]});
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '> Hubo un error al obtener la información del Pokémon.\n> Asegúrate de que escribiste el nombre del pokemon correctamente.', ephemeral: true });
        }
    }
};
