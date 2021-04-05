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
                let HARTA_USER = user.kekayaan;
                const PAJAK_USER = (user.kekayaan > 3000 ? 0.05 : 0.1)
                const TAMBAHAN = (user.isEventAttend === true ? 75 : 0);
                let AUDIT_USER = Number(HARTA_USER) * PAJAK_USER;
                let kekayaanNew = (HARTA_USER - AUDIT_USER) + TAMBAHAN;
                const RESULT = Math.ceil(kekayaanNew)
                const filter = {
                    username: user.username
                }
                const update = {
                    kekayaan: RESULT
                }
                await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
            }
            const verifyEmbed = await new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot sudah melakukan audit.")
                .setAuthor(message.author.tag)
                .setDescription(`Terima kasih sudah menggunakan layanan Amerta Bot! :)`)
                .setTimestamp()
            await message.channel.send(verifyEmbed);
        } catch (e) {
            console.log(e)
        }

    }
}
