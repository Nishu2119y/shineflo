const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/generate-trip', async (req, res) => {
  const { destination, days, budget, interests } = req.body;

  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination} with a budget of ${budget}. 
  Interests: ${interests}.
  
  Please include:
  - Day-wise itinerary with specific activities
  - Transport suggestions (flights, local transport)
  - Clothes to carry based on weather and activities
  - Hotel recommendations with price ranges
  - Local places to visit with descriptions
  - Markets and shopping areas
  - Food recommendations
  - Budget breakdown
  
  Format the response clearly with headings and bullet points.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return res.status(500).json({ 
        error: `API Error: ${errorData.error?.message || 'Unknown error'}` 
      });
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response structure:', data);
      return res.status(500).json({ 
        error: 'Invalid response from AI service' 
      });
    }

    const tripPlan = data.candidates[0].content.parts[0].text;
    res.json({ tripPlan });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to generate trip plan. Please check your API key and try again.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Travel Planner server running on http://localhost:${PORT}`);
  console.log('📝 Make sure to add your GEMINI_API_KEY to the .env file');
});