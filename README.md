# Currency Converter

A simple currency conversion tool built with React + TypeScript.

**Live Demo:** https://tds-assignment.vercel.app

## Prerequisites

- Node.js 22.x

## Setup

```bash
npm install
```

Create `.env` file:

```
VITE_CURRENCY_BEACON_API_KEY=your_api_key_here
```

Get your API key at https://currencybeacon.com/

## Run

```bash
npm run dev
```

The app will be available at http://localhost:5173

## E2E Tests (Playwright)

Install Playwright (once):

```bash
npm i -D @playwright/test
npx playwright install
```

Run E2E tests:

```bash
npm run test:e2e
```

## Features

- Select currencies from/to via dropdowns
- Input amount and get converted value

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
