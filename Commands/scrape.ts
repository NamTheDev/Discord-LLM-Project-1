import { EmbedBuilder, SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');

import { outputEmbed } from "../utils/outputEmbed";
import { getN8nWebhook } from "../utils/getN8nWebhook";

export default {
	data: new SlashCommandBuilder()
		.setName('scrape')
		.setDescription('Scrape the web')
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName('url')
				.setDescription('The URL to scrape')
				.setRequired(true)
		),
	async execute(interaction: CommandInteraction) {
		await interaction.deferReply();

		const url = interaction.options.get('url')?.value;

		const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
		if (!urlRegex.test(url as string)) {
			await interaction.editReply('Invalid URL');
			return;
		}

		try {
			const response = await fetch(getN8nWebhook("scrape") + '?url=' + url);
			const { output } = await response.json();

			new outputEmbed(__filename, output).sendMessage(interaction);
		} catch (error) {
			console.error('Error fetching the n8n webhook:', error);
			await interaction.editReply('Failed to fetch the n8n webhook.');
		}
	}
};
