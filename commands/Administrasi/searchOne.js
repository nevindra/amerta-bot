const Member = require('../../models/member');
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SearchOne extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            group: 'adminstrasi',
            memberName: 'search',
            description: 'Mencari member berdasarkan ',
            guildOnly: true
        });
    }

    async run(message,args) {
        if (!args.length) {
            return message.channel.send(`Masukan user yang ingin dicari, ${message.author}!`);
        }
        try {
            const user = await Member.findOne({username: args});
            if (user) {
                const imgURL = user.imageURL.split("..")[1];
                let status;
                user.isActive ? status = "Aktif" : status = "Tidak Aktif";

                const searchEmbed = await new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.full_name)
                    .setURL(`https://amertanesia.com/member/${user.username}`)
                    .setAuthor(message.author.tag)
                    .setDescription(user.description)
                    .setThumbnail(`https://amertanesia.com${imgURL}`)
                    .addFields(
                        { name: 'Faksi', value: user.faksi },
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Kekayaan', value: user.kekayaan, inline: true },
                        { name: 'Nama Pekerjaan', value: user.namaPekerjaan, inline: true },
                        { name: 'Status Verifikasi', value: status, inline: true },
                    )
                    .setTimestamp()
                message.reply(searchEmbed);
            } else {
                message.reply("User not found. Insert correct username please!")
            }
        } catch (e) {
            console.log(e)
        }
    }
};