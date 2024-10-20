import { ButtonInteraction, Client, type AnySelectMenuInteraction } from "discord.js";
import { commands, interactions } from "..";

export default {
    name: 'interactionCreate',
    async execute(interaction: ButtonInteraction | AnySelectMenuInteraction, client: Client) {
        if (!(interaction.isButton() || interaction.isAnySelectMenu())) return;
        const interactionExecute = interactions.get(interaction.customId);
        if(interactionExecute) await interactionExecute(interaction, client);
    },
};