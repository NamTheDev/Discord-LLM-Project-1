import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { outputEmbed } from '../utils/outputEmbed';
import { getN8nWebhook } from '../utils/getN8nWebhook';
import { sendResponse } from '../utils/sendResponse';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays help information'),

    execute: async (interaction: CommandInteraction) => {
        await interaction.deferReply();
        const { commands } = await import('../index');
        const prompt = `Analyze the following commands and provide a guide panel on what is it used for and how to use it.\nPrefix: /\nMaximum length: 6000 characters total.\nCommands:\n${JSON.stringify(commands.toJSON())}`;
        const response = await fetch(getN8nWebhook('chat') + '?chatModel=' + 'llama-3.2-90b-text-preview' + '&prompt=' + encodeURIComponent(prompt));
        const { output } = await response.json();
        const { embed } = new outputEmbed(__filename, output);
        await sendResponse(interaction, embed);
    },
};
