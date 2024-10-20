import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');

import { outputEmbed } from "../utils/outputEmbed";
import { getN8nWebhook } from "../utils/getN8nWebhook";

export default {
    data: new SlashCommandBuilder()
        .setName('transcript')
        .setDescription('Transcript a video from Youtube to a text file')
        .addStringOption((option: SlashCommandStringOption) =>
            option.setName('url')
                .setDescription('The youtube video url')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const url = interaction.options.get('url')?.value;

        try {
            const response = await fetch(getN8nWebhook('transcript') + `?youtubeURL=${url}`);
            if (response.status === 500) return await interaction.editReply('You may have entered an invalid / unavailable youtube URL.');
            const { output, transcript } = await response.json();

            const buffer = Buffer.from(transcript, 'utf-8');
            const attachment = new AttachmentBuilder(buffer, { name: 'transcript.txt' });

             const embed = new outputEmbed(__filename, output)
            embed.addAttachments(attachment);
            await embed.sendMessage(interaction);
        } catch (error) {
            console.error('Error fetching the n8n webhook:', error);
            await interaction.editReply('Failed to fetch the n8n webhook.');
        }
    }
};
