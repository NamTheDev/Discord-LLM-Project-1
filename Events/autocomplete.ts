import { AutocompleteInteraction, Client } from "discord.js";
import fs from 'node:fs';
import { commands } from "..";

export default {
    name: 'interactionCreate',
    async execute(interaction: AutocompleteInteraction, client: Client) {
        if (!interaction.isAutocomplete()) return;

        const command = commands.get(interaction.commandName);

        if (!command?.autocomplete) return;

        await command.autocomplete(interaction, client)
    },
};
