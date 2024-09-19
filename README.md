# DonBotleone

Este es un **bot de Discord** desarrollado con fines educativos autodidactas usando **discord.js**. 

Está situado todo el codigo en la rama **develop**.

Incluye varias funcionalidades básicas y avanzadas, como recordatorios de cumpleaños, auto-respuestas y comandos de moderación.

## Configuración

El archivo `config.js` contiene los parámetros clave del bot, como los IDs de canales y roles. Asegúrate de configurar el archivo `.env` para las credenciales sensibles:

```js
require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    prefix: '!',
    client_id: process.env.BOT_ID,
    guild_id: process.env.GUILD_ID,
    channels: {
        welcome: 'XXXXXXXX',
        goodbye: 'XXXXXXXX',
        ...
    },
    roles: {
        boost: 'XXXXXXXX',
    },
    errorUserId: 'XXXXXXXX',
};
```
## Comandos
El bot tiene varias categorías de comandos:

- **Fun** : `8ball`, `choose`, `mixnames`, `pokemon`, `rate`, `roll`, `rps`, `shiny`, `ship`, `ttt`
- **Info** : `about`, `avatar`, `banner`, `credits`, `discoverybanner`, `emojis`, `icon`, `roles`, `serverbanner`, `serverinfo`, `userinfo`
- **Moderation** : `allresponses`, `listevents`, `moderation`, `purge`, `responses, setchannel, slowmode`
- **Utility** : `allbirthdays`, `birthday`, `github`, `poll`, `suggestion`
- **Utils** : `birthdaymanager`, `config`, `errorNotifier`, `responsesManager`, `updateConfig`, `userflags`

## Uso
> - Clona el repositorio.
> - Instala dependencias con npm install.
> - Configura el archivo .env con los tokens necesarios.
> - Ejecuta el bot con:
```bash
node index.js
```

## Notas
Los canales de bienvenida, despedida y otros eventos pueden cambiarse usando el comando setchannel.js. Las auto-respuestas se gestionan mediante un archivo JSON y el comando responses.



