const {Command} = require('discord.js-commando');

module.exports = class JobPlot extends Command {
    constructor(client) {
        super(client, {
            name: 'hitung',
            group: 'keaktifan',
            memberName: 'calculate',
            description: 'Menghitung tambahan keuangan member.',
            guildOnly: true,
            args: [
                {
                    key: 'jenis',
                    prompt: 'Masukan username member!',
                    type: 'string',
                },
                {
                    key: 'replies',
                    prompt: 'Masukan jumlah replies member!',
                    type: 'integer'
                }
            ],
        });
    }

    async run(message, {jenis, replies}) {
        try {
            const PAYMENT = (jenis === "CP" ? 10 : (jenis === "JP" ? 20 : (jenis === "SL" ? 25 : console.log('Invalid'))))
            const RESULT = PAYMENT * replies;
            await message.channel.send(RESULT)
        } catch (e) {
            console.log(e)
        }
    }
};
