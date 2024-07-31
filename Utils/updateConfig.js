const fs = require('fs');
const path = require('path');

function updateConfig(channelType, channelId) {
    const configPath = path.join(__dirname, 'config.js');
    let configFile = fs.readFileSync(configPath, 'utf8');
    
    const regex = new RegExp(`(${channelType}: ').*?(')`, 'g');
    const newValue = `$1${channelId}$2`;

    configFile = configFile.replace(regex, newValue);

    fs.writeFileSync(configPath, configFile, 'utf8');
}

module.exports = updateConfig;
