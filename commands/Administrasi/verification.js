const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class Verification extends Command {
    constructor(client) {
        super(client, {
            name: 'verif',
            group: 'adminstrasi',
            memberName: 'verification',
            description: 'Verify user by username!',
        });
    }

    async run(message,args) {
        if (!args.length) {
            return message.channel.send(`Masukkan user yang ingin diverifikasi, ${message.author}!`);
        }
        try {
            const user = await Member.findOne({username: args});
            if (user) {
                const filter = {
                    username: args
                }
                const update = {
                    isActive: true,
                }
                await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                const verifyEmbed = await new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.full_name)
                    .setURL(`https://amertanesia.com/member/${user.username}`)
                    .setAuthor(message.author.tag)
                    .setDescription(`${user.username} is Active for now!`)
                    .setTimestamp()
                message.reply(verifyEmbed);
            } else {
                message.reply("User not found. Insert correct username please!")
            }
        } catch (e) {
            console.log(e)
        }
    }
};