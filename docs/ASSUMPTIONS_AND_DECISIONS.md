# Assumptions & Decisions

## Tech Stack

- **React + TypeScript + Vite** - Fast setup, type safety
- **TanStack Query** - Handles API caching and loading states
- **Tailwind CSS** - Rapid styling

## Architecture

- `api/` - API fetch functions
- `components/` - UI components
- `hooks/` - Custom React hooks wrapping API calls
- `lib/` - Shared utilities (React Query client)
- `types/` - TypeScript interfaces for API responses

## Assumptions

1. **Currencies don't change often** - Cached for 5 minutes
2. **Conversion triggers automatically** - When all inputs are valid
