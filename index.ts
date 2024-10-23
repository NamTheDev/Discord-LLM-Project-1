import { ChannelType, Client, GatewayIntentBits, Partials } from 'discord.js';
import Groq from 'groq-sdk';
import type { RequestOptions } from 'groq-sdk/core.mjs';
import type { ChatCompletionCreateParamsNonStreaming } from 'groq-sdk/resources/chat/completions.mjs';
import fetch from 'node-fetch';
import express, { Request, Response } from 'express';

const groq_client = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping
    ], partials: [Partials.Channel]
});

let process_running = false;

async function chat(body: ChatCompletionCreateParamsNonStreaming, options: RequestOptions = {}) {
    return groq_client.chat.completions.create(body, options)
}

client.on('messageCreate', async (message) => {
    const mention = message.mentions.users.first()
    const client_ID = process.env.CLIENT_ID

    if(!mention || mention.id !== client_ID) return;

    if (process_running) return;

    const webhookURL = `http://${process.env.N8N_HOST_IP}:5678/webhook/`

    await message.channel.sendTyping()

    const JSON_schema = {
        "type": "object",
        "properties": {
            "prompt_type": {
                "type": "string",
                "description": "The type of prompt. Either: chat - conversational messages, search - browsing the internet or transcript - generate a transcript of a youtube video.",
                "enum": [
                    "chat",
                    "search",
                    "transcript"
                ]
            },
            "chat_response": {
                "type": "string",
                "description": "The response for 'chat' prompt type."
            },
            "queries": {
                "type": "string",
                "description": "The queries to pass in when fetching webhooks. '?query' is for search and '?url=' is for transcript.",
                "enum": [
                    "?query=",
                    "?url="
                ]
            }
        },
        "required": [
            "prompt_type",
            "queries"
        ]
    }


    const chatCompletion = await chat({
        response_format: {
            type: 'json_object'
        },
        messages: [
            {
                role: 'user',
                content: message.content
            },
            {
                role: 'system',
                content: `JSON schema: ${JSON.stringify(JSON_schema)}`
            },
            {
                role: 'system',
                content: 'Analyze user response and generate a respond with provided the JSON schema.'
            }
        ],
        model: 'llama-3.2-90b-text-preview'
    });
    const { prompt_type, queries, chat_response } = chatCompletion.choices[0].message.content ? JSON.parse(chatCompletion.choices[0].message.content) : {};
    
    if (prompt_type === 'chat') {
        await message.reply({
            content: chat_response,
            allowedMentions: {
                repliedUser: false
            }
        });
    } else {
        const response = await fetch(webhookURL + prompt_type + queries);
        const data = await response.json() as { output: string };
        const { output } = data;

        await message.reply({
            embeds: [{
                title: prompt_type,
                description: output
            }],
            allowedMentions: {
                repliedUser: false
            }
        });
    }

    process_running = false;
});

client.on('ready', (client) => console.log(client.user.tag));

client.login(process.env.TOKEN);

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
