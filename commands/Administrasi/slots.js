const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class Slots extends Command {
    constructor(client) {
        super(client, {
            name: 'slots',
            group: 'adminstrasi',
            memberName: 'slots',
            description: 'Know slots available',
        });
    }

    async run(message, args) {
        try {
            const users = await Member.find();
            let sum = 0;
            let order = 0;
            let rhapsody = 0;
            let oportunist = 0;
            let impartial = 0;
            for (let user of users) {
                sum += 1;
                if(user.faksi === "The Order") order+=1;
                if(user.faksi === "The Rhapsody") rhapsody+=1;
                if(user.faksi === "The Opportunist") oportunist+=1;
                if(user.faksi === "The Impartial") impartial+=1;
            }
            const searchEmbed = await new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Jumlah member adalah : ${sum}`)
                .setAuthor(message.author.tag)
                .addFields(
                    {name: 'The Order', value: order},
                    {name: 'The Opportunist', value: oportunist},
                    {name: 'The Rhapsody', value: rhapsody},
                    {name: 'The Opportunist', value: impartial}
                    )
                .setTimestamp()
            message.channel.send(searchEmbed);
        } catch (e) {
            console.log(e)
        }
    }
};