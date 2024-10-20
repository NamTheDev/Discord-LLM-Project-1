const fs = require('node:fs');
const path = require('node:path');
import { Client } from 'discord.js';

const eventsPath = path.join(__dirname, '..', 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));

export default (client: Client) => {
    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        const { name, once, execute } = event.default;
        if (once) {
            client.once(name, (...args) => execute(...args));
        } else {
            client.on(name, (...args) => execute(...args));
        }
    }
};
