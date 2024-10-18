const fs = require('node:fs');
const path = require('node:path');
import { Client } from 'discord.js';

const eventsPath = path.join(__dirname, '..', 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));

export default (client: Client) => {
    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        const { name: eventName, once: eventOnce, execute: eventExecute } = event.default;
        if (eventOnce) {
            client.once(eventName, (...args) => eventExecute(...args));
        } else {
            client.on(eventName, (...args) => eventExecute(...args));
        }
    }
};
