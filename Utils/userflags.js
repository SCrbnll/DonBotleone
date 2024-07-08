class UserFlags {
    static flagEmojis = {
        'ActiveDeveloper': '<:ActiveDeveloper:1259851031643160619>',
        'BotHTTPInteractions': '<:BotHTTPInteractions:1259851033207902221>',
        'BugHunterLevel1': '<:BugHunterLevel1:1259851034508132414>',
        'BugHunterLevel2': '<:BugHunterLevel2:1259851035523153951>',
        'CertifiedModerator': '<:CertifiedModerator:1259851036823130143>',
        'Hypesquad': '<:Hypesquad:1259851037901062155>',
        'HypeSquadOnlineHouse1': '<:HypeSquadOnlineHouse1:1259851039285448786>',
        'HypeSquadOnlineHouse2': '<:HypeSquadOnlineHouse2:1259851040375967874>',
        'HypeSquadOnlineHouse3': '<:HypeSquadOnlineHouse3:1259851046252187730>',
        'Partner': '<:Partner:1259851047401427048>',
        'PremiumEarlySupporter': '<:PremiumEarlySupporter:1259851102703194173>',
        'Staff': '<:Staff:1259851050819780669>',
        'VerifiedBot': '<:VerifiedBot:1259851052841304114>',
        'VerifiedDeveloper': '<:VerifiedDeveloper:1259851177399423026>',
        // Agrega aquí más flags y sus respectivos emojis según sea necesario
    };

    static getEmoji(flag) {
        return this.flagEmojis[flag] || `:${flag}:`;
    }
}

module.exports = UserFlags;
