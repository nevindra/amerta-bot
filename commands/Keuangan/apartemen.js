const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class ChangeApartemen extends Command {
    constructor(client) {
        super(client, {
            name: 'rumah',
            group: 'keuangan',
            memberName: 'apartemen',
            description: 'Change member status from apartemen owner to house owner!',
            guildOnly: true,
            args: [
                {
                    key: 'username',
                    prompt: 'Masukan username member!',
                    type: 'string',
                },
                {
                    key: 'tingkat',
                    prompt: 'Masukan tingkat rumah yang dibeli!',
                    type: 'integer',
                },
            ],
        });
    }

    async run(message, {username, tingkat}) {
        try {
            const user = await Member.findOne({username: username});
            const tipe = tingkat;
            if (user.isHousing === false) {
                const filter = {
                    username: username
                }
                const update = {
                    isHousing: true,
                    houseType: tipe
                }
                await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                const moneyEmbed = await new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.full_name)
                    .setURL(`https://amertanesia.com/member/${user.username}`)
                    .setAuthor(message.author.tag)
                    .setDescription(`${user.username} berpindah dari apartemen menjadi rumah kelas ${tingkat}!`)
                    .addField('Username', username)
                    .setTimestamp()
                await message.reply(moneyEmbed);
            } else if (user.isHousing === true) {
                const filter = {
                    username: username
                }
                const update = {
                    houseType: tipe
                }
                await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                const moneyEmbed = await new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.full_name)
                    .setURL(`https://amertanesia.com/member/${user.username}`)
                    .setAuthor(message.author.tag)
                    .setDescription(`Telah berpindah dari rumah tingkat ke ${user.houseType} menjadi ${tingkat}`)
                    .addField('Username', username)
                    .setTimestamp()
                await message.reply(moneyEmbed);
            } else if (!user) {
                await message.reply("User not found. Insert correct username please!")
            }
        } catch (e) {
            console.log(e)
        }
    }
};

