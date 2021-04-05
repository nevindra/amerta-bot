const Member = require('../../models/member');
const Slot = require('../../models/slot');
const Backup = require('../../models/backup');
const Discord = require('discord.js');
const {Command} = require('discord.js-commando');
const reader = require('xlsx')

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'setor',
            group: 'keuangan',
            memberName: 'excel',
            description: 'Mengubah keuangan setiap member.',
            guildOnly: true
        });
    }

    async run(message, {username}) {

        let data = []

        const {GoogleSpreadsheet} = require('google-spreadsheet');
        const credentials = require('../../graphic-lore-268612-16638309ef0b.json');
        const doc = new GoogleSpreadsheet('19gF2UGITXLRrpv6_PS0P1k1vIS0XYIN3P29cNIVKorE');

        await doc.useServiceAccountAuth(credentials);

        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        const rows = await sheet.getRows();
        rows.forEach((row) => {
            let person = {username: row.Username, money: row.Money}
            data.push(person)
        })

        try {
            let y = 0
            const users = await Member.find({isActive:true});

            for (let user of users) {

                let kekayaan = data[y]['money'];
                let username = data[y]['username'];
                const filter = {
                    username: username
                }
                const update = {
                    kekayaan: kekayaan
                }
                await Member.findOneAndUpdate(filter, update, ({useFindAndModify: false, new: true}));
                y++
            }
            const verifyEmbed = await new Discord.MessageEmbed()
                .setColor('#03fcf8')
                .setTitle("Selesai")
                .setAuthor(message.author.tag)
                .setDescription("Uang setiap member sudah berhasil diubah!")
                .setTimestamp()
            await message.channel.send(verifyEmbed);
        } catch (e) {
            console.log(e)
        }

    }
}


