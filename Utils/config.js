require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    prefix: '!',
    client_id: process.env.BOT_ID,
    guild_id: process.env.GUILD_ID
};
