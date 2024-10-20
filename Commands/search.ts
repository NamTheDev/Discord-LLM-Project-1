import { SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');

import { outputEmbed } from "../utils/outputEmbed";
import { getN8nWebhook } from "../utils/getN8nWebhook";
import { sendResponse } from '../utils/sendResponse';

export default {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Browse the web')
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName('query')
				.setDescription('The query to browse')
				.setRequired(true)
		),
	async execute(interaction: CommandInteraction) {
		await interaction.deferReply();

		const query = interaction.options.get('query')?.value;

		try {
			const response = await fetch(getN8nWebhook("search") + '?query=' + query + '&cx=' + Bun.env.GOOGLE_CSE_ID + '&key=' + Bun.env.GOOGLE_API_KEY);
			const { output } = await response.json();

			const { embed } = new outputEmbed(__filename, output);
			await sendResponse(interaction, embed);
		} catch (error) {
			console.error('Error fetching the n8n webhook:', error);
			await interaction.editReply('Failed to fetch the n8n webhook.');
		}
	}
};
