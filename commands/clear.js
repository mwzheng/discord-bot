module.exports = {
    name: "clear",
    description: "Clear messages from the channel (2-100)",
    usage: "<#_mgs_to_delete>",
    execute(msg, args) {
        const amount = parseInt(args[0]);

        msg.delete({ reason: 'Reduce chat log spam' });

        if (isNaN(amount) || amount <= 1 || amount > 100) {
            return msg.reply("Invalid arg entered. Please enter a number between 2 and 100 inclusive");
        }

        msg.channel.bulkDelete(amount, true).catch((err) => {
            console.error(err);
            msg.channel.send("Error deleting messages from channel!");
        });
    },
};