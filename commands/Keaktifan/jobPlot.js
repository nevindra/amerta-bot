const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class JobPlot extends Command {
    constructor(client) {
        super(client, {
            name: 'plotjob',
            group: 'keaktifan',
            memberName: 'plotjob',
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
                if (user.isActive === true) {
                    const filter = {
                        username: username
                    }
                    const update = {
                        isPlotJob: true,
                    }
                    await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                    const moneyEmbed = await new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(user.full_name)
                        .setURL(`https://amertanesia.com/member/${user.username}`)
                        .setAuthor(message.author.tag)
                        .setDescription(`Status, ${user.username} sudah dirubah menjadi TELAH MENGERJAKAN PLOT JOB. `)
                        .addField('Username',username)
                        .setTimestamp()
                    await message.reply(moneyEmbed);
                } else {
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
