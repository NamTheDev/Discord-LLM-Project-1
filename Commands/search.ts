import { EmbedBuilder, SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const n8nWebhookUrl = config.n8n_webhook.search;

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
			const response = await fetch(n8nWebhookUrl + '?query=' + query + '&cx=' + Bun.env.GOOGLE_CSE_ID + '&key=' + Bun.env.GOOGLE_API_KEY);
			const { output } = await response.json();
			const embed = new EmbedBuilder()
				.setTitle('Search Results')
				.setDescription(output)

			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			console.error('Error fetching the n8n webhook:', error);
			await interaction.editReply('Failed to fetch the n8n webhook.');
		}
	}
};
