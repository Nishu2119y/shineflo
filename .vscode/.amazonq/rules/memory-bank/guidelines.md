# Development Guidelines & Patterns

## Code Quality Standards

### JavaScript Conventions
- **Variable Naming**: camelCase for variables and functions (e.g., `destination`, `tripPlanDiv`, `generateTrip`)
- **Constants**: Uppercase with underscores for configuration values (e.g., `PORT`)
- **Async/Await**: Preferred over callbacks for asynchronous operations
- **Error Handling**: Try-catch blocks for async operations with meaningful error messages
- **Console Logging**: Used for debugging and status tracking (e.g., `console.log()`, `console.error()`)

### HTML Structure
- **Semantic Elements**: Proper use of `<header>`, `<form>`, `<div>` with meaningful IDs
- **Accessibility**: Form labels linked to inputs, meta viewport for responsiveness
- **ID Naming**: Descriptive IDs using camelCase (e.g., `travelForm`, `formSection`, `resultSection`)
- **Data Attributes**: Form inputs use standard HTML5 attributes (required, type, placeholder)

### CSS Styling
- **Gradient Backgrounds**: Modern gradient design (e.g., `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- **Responsive Design**: Mobile-first approach with viewport meta tag
- **Transitions**: Smooth animations for interactive elements (e.g., `transition: border-color 0.3s`)
- **Box Model**: Consistent use of padding, margin, and border-radius for spacing
- **Color Scheme**: Purple gradient theme (#667eea, #764ba2) with white containers

## Structural Conventions

### Backend Architecture (server.js)
- **Middleware Stack**: CORS → JSON parsing → Static file serving
- **Single Endpoint Pattern**: One main POST endpoint (`/generate-trip`) for core functionality
- **Request Validation**: Destructuring request body for required fields
- **API Integration**: Direct fetch calls to external APIs with proper headers
- **Error Responses**: Consistent JSON error format with status codes
- **Logging**: Console logs for debugging API calls and responses

### Frontend Architecture (script.js)
- **Event-Driven**: Form submission triggers async API call
- **DOM Manipulation**: Direct element selection and style toggling
- **State Management**: Simple visibility toggling (display: none/block)
- **Error Handling**: User-facing alerts for error messages
- **Function Organization**: Separate functions for form submission and reset

### Configuration Pattern
- **Environment Variables**: Sensitive data (API keys) stored in .env file
- **dotenv Integration**: `require('dotenv').config()` at application start
- **Port Configuration**: Centralized PORT constant in server.js

## Semantic Patterns & Implementation Approaches

### API Communication Pattern
```javascript
// Frontend: Fetch with JSON body
const response = await fetch('http://localhost:3001/generate-trip', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ destination, days, budget, interests })
});

// Backend: Receive and forward to external API
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contents: [...], generationConfig: {...} })
});
```

### Form Handling Pattern
- Prevent default form submission with `e.preventDefault()`
- Extract form values using `document.getElementById()`
- Toggle UI sections (form → loading → results)
- Reset form state with `form.reset()` and visibility toggles

### Error Handling Pattern
- Backend: Check response status and data structure before processing
- Frontend: Catch errors and display user-friendly alert messages
- Logging: Console logs for server-side debugging

### Prompt Engineering Pattern
- Structured prompts with clear requirements
- Template literals for dynamic content injection
- Specific formatting instructions for consistent output
- Generation config parameters (temperature, maxOutputTokens)

## Frequently Used Code Idioms

### DOM Element Selection & Caching
```javascript
const form = document.getElementById('travelForm');
const formSection = document.getElementById('formSection');
const loading = document.getElementById('loading');
```
Elements are selected once and reused throughout the application.

### Conditional Display Toggling
```javascript
formSection.style.display = 'none';
loading.style.display = 'block';
resultSection.style.display = 'block';
```
UI state managed through CSS display property manipulation.

### Destructuring Assignment
```javascript
const { destination, days, budget, interests } = req.body;
```
Used for extracting multiple values from objects in both frontend and backend.

### Async/Await with Error Handling
```javascript
try {
  const response = await fetch(...);
  const data = await response.json();
  // Process data
} catch (error) {
  console.error('Error:', error);
  // Handle error
}
```

### Response Validation
```javascript
if (!response.ok) {
  return res.status(500).json({ error: 'API request failed' });
}
if (!data.candidates || !data.candidates[0]) {
  return res.status(500).json({ error: 'Invalid API response' });
}
```

## Best Practices Observed

- **Separation of Concerns**: Frontend handles UI, backend handles API integration
- **Consistent Error Messages**: Both frontend and backend provide descriptive error information
- **Responsive Design**: CSS media queries and flexible layouts
- **Security**: API keys stored in environment variables, not hardcoded
- **User Feedback**: Loading states and error alerts for user experience
- **Code Readability**: Meaningful variable names and clear function purposes
- **Modular Structure**: Separate files for HTML, CSS, JavaScript, and backend logic
