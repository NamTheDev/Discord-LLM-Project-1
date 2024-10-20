import { ActionRowBuilder, Attachment, AttachmentBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, type APIActionRowComponent, type APIButtonComponent, type AttachmentData } from "discord.js";

export class outputEmbed {
    private embed: EmbedBuilder;
    private translateButtonActionRow?: APIActionRowComponent<APIButtonComponent>;
    private attachments?: Attachment[];
    private formattedName(fileName: string) {
        fileName = fileName.slice(fileName.lastIndexOf('\\') + 1);
        fileName = fileName.split('.')[0];
        fileName = fileName[0].toUpperCase() + fileName.slice(1);
        return fileName;
    }

    public addAttachments(...attachments: AttachmentBuilder[]) {
        this.attachments = attachments.map((attachment) => {
            return attachment.toJSON() as Attachment;
        });
    }

    get replyConfig() {
        const config = {
            embeds: [this.embed],
            components: this.translateButtonActionRow ? [this.translateButtonActionRow] : []
        } as {
            embeds: EmbedBuilder[];
            components: APIActionRowComponent<APIButtonComponent>[];
            attachments: Attachment[];
        };
        
        this.attachments ? config.attachments = this.attachments : null;

        return config;
    }

    public async sendMessage(interaction: CommandInteraction) {
        return await interaction.followUp(this.replyConfig);
    }

    constructor(fileName: string, output: string) {
        const formattedName = this.formattedName(fileName);
        const embed = new EmbedBuilder()
            .setTitle(formattedName)
            .setDescription(output);
        if (formattedName !== 'Translate') {
            const translateButton = new ButtonBuilder()
                .setLabel('Translate text')
                .setCustomId('translate')
                .setStyle(ButtonStyle.Secondary);
            const actionRow = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(translateButton)
                .toJSON();
            this.translateButtonActionRow = actionRow;
        }
        this.embed = embed;
    }
}