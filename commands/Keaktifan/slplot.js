const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class SL extends Command {
    constructor(client) {
        super(client, {
            name: 'plotsl',
            group: 'keaktifan',
            memberName: 'plotsl',
            description: 'Change SL plot status!',
        });
    }

    async run(message,args) {
        if (!args.length) {
            return message.channel.send(`Masukan user yang status plot bulannya ingin kamu ubah, ${message.author}!`);
        }
        try {
            const user = await Member.findOne({username: args});
            if (user) {
                if (user.isActive === true) {
                    const filter = {
                        username: args
                    }
                    const update = {
                        isEventAttend: true,
                    }
                    await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                    const moneyEmbed = await new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(user.full_name)
                        .setURL(`https://amertanesia.com/member/${user.username}`)
                        .setAuthor(message.author.tag)
                        .setDescription(`Status, ${user.username} sudah dirubah menjadi TELAH MENGERJAKAN PLOT SL. `)
                        .setTimestamp()
                    message.reply(moneyEmbed);
                } else {
                    message.channel.send(`User ${user.full_name} tidak aktif, silahkan aktivasi user tersebut.`)
                }

            } else {
                message.reply("User not found. Insert correct username please!")
            }
        } catch (e) {
            console.log(e)
        }
    }
};
