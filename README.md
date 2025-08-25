# Quick Tip - Avalanche

A modern, sleek web application for sending quick tips on the Avalanche network using wagmi v2. Features a beautiful dark UI with glassmorphism effects and smooth animations.

## ✨ Features

- 🔗 **Smart Wallet Connection** - Compact widget with hover dropdown on mobile
- 💰 **Multi-Recipient Support** - Choose from popular addresses or add custom ones
- 🔍 **Transaction Simulation** - Test transactions before sending
- ⏱️ **Real-time Finality Timer** - Accurate measurement from submission to confirmation
- 📊 **Transaction History** - Local storage with explorer links
- 🌐 **Network Switching** - Toggle between Avalanche Mainnet and Fuji Testnet
- 🎨 **Modern Dark UI** - Glassmorphism effects with purple/pink branding
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🔔 **Toast Notifications** - Smooth, dynamic feedback for all states
- 💾 **Persistent Storage** - Tips history saved locally

## 🎯 Core Functionality

### **Smart Wallet Integration**
- **Compact Connect Widget** - Square icon on mobile, full layout on desktop
- **Hover Dropdown** - Full functionality even in compact mode
- **Network Switching** - Single toggle button between Mainnet/Fuji
- **Hydration Safe** - No SSR/client mismatch issues

### **Enhanced Tip Sending**
- **Recipient Selection** - Pre-configured popular addresses with avatars
- **Custom Addresses** - Add any recipient address
- **Transaction Simulation** - Validate before sending
- **Real-time Feedback** - Loading states and progress indicators
- **Accurate Timing** - Measures actual blockchain finality

### **Beautiful User Experience**
- **Dark Theme** - Purple/pink gradient branding
- **Glassmorphism Effects** - Backdrop blur and transparency
- **Smooth Animations** - Hover effects and transitions
- **Toast Notifications** - Positioned overlay with custom styling
- **Responsive Layout** - Adapts perfectly to all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Web3**: wagmi v2 + viem
- **State Management**: Zustand with localStorage persistence
- **Styling**: Tailwind CSS v4
- **Data Fetching**: @tanstack/react-query
- **Notifications**: react-hot-toast
- **Fonts**: Geist (Sans + Mono)

## 📦 Dependencies

### **Core Dependencies**
- `next` - React framework
- `react` & `react-dom` - UI library
- `wagmi` - React hooks for Ethereum
- `viem` - TypeScript interface for Ethereum
- `@tanstack/react-query` - Data fetching and caching
- `zustand` - State management
- `react-hot-toast` - Toast notifications

### **Development Dependencies**
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `eslint` - Code linting
- `@types/*` - TypeScript definitions

## 🚀 Setup

1. **Clone and install**:
   ```bash
   git clone <repository-url>
   cd quick-tip
   npm install
   ```

2. **Environment variables**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_RECIPIENT=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### **Connecting Wallet**
1. Click the wallet icon in the top-right corner
2. Approve the connection in your wallet
3. Use the hover dropdown (mobile) or buttons (desktop) to switch networks

### **Sending Tips**
1. **Select Recipient** - Choose from popular addresses or enter custom one
2. **Enter Amount** - Specify AVAX amount (minimum 0.001)
3. **Add Note** - Optional message (stored locally)
4. **Test Transaction** - Click "Test Transaction" to simulate
5. **Send Tip** - Click "Send Tip" and approve in wallet
6. **Wait for Confirmation** - See real-time progress and finality time

### **Viewing History**
- **Recent Tips** - Automatically updated after each transaction
- **Explorer Links** - Click transaction hash to view on Snowtrace
- **Clear History** - Use "Clear All" button to reset

## 🌐 Supported Networks

- **Avalanche Mainnet** (Chain ID: 43114)
  - Explorer: [https://snowtrace.io](https://snowtrace.io)
- **Avalanche Fuji Testnet** (Chain ID: 43113)
  - Explorer: [https://testnet.snowtrace.io](https://testnet.snowtrace.io)

## 📁 Project Structure

```
quick-tip/
├── app/
│   ├── layout.tsx          # Root layout with providers & toaster
│   ├── page.tsx            # Main page component
│   └── providers.tsx       # Wagmi & React Query providers
├── components/
│   ├── Connect.tsx         # Smart wallet connection widget
│   ├── TipForm.tsx         # Multi-recipient tip form
│   └── RecentTips.tsx      # Transaction history display
├── lib/
│   ├── wagmi.ts            # Wagmi configuration
│   ├── explorer.ts         # Explorer URL utilities
│   └── recipients.ts       # Recipient addresses & categories
└── store/
    └── tips.ts             # Zustand store with persistence
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Purple to Pink gradients (`from-purple-600 to-pink-600`)
- **Background**: Dark slate with transparency (`bg-slate-800/50`)
- **Borders**: Subtle slate borders (`border-slate-700/50`)
- **Text**: White and slate variants for hierarchy

### **Components**
- **Glassmorphism Cards** - Backdrop blur with transparency
- **Gradient Buttons** - Purple/pink with hover effects
- **Toast Notifications** - Custom styled with animations
- **Responsive Widgets** - Adapt to screen size

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Key Features**
- **Type Safety** - Full TypeScript coverage
- **ESLint** - Code quality enforcement
- **Hot Reload** - Instant development feedback
- **Optimized Build** - Production-ready output

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own applications!

---

Built with ❤️ for the Avalanche ecosystem
