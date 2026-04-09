const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/generate-trip', async (req, res) => {
  const { destination, days, budget, interests } = req.body;

  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination} with a budget of ${budget}. 
  Interests: ${interests}.
  
  Include:
  - Day-wise itinerary with activities
  - Transport suggestions
  - Clothes to carry
  - Hotel recommendations
  - Local places to visit
  - Markets for shopping
  
  Format the response in a clear, structured way.`;

  try {
    console.log('Sending request to Gemini API...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data);
      return res.status(500).json({ error: data.error?.message || 'API request failed' });
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response:', data);
      return res.status(500).json({ error: 'Invalid API response' });
    }

    const tripPlan = data.candidates[0].content.parts[0].text;
    res.json({ tripPlan });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
