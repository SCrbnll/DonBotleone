require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    prefix: '!',
    client_id: process.env.BOT_ID,
    guild_id: process.env.GUILD_ID,
    channels: {
        welcome: '1126286110977433611',
        goodbye: '1126286132947193978',
        logs: '1130918837991247963',
        boost: '1134115390633541652',
        birthday: '1251977791147086004',
        alliance: '1127376521791815800',
        support: '1127382069635461151',
        suggestion: '1127382250019901490',
        memberCount: '1270867503043842063'
    },
    roles: {
        boost: '1134107961854283827',
    },
    errorUserId: '720332640498221106',
};
