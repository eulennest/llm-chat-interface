# LLM Chat Interface

Simple web-based chat interface for OpenAI-compatible LLM APIs.

## Features

- 🎨 Clean, dark-mode UI
- 🔌 Works with any OpenAI-compatible API (llama.cpp, vLLM, OpenRouter, etc.)
- 💾 Saves API URL & model selection in localStorage
- ⚙️ Configurable parameters (max tokens, temperature)
- 📱 Responsive design

## Quick Start

### Option 1: Direct HTML (no build step)

1. Download `index.html`
2. Open in a web browser
3. Enter your API base URL (e.g., `http://localhost:8080/v1`)
4. Click "Modelle laden" to fetch available models
5. Start chatting!

### Option 2: Deploy with Nginx

```bash
# Copy to web root
sudo cp index.html /var/www/llm-chat/

# Create Nginx config
sudo tee /etc/nginx/sites-available/llm-chat-ui > /dev/null <<EOF
server {
    listen 8082;
    
    root /var/www/llm-chat;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ =404;
        
        # CORS headers for API access
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
    }
}
EOF

# Enable and restart
sudo ln -s /etc/nginx/sites-available/llm-chat-ui /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

Access at: `http://your-server:8082`

## Configuration

The interface supports:

- **API Base URL**: OpenAI-compatible endpoint (e.g., `http://192.168.200.46:8080/v1`)
- **Model Selection**: Dynamically loads available models via `/v1/models`
- **Max Tokens**: Response length limit (1-32000)
- **Temperature**: Sampling randomness (0-2, default 0.7)

## Compatible APIs

Works with:
- llama.cpp server (`--port 8080`)
- vLLM (`--api-key optional`)
- OpenRouter
- Local Ollama (with OpenAI compatibility)
- Any service that implements OpenAI's `/v1/chat/completions` + `/v1/models`

## Development

Pure HTML/CSS/JS - no build tools required. Just edit `index.html` and refresh.

## License

MIT

## Author

Built for personal LLM deployment. Part of the [eulennest](https://github.com/eulennest) project.
