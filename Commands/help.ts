import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { outputEmbed } from '../utils/outputEmbed';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays help information'),

    execute: async (interaction: CommandInteraction) => {
        const { commands } = await import('../index');
        const commandsList = commands.map((command) => `\`/${command.data.name}\``);
        const output = commandsList.join(', ');
        const helpEmbed = new outputEmbed(__filename, output);
    },
};
