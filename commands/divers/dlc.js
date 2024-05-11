const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class DlcCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dlc',
			memberName: 'dlc',
			group: 'divers',
			aliases: ['timerdlc', 'eldenringdlc'],
			description: `Affiche le temps restant jusqu'à la sortie du DLC d'Elden Ring`,
            clientPermissions: ['SEND_MESSAGES'],
	                guildOnly: false,
	                throttling: {
	                        usages: 1,
	                        duration: 6,
	                },
		});
	}

	async run(msg) {
		const countDownDate = new Date("June 21, 2024 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const description = `Avant la sortie du DLC D'Elden Ring !`;
    	const embed = new Discord.MessageEmbed();
    
        embed
        .setColor(`RED`)
		.setAuthor(
			`${msg.channel.guild.members.cache.get('249537772057133056').nickname}`, 
			`${'https://cdn.discordapp.com/avatars/249537772057133056/c56a28290afa0cb62575e961dc3b4331.webp'}` //c56a28290afa0cb62575e961dc3b4331
		)
        .setTitle(`${days} jours, ${hours} heures et ${minutes} minutes <a:POLICE:1155163439870783538>`)
		.setThumbnail('https://cdn.discordapp.com/attachments/1109903142876880926/1110994531807146067/Fw455CLXwAAS2pY.png?ex=662fe3c9&is=662e9249&hm=91e95f7b8c8b617cafcc16420a4dd41abfd88500c543395a98647b14faf76417&')
		.setDescription(description.toUpperCase())
		.addFields(
			{ name: 'Rendez-vous le 21 Juin :', value: '<a:pepeD:896090311028277328> <a:pepeD:896090311028277328> <a:pepeD:896090311028277328> <a:pepeD:896090311028277328> <a:pepeD:896090311028277328> <a:pepeD:896090311028277328> <a:pepeD:896090311028277328>' },
			{ name: '**↓ Nashy ↓**', value: '[Twitch.tv/NashyLive](https://twitch.tv/nashylive)', inline: true },
			{ name: '**↓ Sleonis ↓**', value: '[Twitch.tv/Sleonis](https://twitch.tv/sleonis)', inline: true },
		)
        .setImage('https://jolstatic.fr/vc/0/0/20/458/254423.jpg')
        .setTimestamp()
    
        msg.say(embed);
	}
    
};
