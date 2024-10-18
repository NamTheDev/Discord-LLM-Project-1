const fs = require('node:fs');
const path = require('node:path');
import { commands } from '..';

const commandsPath = path.join(__dirname, '..', 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

export default () => {
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file)).default;
        commands.set(command.data.name, command);
    }
};
