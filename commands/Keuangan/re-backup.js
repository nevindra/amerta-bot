const Member = require('../../models/member');
const Backup = require('../../models/backup');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rebackup',
            group: 'keuangan',
            memberName: 'rebackup',
            description: 'Rebackup all stats of users',
        });
    }

    async run(message, args) {
        try {
            let backups = await Backup.find()

            for (let user of backups) {
                const filter = {username: user.username}
                const update = {
                    kekayaan: user.kekayaan,
                }
                await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
            }

            const verifyEmbed = await new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot sudah melakukan backup.")
                .setAuthor(message.author.tag)
                .setDescription(`Terima kasih sudah menggunakan layanan Amerta Bot! :)`)
                .setTimestamp()
            await message.channel.send(verifyEmbed);
        } catch (e) {
            console.log(e)
        }
    }
};