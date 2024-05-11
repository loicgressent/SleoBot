const Discord = require('discord.js');
const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET
});

module.exports = {
    run: (a, oldMember, newMember) => {
        if(!oldMember){
            console.log('pas de oldMember');
            return
        };

        let oldStreamingStatus = oldMember.activities.find(activity => activity.type === 'STREAMING') ? true : false;
        let newStreamingStatus = newMember.activities.find(activity => activity.type === 'STREAMING') ? true : false;

        if (oldStreamingStatus == newStreamingStatus) {
            return
        };

        if (newStreamingStatus) {

            const streamerNickname = a.guilds.cache.get('560219555218063361').members.cache.get(a.users.cache.get(newMember.userID).id).nickname; // dans la zone seulement
	        const streamerDiscordName = a.users.cache.get(newMember.userID).username;
            const activity = newMember.activities.find(activity => activity.type === 'STREAMING');
	        const profilePicture = a.users.cache.get(newMember.userID).displayAvatarURL();
            const allowedStreamers = ['sleonis2','frenchdeltaforce','nashylive','karimlegamer','cesarounet', 'sleonis']

            if(allowedStreamers.includes(streamerDiscordName)){

                const string = activity.assets.largeImage;
                const result = string.match(/[^:]*$/);
			    const streamPromise = twitch.getStreams({channels: result});

                streamPromise
                .then(data => {

                    const streamThumbnail = data.data[0].getThumbnailUrl().concat('?rnd=UNIXTIMESTAMP');
                    const embed = new Discord.MessageEmbed();
                    const gamesPromise = twitch.getGames(activity.state);

                    embed
				    .setAuthor(`${streamerNickname}`,`${profilePicture}`)
                    .setColor(`#6441a5`)
                    .setTitle(`**${activity.details}**`)
                    .setURL(`${activity.url}`)
                    .setDescription(`${streamerNickname} vient de lancer un stream <a:POLICE:1155163439870783538>`)
                    .addField(`Joue à`,`${activity.state}`,true)
                    .setImage(streamThumbnail)
                    .setFooter(`${activity.name}`, 'https://www.freepnglogos.com/uploads/twitch-logo-transparent-png-20.png')
                    .setTimestamp();
                    
				    gamesPromise
				    .then(gameData => {
                        const gameThumbnail = gameData.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380')

					    embed.setThumbnail(gameThumbnail)
                        
					    a.channels.cache.find(channel => channel.name === 'streams').send(embed) //Envoie final du message d'annonce
                    })
				    .catch(err => {
                        console.log(err)
                    });
                });
            }
            
        }
    }
}

