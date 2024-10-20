import { ButtonInteraction, Client, Collection, GatewayIntentBits, Partials, type AnySelectMenuInteraction } from 'discord.js';
import eventsHandler from './Handlers/EventsHandler';
import commandsHandler from './Handlers/CommandsHandler';
import interactionsHandler from './Handlers/InteractionsHandler';

// Create a new Discord client instance with the specified intents and partials
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], partials: [Partials.Channel] });

// Define the Command interface with data, autocomplete, and execute functions
export interface Command {
    // Command data
    data: {
        name: string;
        description: string;
    };
    // Autocomplete function
    autocomplete: (interaction: import('discord.js').AutocompleteInteraction, client?: Client) => Promise<void>;
    // Execute function
    execute: (interaction: import('discord.js').Interaction, client?: Client) => Promise<void>;
}
// Define a custom collection class for commands
class CommandsCollection extends Collection<string, Command> {
    // Get command by name
    get(name: string) {
        return super.find((command) => command.data.name === name);
    }
}

// Define a custom collection class for interactions
class InteractionsCollection extends Collection<string, (interaction: ButtonInteraction | AnySelectMenuInteraction, client?: Client) => Promise<void>> {
    // Get interaction by name
    get(name: string) {
        return this.find((value, key) => key === name);
    }
}

// Create instances of the CommandsCollection and InteractionsCollection
const commands = new CommandsCollection();
// Initialize the commands collection
const interactions = new InteractionsCollection();
// Initialize the interactions collection

export { commands, interactions };

// Initialize event handlers
eventsHandler(client);
// Initialize command handlers
commandsHandler();
// Initialize interaction handlers
interactionsHandler();

client.login(process.env.TOKEN);
