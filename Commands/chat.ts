import { AutocompleteInteraction, EmbedBuilder, SlashCommandBuilder, type CommandInteraction, type SlashCommandStringOption } from "discord.js";

const fetch = require('node-fetch');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const n8nWebhookUrl = config.n8n_webhook.chat;

export default {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Chat with LLM models from Groq')
        .addStringOption((option: SlashCommandStringOption) =>
            option.setName('model')
                .setDescription('The model to chat with')
                .setAutocomplete(true)
                .setRequired(true)
        )
        .addStringOption((option: SlashCommandStringOption) =>
            option.setName('prompt')
                .setDescription('The prompt to chat with')
                .setRequired(true)
        ),
    async autocomplete(interaction: AutocompleteInteraction) {
        const chatModels = config.groq_models.map((model: string) => ({
            name: model,
            value: model
        }));
        const input = interaction.options.getFocused();

        if (!input) {
            const choices = chatModels.map(({ name }: { name: string }) => ({
                name,
                value: name
            }));

            return await interaction.respond(choices);
        }

        const choices = chatModels.filter(({ name }: { name: string }) => name.includes(input))

        await interaction.respond(choices);
    },
    async execute(interaction: CommandInteraction) {
        const chatModel = interaction.options.get('model')?.value;
        const prompt = interaction.options.get('prompt')?.value;
        await interaction.deferReply();

        try {
            const response = await fetch(n8nWebhookUrl + '?chatModel=' + chatModel + '&prompt=' + prompt);
            const { output } = await response.json();
            
            const embed = new EmbedBuilder()
                .setTitle("Chat")
                .setDescription(output)

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching the n8n webhook:', error);
            await interaction.editReply('Failed to fetch the n8n webhook.');
        }
    }
};
