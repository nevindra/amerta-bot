const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class SL extends Command {
    constructor(client) {
        super(client, {
            name: 'plotsl',
            group: 'keaktifan',
            memberName: 'plotsl',
            description: 'Mengubah status plot pekerjaan member.',
            guildOnly: true,
            args: [
                {
                    key: 'username',
                    prompt: 'Masukan username member!',
                    type: 'string',
                },
            ],
        });
    }

    async run(message, {username}) {
        try {
            const user = await Member.findOne({username: username});
            if (user) {
                if (user.isActive === true && user.isEventAttend === false) {
                    const filter = {
                        username: username
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
                        .addField('Username', username)
                        .setTimestamp()
                    await message.reply(moneyEmbed);
                } else if (user.isActive === true && user.isEventAttend === true) {
                    await message.channel.send(`User ${user.full_name} telah diverifikasi menyelesaikan plot storyline, input ditolak.`)
                } else if (user.isActive === false) {
                    await message.channel.send(`User ${user.full_name} tidak aktif, silahkan aktivasi user tersebut.`)
                }

            } else {
                await message.reply("User not found. Insert correct username please!")
            }
        } catch (e) {
            console.log(e)
        }
    }
};
