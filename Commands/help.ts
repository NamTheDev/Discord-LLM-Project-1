import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays help information');

export default {
  data: helpCommand,
  execute: async (interaction: CommandInteraction) => {
    const helpEmbed = new EmbedBuilder();
  },
};
