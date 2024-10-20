import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { outputEmbed } from '../utils/outputEmbed';

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays help information');

export default {
  data: helpCommand,
  execute: async (interaction: CommandInteraction) => {
    const helpEmbed = outputEmbed();
  },
};
