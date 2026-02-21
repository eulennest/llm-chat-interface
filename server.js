const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3100;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Proxy endpoint for LLM API calls
app.post('/api/chat', async (req, res) => {
  try {
    const { url, body, headers, method = 'POST' } = req.body;
    
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    // Only add body for POST/PUT/PATCH
    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      options.body = JSON.stringify(body);
    }
    
    // Server-side fetch (no CORS restrictions)
    const response = await fetch(url, options);
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`LLM Chat Interface running on port ${PORT}`);
});
