# FundMe - Decentralized Funding Platform

FundMe is a modern, decentralized funding platform built with React, TypeScript, Vite, and Tailwind CSS. It allows users to fund innovative projects securely on the Ethereum Sepolia testnet.

## Features
- Connect your Ethereum wallet
- View contract statistics and funding progress
- Fund projects and track your contributions
- Owner panel for project management
- Beautiful, responsive UI with charts and modals

## Tech Stack
- React + TypeScript
- Vite (frontend tooling)
- Tailwind CSS (styling)
- wagmi & viem (Ethereum wallet integration)
- Chart.js & Recharts (visualizations)

## Getting Started
1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Start the development server:
   ```sh
   pnpm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure
- `src/` - Main frontend source code
  - `components/` - UI components
  - `pages/` - App pages (Home, Not Found, etc.)
  - `lib/` - Utility libraries (wagmi, queryClient, etc.)
  - `hooks/` - Custom React hooks
  - `utils/` - Helper functions

## Customization
- Update contract addresses and logic in `src/lib/wagmi.ts` and related files.
- Style and theme via `src/index.css` and `tailwind.config.ts`.

## License
MIT
