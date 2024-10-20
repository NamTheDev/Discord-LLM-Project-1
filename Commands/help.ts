import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { outputEmbed } from '../utils/outputEmbed';
import commands from '../index';

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays help information');

const commandsList = commands.map((command) => `\`/${command.data.name}\``);

const output = commandsList.join(', ');

export default {
  data: helpCommand,
  execute: async (interaction: CommandInteraction) => {
    const helpEmbed = new outputEmbed(__filename, output);
  },
};
