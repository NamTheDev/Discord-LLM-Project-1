import { CommandInteraction, SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } from 'discord.js';
import { outputEmbed } from '../utils/outputEmbed';
import { getN8nWebhook } from '../utils/getN8nWebhook';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays help information'),

    execute: async (interaction: CommandInteraction) => {
        await interaction.deferReply();
        const { commands } = await import('../index');
        const prompt = `Analyze the following commands and provide a guide panel on what is it used for and how to use it.\nPrefix: /\nCommands:\n${JSON.stringify(commands.toJSON())}`;
        const response = await fetch(getN8nWebhook('chat') + '?chatModel=' + 'llama-3.2-90b-text-preview' + '&prompt=' + encodeURIComponent(prompt));
        const { output } = await response.json();

        const pages = output.match(/^(1\..*?)\n\n/gs);
        if (pages) {
            const pageOptions = pages.map((page, index) => new SelectMenuOptionBuilder()
                .setLabel(`Page ${index + 1}`)
                .setDescription(page.trim())
                .setValue(`${index}`));

            const selectMenu = new SelectMenuBuilder()
                .setCustomId('helpMenu')
                .setPlaceholder('Select a page')
                .addOptions(pageOptions);

            const actionRow = new ActionRowBuilder()
                .addComponents(selectMenu);

            const embed = new outputEmbed(__filename, pages[0].trim());
            await interaction.editReply({ embeds: [embed], components: [actionRow] });
        } else {
            new outputEmbed(__filename, output).sendMessage(interaction);
        }
    },
};
