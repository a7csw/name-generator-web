# API Specification for NameCraft Backend

This document outlines the API endpoints that the NameCraft frontend expects from the backend.

## Base URL
- **Development**: `http://localhost:3001/api`
- **Production**: Environment variable `REACT_APP_API_URL`

## Authentication
Currently, no authentication is required. All endpoints are public.

## CORS Configuration
Enable CORS for the frontend origin:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Endpoints

### 1. Generate Names
Generate names based on user preferences.

**Endpoint:** `POST /api/generate-names`

**Request Body:**
```json
{
  "gender": "male|female|unisex",
  "culture": "arabic|islamic|asian|western|jewish|african|global|latin|north-american|european|slavic|scandinavian|oceanic|korean|japanese",
  "count": 1-10,
  "feeling": "unique|strong|beautiful|wise|peaceful|brave|gentle|mysterious|joyful|noble|creative|adventurous|loving|spiritual|modern"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "names": [
    {
      "name": "Ahmad",
      "meaning": "Most commendable, most praiseworthy",
      "origin": "Arabic",
      "feeling": "noble"
    },
    {
      "name": "Fatima",
      "meaning": "Daughter of the Prophet, pure and chaste",
      "origin": "Arabic",
      "feeling": "spiritual"
    }
  ]
}
```

**Response (Error - 400/500):**
```json
{
  "success": false,
  "error": "Invalid parameters",
  "message": "Gender must be one of: male, female, unisex"
}
```

### 2. Get Available Cultures
Get list of available cultural origins.

**Endpoint:** `GET /api/cultures`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    "arabic",
    "islamic", 
    "asian",
    "western",
    "jewish",
    "african",
    "global",
    "latin",
    "north-american",
    "european",
    "slavic",
    "scandinavian",
    "oceanic",
    "korean",
    "japanese"
  ]
}
```

### 3. Get Available Genders
Get list of available gender options.

**Endpoint:** `GET /api/genders`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": ["male", "female", "unisex"]
}
```

### 4. Get Available Feelings
Get list of available name feelings/emotions.

**Endpoint:** `GET /api/feelings`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    "unique",
    "strong",
    "beautiful",
    "wise",
    "peaceful",
    "brave",
    "gentle",
    "mysterious",
    "joyful",
    "noble",
    "creative",
    "adventurous",
    "loving",
    "spiritual",
    "modern"
  ]
}
```

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": "ERROR_TYPE",
  "message": "Human-readable error message"
}
```

### Common Error Types
- `VALIDATION_ERROR` - Invalid input parameters
- `NOT_FOUND` - Resource not found
- `INTERNAL_ERROR` - Server error
- `RATE_LIMIT` - Too many requests

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Validation Rules

### Generate Names Endpoint
- `gender`: Must be one of ["male", "female", "unisex"]
- `culture`: Must be one of the available cultures
- `count`: Must be integer between 1 and 10
- `feeling`: Must be one of the available feelings

## AI Integration Guidelines

### Name Generation Logic
1. **Cultural Authenticity**: Ensure names are culturally appropriate and authentic
2. **Meaning Accuracy**: Provide accurate meanings and origins
3. **Gender Appropriateness**: Respect cultural gender norms
4. **Feeling Alignment**: Match the requested emotional quality
5. **Diversity**: Provide variety in name styles and origins

### AI API Integration
- Integrate with your preferred AI service (OpenAI, Anthropic, etc.)
- Use prompts that respect cultural sensitivity
- Implement rate limiting and error handling
- Cache responses for performance
- Validate AI-generated content before returning

### Example AI Prompt Structure
```
Generate {count} {gender} names from {culture} culture that convey a {feeling} feeling.
Each name should be authentic to the culture and include:
- The name itself
- Accurate meaning
- Cultural origin
- Emotional quality

Return as JSON array with fields: name, meaning, origin, feeling
```

## Testing

### Test Cases
1. **Valid requests** with all parameters
2. **Invalid parameters** (test validation)
3. **Edge cases** (count = 1, count = 10)
4. **Error scenarios** (AI service down, rate limits)
5. **CORS** from frontend origin

### Sample Test Requests
```bash
# Valid request
curl -X POST http://localhost:3001/api/generate-names \
  -H "Content-Type: application/json" \
  -d '{"gender":"male","culture":"arabic","count":3,"feeling":"noble"}'

# Invalid request
curl -X POST http://localhost:3001/api/generate-names \
  -H "Content-Type: application/json" \
  -d '{"gender":"invalid","culture":"arabic","count":15,"feeling":"noble"}'
```

## Performance Considerations

### Response Time
- Target: < 2 seconds for name generation
- Use caching for repeated requests
- Implement request queuing if needed

### Rate Limiting
- Implement rate limiting per IP
- Suggested: 10 requests per minute per IP
- Return 429 status for exceeded limits

### Caching Strategy
- Cache common name combinations
- Cache culture/feeling lists
- Use Redis or similar for distributed caching

## Security Considerations

### Input Validation
- Sanitize all input parameters
- Validate against allowed values
- Prevent injection attacks

### Rate Limiting
- Implement per-IP rate limiting
- Monitor for abuse patterns
- Log suspicious activity

### Error Handling
- Don't expose internal errors to clients
- Log errors for debugging
- Return generic error messages

## Deployment Notes

### Environment Variables
```bash
PORT=3001
NODE_ENV=production
AI_API_KEY=your_ai_api_key
AI_API_URL=your_ai_service_url
CORS_ORIGIN=http://localhost:3000
```

### Health Check Endpoint
Consider adding a health check endpoint:
```http
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

---

**Note**: This specification is designed to work seamlessly with the NameCraft frontend. Any changes to the API structure should be coordinated with the frontend team. 