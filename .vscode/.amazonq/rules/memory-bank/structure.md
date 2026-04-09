# Project Structure & Architecture

## Directory Organization

```
workspace/
├── AI-Travel-Planner/          # Main full-stack application
│   ├── server.js               # Express backend server
│   ├── package.json            # Node.js dependencies and metadata
│   ├── package-lock.json       # Locked dependency versions
│   ├── .env                    # Environment variables (API keys)
│   ├── README.md               # Project documentation
│   └── public/                 # Frontend static files
│       ├── index.html          # Main HTML interface
│       ├── script.js           # Frontend JavaScript logic
│       └── style.css           # Styling and layout
├── Largest.c                   # Standalone C program (array operations)
└── tasks.json                  # VS Code task configuration
```

## Core Components

### Backend (server.js)
- Express.js HTTP server running on port 3000
- `/generate-trip` POST endpoint for itinerary generation
- Integrates with Google Gemini API
- CORS middleware for cross-origin requests
- Environment variable management via dotenv

### Frontend (public/)
- **index.html**: Form interface for user input (destination, duration, budget, interests)
- **script.js**: Client-side logic for form submission and API communication
- **style.css**: Modern gradient design with responsive layout

### Configuration
- **package.json**: Defines dependencies (Express, CORS, dotenv) and start script
- **.env**: Stores sensitive API keys (Gemini API key)
- **tasks.json**: VS Code task definitions

## Architectural Patterns

### Client-Server Architecture
- Frontend communicates with backend via HTTP POST requests
- Backend processes requests and calls external Gemini API
- Responses returned as formatted JSON

### API Integration Pattern
- Backend acts as proxy between frontend and Gemini API
- Structured prompts sent to Gemini for consistent output
- Response formatting for frontend consumption

### Separation of Concerns
- Frontend handles UI/UX and user input
- Backend manages API integration and business logic
- Environment variables isolate configuration from code

## Component Relationships

```
User Browser
    ↓
Frontend (HTML/CSS/JS)
    ↓
Express Server (server.js)
    ↓
Google Gemini API
    ↓
Formatted Itinerary Response
```
