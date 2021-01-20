const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class Verification extends Command {
    constructor(client) {
        super(client, {
            name: 'verif',
            group: 'adminstrasi',
            memberName: 'verification',
            description: 'Verifikasi user berdasarkan username.!',
            args: [
                {
                    key: 'username',
                    prompt: 'Masukan username member!',
                    type: 'string',
                },
            ],
            guildOnly: true
        });
    }

    async run(message, {username}) {
        try {
            const user = await Member.findOne({username: username});
            if (user) {
                const filter = {
                    username: username
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
                    .setDescription(`${user.username} sudah AKTIF. Jangan lupa untuk verif ketika member sudah selesai membuat plot kedatangan!a`)
                    .addField('Username',username)
                    .setTimestamp()
                await message.reply(verifyEmbed);
            } else {
                await message.reply("User not found. Insert correct username please!")
            }
        } catch (e) {
            console.log(e)
        }
    }
};