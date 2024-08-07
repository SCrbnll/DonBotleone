const { EmbedBuilder } = require('discord.js');
const config = require('./config.js');

class ErrorNotifier {
    constructor(client) {
        this.client = client;
    }

    async notifyError(error) {
        const userId = config.errorUserId;
        let user = this.client.users.cache.get(userId);

        if (!user) {
            try {
                user = await this.client.users.fetch(userId);
            } catch (err) {
                console.error('No se pudo obtener el usuario desde la API:', err);
                return;
            }
        }

        if (user) {
            try {
                await user.send(`Error en el bot: ${error}`);
            } catch (err) {
                console.error('No se pudo enviar el mensaje al usuario:', err);
            }
        } else {
            console.error('Usuario no encontrado:', userId);
        }
    }

    async notifyErrorEmbed(clase, description) {
        const userId = config.errorUserId;
        let user = this.client.users.cache.get(userId);

        if (!user) {
            try {
                user = await this.client.users.fetch(userId);
            } catch (err) {
                console.error('No se pudo obtener el usuario desde la API:', err);
                return;
            }
        }

        if (user) {
            const embed = new EmbedBuilder()
                .setTitle(`Error en fichero: ${clase}`)
                .setDescription(description)
                .setColor(0xff0000)
                .setTimestamp();

            try {
                await user.send({ embeds: [embed] });
            } catch (err) {
                console.error('No se pudo enviar el mensaje al usuario:', err);
            }
        } else {
            console.error('Usuario no encontrado:', userId);
        }
    }
}

module.exports = ErrorNotifier;
