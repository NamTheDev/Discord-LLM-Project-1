const fs = require('node:fs');
const path = require('node:path');
import { interactions } from '..';

const interactionsPath = path.join(__dirname, '..', 'Interactions');
const interactionFiles = fs.readdirSync(interactionsPath).filter((file: string) => file.endsWith('.ts'));

export default () => {
    for (const file of interactionFiles) {
        const interaction = require(path.join(interactionsPath, file));
        const { name, execute } = interaction.default;
        interactions.set(name, execute);
    }
};