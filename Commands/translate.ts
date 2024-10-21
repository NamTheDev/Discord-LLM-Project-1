import { SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');

import { outputEmbed } from "../utils/outputEmbed";
import { getN8nWebhook } from "../utils/getN8nWebhook";
import { sendResponse } from '../utils/sendResponse';

export default {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate text from one language to another')
        .addStringOption((option: SlashCommandStringOption) =>
            option.setName('input')
                .setDescription('The input to translate')
                .setRequired(true)
        )
        .addStringOption((option: SlashCommandStringOption) =>
            option.setName('language')
                .setDescription('The language to translate to')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const input = interaction.options.get('input')?.value;
        const language = interaction.options.get('language')?.value;

        await interaction.deferReply();

        try {
            const response = await fetch(getN8nWebhook('translate') + '?input=' + input + '&language=' + language);
            const { output } = await response.json();

            const embed = new outputEmbed(__filename, output);
            await sendResponse(interaction, embed);
        } catch (error) {
            console.error('Error fetching the n8n webhook:', error);
            await interaction.editReply('Failed to fetch the n8n webhook.');
        }
    }
};
