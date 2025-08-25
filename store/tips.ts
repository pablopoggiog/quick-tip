import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tip {
  hash: string;
  amount: string;
  note: string;
  finalityMs: number;
  timestamp: number;
  chainId: number;
}

interface TipsStore {
  tips: Tip[];
  addTip: (tip: Tip) => void;
  clearTips: () => void;
}

export const useTipsStore = create<TipsStore>()(
  persist(
    (set) => ({
      tips: [],
      addTip: (tip) =>
        set((state) => ({
          tips: [tip, ...state.tips.slice(0, 9)] // Keep only last 10 tips
        })),
      clearTips: () => set({ tips: [] })
    }),
    {
      name: "quick-tip-tips"
    }
  )
);
