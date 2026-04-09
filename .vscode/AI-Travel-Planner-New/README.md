# 🌍 AI Travel Planner

A modern, full-stack web application that generates personalized travel itineraries using Google's Gemini AI.

## ✨ Features

- 🤖 **AI-Powered Planning**: Uses Google Gemini Pro for intelligent itinerary generation
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 📱 **Mobile Friendly**: Works perfectly on all devices
- ⚡ **Real-time Generation**: Get your itinerary in seconds
- 💰 **Budget-Aware**: Plans based on your budget constraints
- 🎯 **Interest-Based**: Customized recommendations based on your preferences

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd AI-Travel-Planner-New
npm install
```

### 2. Configure API Key
Your Gemini API key is already configured in the `.env` file:
```
GEMINI_API_KEY=AIzaSyALsaA5aNp-jvrK2T4yFn8AsfRB8bL7HZ8
```

### 3. Start the Server
```bash
npm start
```
or
```bash
node server.js
```

### 4. Open Your Browser
Navigate to: **http://localhost:3000**

## 🎮 How to Use

1. **Fill the Form**:
   - 🌍 **Destination**: Enter your dream destination (e.g., "Tokyo", "Paris")
   - 📅 **Days**: Number of days for your trip (1-30)
   - 💰 **Budget**: Your budget (e.g., "$2000", "₹50000", "€1500")
   - 🎯 **Interests**: What you love (e.g., "food, culture, adventure")

2. **Generate Trip**: Click the "Generate Trip" button

3. **Get Your Itinerary**: AI will create a detailed plan including:
   - Day-wise activities
   - Transport suggestions
   - Hotel recommendations
   - Packing tips
   - Local attractions
   - Shopping areas
   - Food recommendations
   - Budget breakdown

## 📁 Project Structure

```
AI-Travel-Planner-New/
├── server.js          # Express backend server
├── package.json       # Dependencies and scripts
├── .env              # API key configuration
├── README.md         # This file
└── public/           # Frontend files
    ├── index.html    # Main HTML page
    ├── style.css     # Styling and animations
    └── script.js     # Frontend JavaScript
```

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript (ES6+)**: Interactive functionality

### AI Integration
- **Google Gemini Pro**: AI model for content generation
- **REST API**: Communication with Gemini service

## 🔧 API Endpoints

### POST `/generate-trip`
Generates a travel itinerary based on user input.

**Request Body:**
```json
{
  "destination": "Paris",
  "days": 5,
  "budget": "$2000",
  "interests": "food, culture, art"
}
```

**Response:**
```json
{
  "tripPlan": "Detailed AI-generated itinerary..."
}
```

## 🎨 Features Explained

### Frontend Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: CSS animations for better UX
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Input validation before submission

### Backend Features
- **CORS Enabled**: Allows cross-origin requests
- **Error Handling**: Comprehensive error catching and logging
- **Environment Variables**: Secure API key storage
- **JSON Responses**: Structured API responses

### AI Integration
- **Smart Prompting**: Detailed prompts for better AI responses
- **Response Validation**: Checks AI response structure
- **Error Recovery**: Handles API failures gracefully

## 🔍 Troubleshooting

### Common Issues

1. **"Port already in use" error**
   - Kill existing Node processes: `taskkill /F /IM node.exe` (Windows)
   - Or change PORT in server.js to a different number

2. **"API request failed" error**
   - Verify your API key in `.env` file
   - Check internet connection
   - Ensure Gemini API is accessible

3. **"Server not running" error**
   - Make sure you ran `node server.js`
   - Check if server is running on http://localhost:3000

4. **Form not submitting**
   - Fill all required fields
   - Check browser console for JavaScript errors

## 🚀 Future Enhancements

- 💾 Save itineraries to local storage
- 📧 Email itinerary feature
- 🗺️ Map integration
- 🌤️ Weather information
- 💱 Currency conversion
- 📱 Progressive Web App (PWA)
- 🔐 User authentication
- 📊 Trip analytics

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Traveling! ✈️🌍**