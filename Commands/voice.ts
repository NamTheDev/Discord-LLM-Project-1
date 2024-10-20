import { Command } from './command';
import { WebhookClient } from './webhook-client';

const voiceCommand = new Command({
  name: 'voice',
  description: 'Return a voice message with AI-generated text',
  async execute(message, args) {
    const webhookClient = new WebhookClient();
    const response = await webhookClient.trigger('voice', {
      // Pass any required data to the webhook here
      // For example:
      prompt: args.join(' '),
    });

    // Handle the response from the webhook
    // For example:
    const voiceMessage = response.data.voiceMessage;
    message.reply(voiceMessage);
  },
});
