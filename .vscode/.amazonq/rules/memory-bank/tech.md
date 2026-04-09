# Technology Stack & Development

## Programming Languages
- **JavaScript**: Frontend (ES6+) and backend (Node.js)
- **HTML5**: Markup for user interface
- **CSS3**: Styling and responsive design
- **C**: Standalone utility program (Largest.c)

## Runtime & Framework Versions
- **Node.js**: Runtime for backend server
- **Express.js**: ^4.18.2 - Web framework for HTTP server
- **CORS**: ^2.8.5 - Cross-Origin Resource Sharing middleware
- **dotenv**: ^16.3.1 - Environment variable management

## External APIs & Services
- **Google Gemini API**: AI model for itinerary generation (free tier)
- **Google AI Studio**: API key management portal

## Build & Execution

### Installation
```bash
npm install
```

### Development Commands
```bash
npm start          # Runs: node server.js
node server.js     # Direct server execution
```

### Server Configuration
- **Port**: 3000 (default)
- **Environment**: Requires GEMINI_API_KEY in .env file
- **CORS**: Enabled for cross-origin requests

## Development Setup

### Prerequisites
1. Node.js installed on system
2. Google Gemini API key (free from Google AI Studio)
3. .env file with GEMINI_API_KEY configured

### Initial Setup Steps
1. Clone/navigate to AI-Travel-Planner directory
2. Run `npm install` to install dependencies
3. Create/configure .env file with API key
4. Run `npm start` to launch server
5. Access application at http://localhost:3000

## Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | HTTP server framework |
| cors | ^2.8.5 | Enable cross-origin requests |
| dotenv | ^16.3.1 | Load environment variables |

## File Execution
- **server.js**: Node.js executable (entry point)
- **script.js**: Browser-executed JavaScript
- **Largest.c**: Standalone C program (compile with gcc)
