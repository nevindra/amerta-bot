const Member = require('../../models/member');
const Slot = require('../../models/slot');
const Backup = require('../../models/backup');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            group: 'adminstrasi',
            memberName: 'delete',
            description: 'Menghapus user.',
            args: [
                {
                    key: 'username',
                    prompt: 'Masukan username member!',
                    type: 'string',
                },
            ],
            guildOnly: true
        });
    }

    async run(message, {username}) {

        const profile = await Member.findOne({username: username})
        const backup = await Backup.findOne({username: username})

        try {
            const slot = await Slot.findOne({name: profile.faksi});
            slot.slots += 1;
            if (profile) await Member.deleteOne({username: username})
            if (backup) await Backup.deleteOne({username: username})
        } catch (e) {
            console.log(e)
        }

        const deleteUserEmbed = await new Discord.MessageEmbed()
            .setColor('#02121')
            .setTitle("Bot sudah melakukan perintah.")
            .setAuthor(message.author.tag)
            .setDescription(`User ${username} sudah dihapus dari database.`)
            .setTimestamp()
        await message.channel.send(deleteUserEmbed);
    }

    catch(e) {
        console.log(e)
    }
}


