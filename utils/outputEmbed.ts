import { EmbedBuilder } from "discord.js";

type outputEmbedType = {
    embed: EmbedBuilder;
}

export class outputEmbed implements outputEmbedType {
    embed: EmbedBuilder;
    private formattedName(fileName: string) {
        fileName = fileName.slice(fileName.lastIndexOf('\\') + 1);
        fileName = fileName.split('.')[0];
        fileName = fileName[0].toUpperCase() + fileName.slice(1);
        return fileName;
    }

    constructor(fileName: string, output: string) {
        const formattedName = this.formattedName(fileName);
        this.embed = new EmbedBuilder()
            .setTitle(formattedName)
            .setDescription(output);
    }
}