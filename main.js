const path = require('path');
const { PREFIX, TOKEN, DATABASE, OWNER } = require('./config/config.json');
const mongoose = require('mongoose');
const { CommandoClient } = require('discord.js-commando');


const client = new CommandoClient({
    commandPrefix: PREFIX,
    owner: OWNER,
});

const databaseConnection = async () => {
    try {
        await mongoose.connect(DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected Database.")
    } catch (e) {
        console.log(e)
    }
}


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['keuangan', 'Keuangan Member'],
        ['keaktifan', 'Keaktifan Member'],
        ['adminstrasi', 'Adminstrasi Member'],
        ['admin','Owner Only']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands(
        {	unknownCommand: false}
    )
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity("Mengamati warga...");
});

client.on('error', console.error);

databaseConnection();
client.login(TOKEN);