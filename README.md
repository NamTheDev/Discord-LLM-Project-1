# DC+LLM Project 1

![Discord AI Assistant Bot](https://img.shields.io/badge/Discord-AI%20Assistant%20Bot-blue.svg)
![GitHub](https://img.shields.io/github/license/yourusername/discord-ai-assistant-bot.svg)

DC+LLM Project 1 is a feature-rich Discord bot built with [Discord.js](https://discord.js.org/) that leverages the power of the [Ollama](https://ollama.com/) AI model to provide interactive and intelligent functionalities. Whether you want to engage in conversations with an AI, analyze documents, execute and generate code, scrape websites, or perform advanced searches, this bot has you covered.

## Table of Contents

- [Features](#features)
- [Commands](#commands)
  - [/chat](#chat)
  - [/doc](#doc)
  - [/eval](#eval)
  - [/scrape](#scrape)
  - [/search](#search)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Interactive AI Conversations**: Engage in real-time conversations with the Ollama AI model.
- **Document Analysis**: Ask questions about specific documents and receive insightful answers.
- **Code Execution and Generation**: Translate, execute, and generate code snippets across various programming languages.
- **Web Scraping**: Scrape websites and analyze the scraped data using AI.
- **Advanced Search**: Perform Google Custom Searches and analyze the results with AI.
- **Autocomplete Suggestions**: Get dynamic suggestions for document names during interactions.
- **Rate Limiting**: Prevent abuse by limiting the number of command usages per user.
- **Error Handling**: Robust error handling to ensure smooth user experience.
- **Syntax Highlighting**: Automatic detection and formatting of code snippets based on language.

## Commands

### `/chat`

Engage in a conversation with the Ollama AI model.

- **Description**: Allows users to have an interactive chat session with the AI.
- **Options**:
  - `message` *(String, Required)*: The message you want to send to the AI.

**Example Usage**:
```
/chat message: Hello, how are you today?
```

### `/doc`

Ask questions about a specific document.

- **Description**: Allows users to query information related to a particular document.
- **Options**:
  - `question` *(String, Required)*: Your question regarding the document.
  - `document` *(String, Required)*: The name of the document you want to inquire about. Autocomplete suggestions are available based on available documents.

**Example Usage**:
```
/doc question: What is the main topic of this document? document: Project_Plan.pdf
```

### `/eval`

Translate, execute, and generate code snippets in various programming languages.

- **Description**: Provides functionalities to translate code from different languages to JavaScript, execute it, and generate new code based on prompts.
- **Subcommands**:
  - `execute`
    - **Description**: Translate provided code to JavaScript and execute it.
    - **Options**:
      - `code` *(String, Required)*: The code you want to execute (in any supported language).
  - `generate`
    - **Description**: Generate JavaScript code from a prompt and execute it.
    - **Options**:
      - `prompt` *(String, Required)*: The prompt based on which you want to generate code.

**Example Usage**:
```
/eval execute code:
def add_numbers(a, b):
    return a + b

print(add_numbers(3, 4))
```

```
/eval generate prompt: Create a function that multiplies two numbers and returns the result.
```

### `/scrape`

Scrape a website and analyze its content using the Ollama AI model.

- **Description**: Allows users to scrape the HTML content of a specified website and perform analysis on the scraped data.
- **Options**:
  - `url` *(String, Required)*: The URL of the website you want to scrape.
  - `prompt` *(String, Optional)*: A specific prompt to guide the AI in analyzing the scraped data.

**Example Usage**:
```
/scrape url: https://example.com prompt: Summarize the main content of this webpage.
```

### `/search`

Perform a Google Custom Search and analyze the results with the Ollama AI model.

- **Description**: Enables users to search the web using Google Custom Search Engine and receive AI-analyzed insights based on the search results.
- **Options**:
  - `query` *(String, Required)*: The search query you want to perform.
  - `prompt` *(String, Optional)*: A specific prompt to guide the AI in analyzing the search results.

**Example Usage**:
```
/search query: Best programming languages in 2024 prompt: Provide a summary of the top programming languages based on these search results.
```

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/discord-ai-assistant-bot.git
   cd discord-ai-assistant-bot
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the required packages:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your Discord bot token and other necessary configurations:
   ```env
   DISCORD_TOKEN=your-discord-bot-token
   CLIENT_ID=your-discord-client-id
   GUILD_ID=your-discord-guild-id
   OLLAMA_API_KEY=your-ollama-api-key
   ```

4. **Deploy Commands**:
   Deploy your slash commands to Discord:
   ```bash
   node deploy-commands.js
   ```

5. **Start the Bot**:
   ```bash
   node index.js
   ```

## Configuration

- **Ollama Integration**:
  - Ensure you have access to the Ollama API and have set the `OLLAMA_API_KEY` in your `.env` file.
  - Adjust the `settings` object within your commands to tailor the AI's behavior as needed.

- **Documents Directory**:
  - Place your documents in the `../documents` directory relative to the `doc.js` file. Ensure the bot has read access to this directory.

- **Puppeteer Configuration**:
  - The `scrape.js` command utilizes Puppeteer for web scraping. Ensure Puppeteer is correctly installed and configured in your environment.

## Usage

Once the bot is up and running, you can use the following commands within your Discord server:

### **Chat with AI**

Engage in a conversation with the AI:
```
/chat message: Your message here
```

### **Document Analysis**

Ask questions about a specific document:
```
/doc question: Your question here document: Document_Name.pdf
```

### **Code Evaluation**

Translate and execute code:
```
/eval execute code: 
Your code here
```

Generate and execute code based on a prompt:
```
/eval generate prompt: Your prompt here
```

### **Web Scraping**

Scrape a website and analyze its content:
```
/scrape url: https://example.com prompt: Your analysis prompt here
```

### **Advanced Search**

Perform a Google Custom Search and get AI-analyzed results:
```
/search query: Your search query here prompt: Your analysis prompt here
```

## Testing

To ensure the bot functions correctly, perform the following test cases:

### **1. Executing Simple JavaScript Code**
```
/eval execute code: 
const message = "Hello, JavaScript!";
module.exports = message;
```

### **2. Executing Python Code That Returns a String**
```
/eval execute code: 
def greet():
    return "Hello from Python!"

print(greet())
```

### **3. Executing JavaScript Code That Exports an Object**
```
/eval execute code: 
const user = {
    name: "Alice",
    age: 30,
    profession: "Engineer"
};
module.exports = user;
```

### **4. Executing Python Code That Returns a List**
```
/eval execute code: 
def get_numbers():
    return [1, 2, 3, 4, 5]

print(get_numbers())
```

### **5. Executing JavaScript Code with a Function Expression**
```
/eval execute code: 
const multiply = function(a, b) {
    return a * b;
};
module.exports = multiply(6, 7);
```

### **6. Executing Python Code with a Loop**
```
/eval execute code: 
def sum_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_list([10, 20, 30, 40]))
```

### **7. Executing JavaScript Code That Exports an Array**
```
/eval execute code: 
const fruits = ["Apple", "Banana", "Cherry"];
module.exports = fruits;
```

### **8. Executing Python Code That Raises an Exception**
```
/eval execute code: 
def faulty_function():
    raise ValueError("This is a test error.")

faulty_function()
```

### **9. Executing JavaScript Code Attempting to Access the Filesystem**
```
/eval execute code: 
const fs = require('fs');
module.exports = fs.readFileSync('/etc/passwd', 'utf-8');
```

### **10. Generating and Executing JavaScript Code to Reverse a String**
```
/eval generate prompt: Create a function that reverses a given string and returns the result.
```

## Contributing

Contributions are welcome! Please follow these steps to contribute to the project:

1. **Fork the Repository**:
   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/yourusername/discord-ai-assistant-bot.git
   cd discord-ai-assistant-bot
   ```

3. **Create a New Branch**:
   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes**:
   Implement your feature or bug fix.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Add feature: YourFeatureName"
   ```

6. **Push to Your Fork**:
   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Create a Pull Request**:
   Navigate to the original repository and click "New Pull Request". Describe your changes and submit.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Discord.js](https://discord.js.org/) - Official Discord API library for Node.js
- [Ollama](https://ollama.com/) - AI model powering the chatbot functionalities
- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless Chrome Node.js API used for web scraping
- [vm2](https://github.com/patriksimek/vm2) - Secure sandbox for executing untrusted code
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js

---

**Note**: Replace placeholders like `yourusername`, `your-discord-bot-token`, `your-discord-client-id`, `your-discord-guild-id`, and `your-ollama-api-key` with your actual information.

For any issues or feature requests, please open an issue on [GitHub Issues](https://github.com/yourusername/discord-ai-assistant-bot/issues).

Happy Coding!