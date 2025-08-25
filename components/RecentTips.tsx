"use client";
import { getExplorerUrl } from "@/lib/explorer";
import { useTipsStore } from "@/store/tips";
import { avalanche, avalancheFuji } from "wagmi/chains";

export default function RecentTips() {
  const { tips, clearTips } = useTipsStore();

  const formatAddress = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case avalanche.id:
        return "Mainnet";
      case avalancheFuji.id:
        return "Fuji";
      default:
        return `Chain ${chainId}`;
    }
  };

  if (tips.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Recent Tips</h2>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">No tips sent yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Your transaction history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Recent Tips</h2>
        </div>
        <button
          onClick={clearTips}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium transition-all duration-200 text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold">{tip.amount} AVAX</p>
                  <p className="text-slate-400 text-sm">
                    {tip.note || "No note"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    tip.chainId === avalanche.id
                      ? "bg-green-900/50 text-green-300 border border-green-600/50"
                      : "bg-orange-900/50 text-orange-300 border border-orange-600/50"
                  }`}
                >
                  {getChainName(tip.chainId)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <a
                href={getExplorerUrl(tip.hash, tip.chainId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-mono transition-colors duration-200"
              >
                {formatAddress(tip.hash)}
              </a>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-900/50 text-blue-300 border border-blue-600/50 rounded text-xs font-medium">
                  {(tip.finalityMs / 1000).toFixed(2)}s
                </span>
                <span className="text-slate-500 text-xs">
                  {formatTimestamp(tip.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
