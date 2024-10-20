import { ButtonInteraction, Client, Collection, GatewayIntentBits, Partials, type AnySelectMenuInteraction } from 'discord.js';
import eventsHandler from './Handlers/EventsHandler';
import commandsHandler from './Handlers/CommandsHandler';
import interactionsHandler from './Handlers/InteractionsHandler';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], partials: [Partials.Channel] });

export interface Command {
    data: {
        name: string;
        description: string;
    };
    autocomplete: (interaction: import('discord.js').AutocompleteInteraction, client?: Client) => Promise<void>;
    execute: (interaction: import('discord.js').Interaction, client?: Client) => Promise<void>;
}
class CommandsCollection extends Collection<string, Command> {
    get(name: string) {
        return super.find((command) => command.data.name === name);
    }
}

class InteractionsCollection extends Collection<string, (interaction: ButtonInteraction | AnySelectMenuInteraction, client?: Client) => Promise<void>> {
    get(name: string) {
        return this.find((value, key) => key === name);
    }
}

const commands = new CommandsCollection();
const interactions = new InteractionsCollection();

export { commands, interactions };

eventsHandler(client);
commandsHandler();
interactionsHandler();

client.login(process.env.TOKEN);
