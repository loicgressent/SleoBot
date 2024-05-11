const { CommandoClient } = require('discord.js-commando')
const winston = require('winston')

module.exports = class BotClient extends CommandoClient {
    constructor(options) {
        super(options);
        // initialisation du logger
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'console.log' })
            ],
            format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
        });

        this.on('debug', m => this.logger.log('debug', m));
        this.on('warn', m => this.logger.log('warn', m));
        this.on('error', m => this.logger.log('error', m));

        process.on('uncaughtException', error => this.logger.log('error', error));
    }
};

