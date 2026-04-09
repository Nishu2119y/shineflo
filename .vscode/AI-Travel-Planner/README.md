# AI Travel Planner

A full-stack web application that generates personalized travel itineraries using AI.

## Features

- Modern, responsive UI
- AI-powered trip planning using Google Gemini
- Day-wise itinerary generation
- Transport, hotel, and shopping recommendations
- Budget-based planning

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key (it's free)
3. Copy the API key

### 3. Configure Environment

Open the `.env` file and replace `your_gemini_api_key_here` with your actual API key:

```
GEMINI_API_KEY=your_actual_api_key
```

### 4. Run the Server

```bash
node server.js
```

### 5. Open in Browser

Navigate to: `http://localhost:3000`

## How It Works

### Backend (server.js)
- Express server runs on port 3000
- `/generate-trip` endpoint accepts POST requests
- Sends user input to Gemini AI API
- Returns formatted travel itinerary

### Frontend (public/)
- **index.html**: Form for user input
- **style.css**: Modern gradient design
- **script.js**: Handles form submission and API calls

### API Integration
- Uses Google Gemini Pro (free tier)
- Sends structured prompts for detailed itineraries
- Returns comprehensive travel plans

## Project Structure

```
AI-Travel-Planner/
├── server.js          # Express backend
├── package.json       # Dependencies
├── .env              # API key (keep secret)
├── README.md         # Documentation
└── public/
    ├── index.html    # Frontend UI
    ├── style.css     # Styling
    └── script.js     # Frontend logic
```

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **Other**: CORS, dotenv

## Troubleshooting

- **Port already in use**: Change PORT in server.js
- **API key error**: Verify your Gemini API key in .env
- **CORS error**: Ensure CORS is enabled in server.js

## Future Enhancements

- Save itineraries to database
- User authentication
- Export to PDF
- Map integration
- Weather information
