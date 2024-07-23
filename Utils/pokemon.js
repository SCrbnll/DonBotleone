class Pokemon {
    static typeEmojis = {
        'bug': '<:Bicho_Pokemon:1265371444456718469>',
        'dark': '<:Siniestro_Pokemon:1265371468464918640>',
        'dragon': '<:Dragn_Pokemon:1265371450827866115>',
        'electric': '<:Elctrico_Pokemon:1265371452559855686>',
        'fairy': '<:Hada_Pokemon:1265371457144230021>',
        'fighting': '<:Lucha_Pokemon:1265371461032607764>',
        'fire': '<:Fuego_Pokemon:1265371455189946431>',
        'flying': '<:Volador_Pokemon:1265371475049840680>',
        'ghost': '<:Fantasma_Pokemon:1265371454036512768>',
        'grass': '<:Planta_Pokemon:1265371463888666626>',
        'ground': '<:Tierra_Pokemon:1265371471505522819>',
        'ice': '<:Hielo_Pokemon:1265371458746712065>',
        'normal': '<:Normal_Pokemon:1265371462781374586>',
        'poison': '<:Veneno_Pokemon:1265371540653080646>',
        'psychic': '<:Psquico_Pokemon:1265371465411330159>',
        'rock': '<:Roca_Pokemon:1265371523422883852>',
        'steel': '<:Acero_Pokemon:1265371442413830237>',
        'water': '<:Agua_Pokemon:1265370256508059820>'
    };

    static getEmoji(type) {
        return this.typeEmojis[type] || `:${type}:`;
    }
}

module.exports = Pokemon;
