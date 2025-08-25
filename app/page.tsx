import Connect from "@/components/Connect";
import RecentTips from "@/components/RecentTips";
import TipForm from "@/components/TipForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Connect Widget - Top Right */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
          <Connect />
        </div>

        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Quick Tip
          </h1>
          <p className="text-slate-300 text-lg">
            Send lightning-fast tips on Avalanche
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <TipForm />
          </div>
          <div>
            <RecentTips />
          </div>
        </div>
      </div>
    </div>
  );
}
