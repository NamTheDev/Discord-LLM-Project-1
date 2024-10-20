import { EmbedBuilder, SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');

import { outputEmbed } from "../utils/outputEmbed";
import { getN8nWebhook } from "../utils/getN8nWebhook";

export default {
	data: new SlashCommandBuilder()
		.setName('scrape')
		.setDescription('Scrape the web')
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName('query')
				.setDescription('The query to scrape')
				.setRequired(true)
		),
	async execute(interaction: CommandInteraction) {
		await interaction.deferReply();

		const query = interaction.options.get('query')?.value;

		try {
			const response = await fetch(getN8nWebhook("scrape") + '?query=' + query);
			const { output } = await response.json();

			new outputEmbed(__filename, output).sendMessage(interaction);
		} catch (error) {
			console.error('Error fetching the n8n webhook:', error);
			await interaction.editReply('Failed to fetch the n8n webhook.');
		}
	}
};
