const CtrlPlayer = require('./../controller/controllerPlayer');
const Discord = require('discord.js');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'vote',
    description: `Voter pour un membre du serveur inscrit à la partie en cours.`,
    args: true,
    aliases: ['v'],
    usage: '<membre>',
    cooldown: 5,
    execute (message, args) {
        const client = message.client;
        if (client.start === false) {
            message.reply(`Aucune partie en cours (voir la commande ${bloc}start${bloc}).`);
            return;
        }
        const whoIsVoting = client.votes.get(message.guild.id);
        if (!whoIsVoting) {
            const user = message.mentions.users.array()[0];
            const { players } = message.client;
            const control = new CtrlPlayer(players);
            control.vote(user, (err, msg) => {
                if(!err) {
                    client.votes.set(message.guild.id, true);
                }
                message.channel.send(msg);
            });
        } else {
            message.reply(`Tu as déjà voté !`);
            return; 
        }
        
    }
};