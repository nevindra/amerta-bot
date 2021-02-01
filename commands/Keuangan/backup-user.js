const Member = require('../../models/member');
const Backup = require('../../models/backup');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'backup',
            group: 'keuangan',
            memberName: 'backup',
            description: 'Backup all stats of users',
        });
    }

    async run(message, args) {
        try {
            const users = await Member.find({isActive:true});
            for (let user of users) {
                let exist = await Backup.findOne({username: user.username})
                if (!exist) {
                    const newUser = new Backup({
                        full_name: user.full_name,
                        username: user.username,
                        namaPekerjaan: user.namaPekerjaan,
                        levelPekerjaan: user.levelPekerjaan,
                        kekayaan: user.kekayaan,
                        houseType: user.houseType,
                        isEventAttend: user.isEventAttend
                    })
                    await newUser.save();
                } else {
                    const filter = {username: user.username}
                    const update = {
                        bidangPekerjaan: user.bidangPekerjaan,
                        statusUser: user.statusUser,
                        namaPekerjaan: user.namaPekerjaan,
                        levelPekerjaan: user.levelPekerjaan,
                        kekayaan: user.kekayaan,
                        apartemen: user.apartemen,
                        rumah: user.rumah,
                        isEventAttend: user.isEventAttend
                    }
                    await Backup.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                }
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