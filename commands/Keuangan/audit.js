const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'audit',
            group: 'keuangan',
            memberName: 'audit',
            description: 'Melakukan audit kepada seluruh user!',
        });
    }

    async run(message, args) {
        try {
            let users = await Member.find();
            let user;
            for (user of users) {
                let PAJAK_USER = 0, TAMBAHAN = 0, RESULT = 0;
                let HARTA_USER = user.kekayaan;
                if (user.isEventAttend === true) {
                    TAMBAHAN += 75;
                    let AUDIT_USER = Number(HARTA_USER) * PAJAK_USER;
                    let kekayaanNew = (HARTA_USER - AUDIT_USER) + TAMBAHAN;
                    RESULT = Math.ceil(kekayaanNew)
                } else if (user.isEventAttend === false) {
                    let AUDIT_USER = Number(HARTA_USER) * PAJAK_USER;
                    let kekayaanNew = (HARTA_USER - AUDIT_USER) + TAMBAHAN;
                    RESULT = Math.ceil(kekayaanNew)
                }
                const filter = {
                    username: user.username
                }
                const update = {
                    kekayaan: RESULT
                }
                await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                const verifyEmbed = await new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Bot sudah melakukan backup.")
                    .setAuthor(message.author.tag)
                    .setDescription(`Terima kasih sudah menggunakan layanan Amerta Bot! :)`)
                    .setTimestamp()
                await message.channel.send(verifyEmbed);
            }
        } catch (e) {
            console.log(e)
        }

    }
}
