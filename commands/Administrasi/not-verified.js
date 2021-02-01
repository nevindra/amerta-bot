const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class NotVerified extends Command {
    constructor(client) {
        super(client, {
            name: 'notverif',
            group: 'adminstrasi',
            memberName: 'notverif',
            description: 'Mencari member yang belum terverifikasi.',
            guildOnly: true
        });
    }

    async run(message, args) {
        try {
            const users = await Member.find({isActive: false});
            if (users.length === 0) {
                await message.channel.send("Sudah tidak ada member yang belum diverifikasi.")
            } else {
                for (let user of users) {
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
                            {name: 'Faksi', value: user.faksi},
                            {name: 'Username', value: user.username},
                            {name: 'Pekerjaan', value: user.namaPekerjaan})
                        .setTimestamp()
                    await message.channel.send(searchEmbed);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
};