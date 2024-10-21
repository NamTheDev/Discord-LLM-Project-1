import { ActionRowBuilder, ButtonBuilder, ButtonStyle, type AttachmentBuilder, type AttachmentData, type CommandInteraction, type EmbedBuilder, type InteractionReplyOptions } from "discord.js";

export async function sendResponse(interaction: CommandInteraction, embed: EmbedBuilder, attachments?: AttachmentBuilder[]) {
    const replyConfig = {
        embeds: [embed]
    } as InteractionReplyOptions

    const translateButton = new ActionRowBuilder<ButtonBuilder>()
        .setComponents(
            new ButtonBuilder()
                .setCustomId('translate')
                .setLabel('Translate')
                .setStyle(ButtonStyle.Secondary)
        );

    if (attachments) replyConfig.files = attachments;
    replyConfig.components = [translateButton];

    await interaction.followUp(replyConfig);
}