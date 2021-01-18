const Member = require('../../models/member');
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class ListMember extends Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'adminstrasi',
            memberName: 'list',
            description: 'Search user by their faction!',
        });
    }

    async run(message,args) {
        if (!args.length) {
            return message.channel.send(`Masukan list faksi yang ingin dicari, ${message.author}!`);
        }
        const argsNew = args[0].charAt(0).toUpperCase() + args.slice(1);
        const faksi = ("The " + argsNew);

        try {
            const users = await Member.find({faksi: faksi});
            console.log(faksi)
            for (let user of users) {
                const imgURL = user.imageURL.split("..")[1];
                let status;
                user.isActive ? status = "Aktif" : status = "Tidak Aktif";
                const searchEmbed = await new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.full_name)
                    .setURL(`https://amertanesia.com/member/${user.username}`)
                    .setAuthor(message.author.tag)
                    .setThumbnail(`https://amertanesia.com${imgURL}`)
                    .addFields({name: 'Username', value: user.username},{name: 'Status', value: status})
                    .setTimestamp()
                message.channel.send(searchEmbed);
            }
        } catch (e) {
            console.log(e)
        }
    }
};