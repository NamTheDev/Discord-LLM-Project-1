import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import eventsHandler from './Handlers/EventsHandler';
import commandsHandler from './Handlers/CommandsHandler';
import './deploy-commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], partials: [Partials.Channel] });

export interface Command {
    data: {
        name: string;
        description: string;
    };
    execute: (interaction: import('discord.js').Interaction, client?: Client) => Promise<void>;
}

class CustomCollection extends Collection<string, Command> {
    get(name: string) {
        return super.find((command) => command.data.name === name);
    }
}
const commands = new CustomCollection();

export { commands };

eventsHandler(client);
commandsHandler();

client.login(process.env.TOKEN);
