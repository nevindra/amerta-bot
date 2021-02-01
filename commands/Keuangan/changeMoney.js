const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class ChangeMoney extends Command {
    constructor(client) {
        super(client, {
            name: 'duit',
            group: 'keuangan',
            memberName: 'duit',
            description: 'Change user money!',
            args: [
                {
                    key: 'username',
                    prompt: 'Masukan username member!',
                    type: 'string',
                },
                {
                    key: 'duit',
                    prompt: 'Masukkan uang member!',
                    type: 'integer',
                },
            ],
        });
    }

    async run(message, {username,duit}) {
        try {
            const kekayaan = duit;
            const user = await Member.findOne({username: username});
            if (user) {
                if (user.isActive === true) {
                    const filter = {
                        username: username
                    }
                    const update = {
                        kekayaan: kekayaan,
                    }
                    await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                    const moneyEmbed = await new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(user.full_name)
                        .setURL(`https://amertanesia.com/member/${user.username}`)
                        .setAuthor(message.author.tag)
                        .setDescription(`${user.username} memiliki uang sebesar ${user.kekayaan} lalu berubah menjadi ${kekayaan}!`)
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

