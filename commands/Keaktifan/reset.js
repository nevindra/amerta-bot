const Member = require('../../models/member');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reset',
            group: 'keaktifan',
            memberName: 'reset',
            description: 'Reset plot job and plot SL for all members.',
        });
    }

    async run(message, args) {
        let users = await Member.find();

        for (let user of users) {
            const filter = {username: user.username}
            const update = {
                isPlotJob: false,
                isEventAttend: false
            }
            await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
        };

        const verifyEmbed = await new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Bot sudah melakukan reset terhadap semua status plot.")
            .setAuthor(message.author.tag)
            .setDescription(`Terima kasih sudah menggunakan layanan Amerta Bot! :)`)
            .setTimestamp()
        await message.channel.send(verifyEmbed);
    }
};