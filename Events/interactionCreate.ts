import type { CommandInteraction } from "discord.js";
import { commands } from "..";

export default {
    name: 'interactionCreate',
    execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command = commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};
