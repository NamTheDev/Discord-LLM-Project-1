import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const n8nWebhookUrl = config.n8n_webhook.transcript.youtube;

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
            const response = await fetch(n8nWebhookUrl + `?youtubeURL=${url}`);
            const { output, transcript } = await response.json();

            const embed = new EmbedBuilder()
                .setTitle('Transcript')
                .setDescription(output)

            const buffer = Buffer.from(transcript, 'utf-8');
            const attachment = new AttachmentBuilder(buffer, { name: 'transcript.txt' });

            await interaction.editReply({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error('Error fetching the n8n webhook:', error);
            await interaction.editReply('Failed to fetch the n8n webhook.');
        }
    }
};
