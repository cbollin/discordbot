//load the dependencies
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Discord Bot Online!');
});


function commandIs(str, msg) {
    return msg.content.toLowerCase().startsWith('~' + str);
}

function pluck(array) {
    return array.map(function(item) {
        return item["name"];
    });
}

function hasRole(mem, role) {
    if (pluck(mem.roles).includes(role)) {
        return true;
    } else {
        return false;
    }
}

client.on('message', message => {
    var args = message.content.split(/[ ]+/); //splits the msg at every new space

    if (commandIs('hello', message)) {
        message.channel.sendMessage('You have typed "hello" ' + message.author.username);
    }

    //setting up a number after the string, it should only work with no spaces
    if (commandIs('youtube', message)) {
        if (args.length === 1) {
            message.channel.sendMessage("You're missing an argument! Usage: `!youtube [episode number]`");
        } else if (args.length === 2) {
            message.channel.sendMessage('Hello Youtube, this is episode ' + args[1]);
        } else {
            message.channel.sendMessage("You defined too many arguments! Usage: `!youtube [episode number]`");
        }
    }

    // if the bot says "say" and the message comes from someone with the "Owner" or "mod" role, it will respond!
    if (commandIs('say', message)) {
        if (hasRole(message.member, "Owner") || hasRole(message.member, "Mod")) {
            if (args.length === 1) {
                message.channel.sendMessage("You're missing an argument! Usage: `!say [message to say]`");
            } else {
                message.channel.sendMessage(args.join(" ").substring(5));
            }
        } else {
            message.channel.sendMessage("You are not an `Owner!`");
        }
    }
    //deletes messages depending on the # you enter
    if (commandIs("delete", message)) {
        if (hasRole(message.member, "Owner") || hasRole(message.member, "Mod")) {
            if (args.length >= 3) {
                message.channel.sendMessage('You defined too many arguments. Usage: `!delete (number if messages to delete)`');
            } else {
                var msg;
                if (args.length === 1) {
                    msg = 2;
                } else {
                    msg = parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({
                    limit: msg
                }).then(messages => message.channel.bulkDelete(messages));
            }
        } else {
            message.channel.sendMessage('You are not an `Owner` or a `Mod`.');
        }
    }
    //kicks bad users, checks to make sure @ is used and that it is a valid user
    if (commandIs("kick", message)) {
        if (hasRole(message.member, "Mod") || hasRole(message.member, "Owner")) {
            console.log(message.guild.member(message.mentions.users.first()));
            if (args.length === 1) {
                message.channel.sendMessage("You're missing an argument! Usage: `!kick [user name to kick]`");
            } else if (args[1][1] != "@") {
                message.channel.sendMessage("Add a valid user name starting with @!");
            } else if (message.guild.member(message.mentions.users.first() == null)) {
                message.channel.sendMessage("No user found with that name!");
            } else {
                message.guild.member(message.mentions.users.first()).kick();
            }
        }
    }

    //if message is botver it will return the string + user
    if (message.content === '~botver') {
        message.reply('The bot version is 1.0.0, ' + message.author.username);
    }
    if(message.content == 'hi'){
      const emoji = guild.emojis.first();
      message.reply(`Hello! ${emoji}`);
    }
}); //end message handler

client.login('Mjg1ODkxNTcyNTQ3OTc3MjE3.C5Y9iw.rzJKK3SgGV14BMfbG6-p2RWDvOg');
