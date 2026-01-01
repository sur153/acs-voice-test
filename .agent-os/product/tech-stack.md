# Technical Stack

## Application Framework
- **Backend Framework**: Python 3.12+ with Quart (async Flask)
- **Package Manager**: uv (fast Python dependency management)
- **Containerization**: Docker

## Azure Services
- **Azure Communication Services (ACS)**: PSTN phone call handling
- **Azure Voice Live API**: Real-time voice processing
- **Azure OpenAI**: GPT-4o-mini for conversation intelligence
- **Azure Speech Services**: ASR (Speech-to-Text) and TTS (Text-to-Speech)
- **Azure Functions**: Orchestration layer (planned)
- **Azure Container Apps**: Voice agent hosting (production)
- **Azure Key Vault**: Secrets management
- **Azure Search**: RAG service vector store
- **Azure Cosmos DB**: Session state and response storage
- **Azure Event Grid**: Real-time audio event triggers
- **Azure Container Registry**: CI/CD deployment

## Voice Configuration
- **Voice Model**: en-IN-AartiNeural (Azure standard)
- **Audio Format**: PCM 24kHz Mono
- **VAD Type**: Azure Semantic VAD with filler word removal
- **Noise Reduction**: Azure Deep Noise Suppression
- **Echo Cancellation**: Server-side echo cancellation

## Development Tools
- **IDE**: VS Code / Cursor
- **Version Control**: Git / GitHub
- **CI/CD**: GitHub Actions
- **Local Testing**: Azure DevTunnels for webhook testing

## Data Storage
- **Questionnaire Data**: JSON format
- **Session State**: In-memory (POC) / Cosmos DB (production)
- **Audio Streaming**: WebSocket bidirectional

## Frontend (Web Client)
- **Framework**: Vanilla HTML/CSS/JavaScript
- **Audio Processing**: Web Audio API with AudioWorklet
- **Communication**: WebSocket (wss://)

## Environment Configuration
Required environment variables:
- AZURE_VOICE_LIVE_API_KEY
- AZURE_VOICE_LIVE_ENDPOINT
- VOICE_LIVE_MODEL
- ACS_CONNECTION_STRING
- ACS_DEV_TUNNEL (local testing only)
- AZURE_SEARCH_ENDPOINT
- AZURE_SEARCH_INDEX_NAME
- AZURE_SEARCH_API_KEY
- AZURE_VOICELIVE_PROJECT_NAME
- AZURE_VOICELIVE_AGENT_ID
- AZURE_VOICELIVE_AGENT_NAME
