import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import config from '../../config.json';
import { outputEmbed } from '../../embeds/outputEmbed';
import { getN8nWebhook } from '../../webhooks/n8nWebhook';

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays help information');

export default {
  data: helpCommand,
  execute: async (interaction: CommandInteraction) => {
    // Add help command logic here
  },
};
