const Discord = require('discord.js');

module.exports = {
    run: (client, data) => {
        const username = data.author;
        const channel = data.channel;
        const message = data.content;

        if(message.includes('arta') || message.includes('ARTA') || message.includes('Arta')){
            data.react('🐕‍🦺');
        }
    },

};
