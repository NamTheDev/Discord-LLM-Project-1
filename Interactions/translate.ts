import { ActionRowBuilder, AttachmentBuilder, ButtonInteraction, Client, CommandInteraction, ComponentType, EmbedBuilder, InteractionCollector, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { outputEmbed } from "../utils/outputEmbed";
import { getN8nWebhook } from "../utils/getN8nWebhook";

export default {
    name: 'translate',
    async execute(interaction: ButtonInteraction, client: Client<true>) {
        const oldMessage = interaction.message;
        const oldEmbed = oldMessage.embeds[0];

        const modal = new ModalBuilder()
            .setTitle('Translate text')
            .setCustomId('translateModal')

        const textInput = new TextInputBuilder()
            .setLabel('Language')
            .setCustomId('language')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Language to translate to')
            .setRequired(true)

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);
        modal.addComponents(row);

        await interaction.showModal(modal);

        // Create the collector
        const collector = new InteractionCollector(interaction.client, {
            filter: (i) => i.customId === 'translateModal' && i.user.id === interaction.user.id,
            time: 60000,
        });

        // Handle collected interactions
        collector.on('collect', async (submittedInteraction: ModalSubmitInteraction) => {
            const language = submittedInteraction.fields.getTextInputValue('language');

            const encoder = new TextEncoder();
            const content = encoder.encode(oldEmbed.description as string);

            // Fetch response from the webhook
            await submittedInteraction.deferReply();
            const response = await fetch(getN8nWebhook('translate') + '?input=' + content + '&language=' + language);
            console.log(response)
            const { output } = await response.json();

            const newEmbed = new outputEmbed("translate", output);

            const oldAttachments = oldMessage.attachments.map((attachment) =>
                new AttachmentBuilder(attachment.url, { name: attachment.name })
            );

            if (oldMessage.attachments) newEmbed.addAttachments(...oldAttachments);

            await newEmbed.sendMessage(submittedInteraction as unknown as CommandInteraction);

            // Stop the collector after processing
            collector.stop();
        });

    },
};