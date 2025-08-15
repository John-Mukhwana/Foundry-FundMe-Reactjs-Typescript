# FundMe - Decentralized Funding Platform

FundMe is a modern, decentralized funding platform built with React, TypeScript, Vite, and Tailwind CSS. It allows users to fund innovative projects securely on the Ethereum Sepolia testnet.

---
![FundeMe Frontend](./public/photo1.png)

----

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

## Environment Variables

To run this project, you need to create a `.env` file in the root directory with the following variables:

```
VITE_ALCHEMY_KEY=your-alchemy-key
VITE_REOWN_PROJECT_ID=your-reown-project-id
VITE_SEPOLIA_RPC_URL=https://sepolia.rpc.thirdweb.com
```

**Descriptions:**
- `VITE_ALCHEMY_KEY`: Your Alchemy API key for accessing Ethereum Sepolia nodes (used for backend scripts or advanced features).
- `VITE_REOWN_PROJECT_ID`: Your Reown AppKit project ID for wallet connection and modal integration.
- `VITE_SEPOLIA_RPC_URL`: The Sepolia RPC endpoint for frontend contract interactions. Use a CORS-enabled public RPC like Thirdweb.

Make sure to keep your keys secure and never commit your `.env` file to public repositories.

## License
MIT
