import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays help information');

export default {
  data: helpCommand,
  execute: async (interaction: CommandInteraction) => {
    // Add help command logic here
  },
};
