import { CommandInteraction, SlashCommandBuilder, type SlashCommandStringOption } from "discord.js";

import { outputEmbed } from "../utils/outputEmbed";
import { getN8nWebhook } from "../utils/getN8nWebhook";

export default {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Return a voice message with AI-generated text')
        .addStringOption((option: SlashCommandStringOption) =>
            option.setName('prompt')
                .setDescription('The prompt to generate the voice message')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const prompt = interaction.options.get('prompt')?.value;
        await interaction.deferReply();

        try {
            const response = await fetch(getN8nWebhook('voice') + '?prompt=' + prompt);
            const { output } = await response.json();

            new outputEmbed(__filename, output).sendMessage(interaction);
        } catch (error) {
            console.error('Error fetching the n8n webhook:', error);
            await interaction.editReply('Failed to fetch the n8n webhook.');
        }
    }
};
