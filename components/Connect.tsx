"use client";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export default function Connect() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected, chainId } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 p-2 lg:gap-3 lg:p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-slate-700 rounded-full animate-pulse"></div>
        <div className="w-16 h-3 lg:w-20 lg:h-4 bg-slate-700 rounded animate-pulse"></div>
      </div>
    );
  }

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center w-12 h-12 lg:w-auto lg:h-auto lg:gap-3 lg:p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg
            className="w-3 h-3 lg:w-4 lg:h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="hidden lg:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 text-sm"
        >
          {isConnecting ? "Connecting..." : "Connect"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-12 h-12 lg:w-auto lg:h-auto lg:gap-3 lg:p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg group relative">
      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
        <svg
          className="w-3 h-3 lg:w-4 lg:h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Mobile dropdown menu */}
      <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 lg:hidden">
        <div className="p-3 space-y-2">
          <div className="text-center">
            <p className="font-mono text-white text-sm">
              {formatAddress(address!)}
            </p>
            <p className="text-slate-400 text-xs">
              {chainId === avalanche.id
                ? "Mainnet"
                : chainId === avalancheFuji.id
                ? "Fuji"
                : `Chain ${chainId}`}
            </p>
          </div>

          <div className="border-t border-slate-700 pt-2">
            <button
              onClick={() =>
                handleSwitchChain(
                  chainId === avalanche.id ? avalancheFuji.id : avalanche.id
                )
              }
              disabled={isSwitching}
              className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 text-sm"
            >
              {isSwitching
                ? "Switching..."
                : `Switch to ${chainId === avalanche.id ? "Fuji" : "Mainnet"}`}
            </button>
          </div>

          <div className="border-t border-slate-700 pt-2">
            <button
              onClick={() => disconnect()}
              className="w-full px-3 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 font-medium transition-all duration-200 text-sm"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex lg:flex-col">
        <p className="font-mono text-white text-sm">
          {formatAddress(address!)}
        </p>
        <p className="text-slate-400 text-xs">
          {chainId === avalanche.id
            ? "Mainnet"
            : chainId === avalancheFuji.id
            ? "Fuji"
            : `Chain ${chainId}`}
        </p>
      </div>

      <div className="hidden lg:flex lg:gap-2">
        <button
          onClick={() =>
            handleSwitchChain(
              chainId === avalanche.id ? avalancheFuji.id : avalanche.id
            )
          }
          disabled={isSwitching}
          className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded text-xs hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200"
          title={`Switch to ${chainId === avalanche.id ? "Fuji" : "Mainnet"}`}
        >
          {isSwitching
            ? "Switching..."
            : chainId === avalanche.id
            ? "Fuji"
            : "Mainnet"}
        </button>
      </div>

      <button
        onClick={() => disconnect()}
        className="hidden lg:block px-2 py-1 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded text-xs hover:from-red-700 hover:to-pink-700 font-medium transition-all duration-200"
        title="Disconnect"
      >
        ×
      </button>
    </div>
  );
}
