# Quick Tip - Avalanche

A simple web application for sending quick tips on the Avalanche network using wagmi v2.

## Features

- 🔗 Connect/disconnect wallet (Core Wallet / EIP-1193)
- 💰 Send tips in AVAX with optional notes
- 🔍 Preview and simulate transactions before sending
- ⏱️ Real-time finality timer
- 📊 Recent tips history with explorer links
- 🌐 Support for Avalanche Mainnet and Fuji Testnet
- 💾 Local storage for tip history

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Web3**: wagmi v2 + viem
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Data Fetching**: @tanstack/react-query

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_RECIPIENT=0x742d35Cc6634C0532925aApp3b8D4C9db96C4b4d8b6
   ```
   Replace with your actual recipient address.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection in your wallet
2. **Switch Network**: Use the Mainnet/Fuji buttons to switch between networks
3. **Send Tip**: 
   - Enter the amount in AVAX
   - Add an optional note
   - Click "Simulate" to test the transaction
   - Click "Send Tip" to execute the transaction
4. **View History**: Check the "Recent Tips" section to see your transaction history

## Configuration

### Supported Networks
- **Avalanche Mainnet** (Chain ID: 43114)
- **Avalanche Fuji Testnet** (Chain ID: 43113)

### Explorer Links
- Mainnet: [https://snowtrace.io](https://snowtrace.io)
- Fuji Testnet: [https://testnet.snowtrace.io](https://testnet.snowtrace.io)

## Project Structure

```
quick-tip/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page component
│   └── providers.tsx       # Wagmi and React Query providers
├── components/
│   ├── Connect.tsx         # Wallet connection component
│   ├── TipForm.tsx         # Tip sending form
│   └── RecentTips.tsx      # Recent tips history
├── lib/
│   ├── wagmi.ts            # Wagmi configuration
│   └── explorer.ts         # Explorer URL utilities
└── store/
    └── tips.ts             # Zustand store for tips
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Dependencies

- `wagmi` - React hooks for Ethereum
- `viem` - TypeScript interface for Ethereum
- `@tanstack/react-query` - Data fetching and caching
- `zustand` - State management
- `tailwindcss` - Utility-first CSS framework

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT
