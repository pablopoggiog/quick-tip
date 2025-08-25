"use client";
import { RECIPIENTS, Recipient } from "@/lib/recipients";
import { useTipsStore } from "@/store/tips";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import {
  useAccount,
  usePublicClient,
  useSendTransaction,
  useWaitForTransactionReceipt
} from "wagmi";

const DEFAULT_RECIPIENT = RECIPIENTS[0];

export default function TipForm() {
  const { address, chainId } = useAccount();
  const publicClient = usePublicClient();
  const {
    sendTransaction,
    isPending: isSending,
    data: hash
  } = useSendTransaction();
  const { data: receipt, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState("");
  const [simulationError, setSimulationError] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [finalityTime, setFinalityTime] = useState<number | null>(null);
  const [hashSubmissionTime, setHashSubmissionTime] = useState<number | null>(
    null
  );
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] =
    useState<Recipient>(DEFAULT_RECIPIENT);
  const [customAddress, setCustomAddress] = useState("");
  const [showRecipientSelector, setShowRecipientSelector] = useState(false);

  const { addTip } = useTipsStore();

  const currentRecipientAddress = selectedRecipient.address;

  // Update preview when amount or recipient changes
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      setPreview(`Send ${amount} AVAX to ${selectedRecipient.name}`);
    } else {
      setPreview("");
    }
  }, [amount, selectedRecipient]);

  // Track when hash is received (actual submission time)
  useEffect(() => {
    if (hash && !hashSubmissionTime) {
      setHashSubmissionTime(Date.now());
    }
  }, [hash]);

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && receipt && hashSubmissionTime) {
      const finalityMs = Date.now() - hashSubmissionTime;
      setFinalityTime(finalityMs);

      // Dismiss loading toast
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        setLoadingToastId(null);
      }

      // Add to recent tips
      addTip({
        hash: receipt.transactionHash,
        amount,
        note,
        finalityMs,
        timestamp: Date.now(),
        chainId: chainId!
      });

      // Show success toast
      toast.success(
        <div>
          <div className="font-semibold">Tip sent successfully! 🎉</div>
          <div className="text-sm opacity-90">
            {amount} AVAX to {selectedRecipient.name}
          </div>
          <div className="text-xs opacity-75">
            Finality: {(finalityMs / 1000).toFixed(2)}s
          </div>
        </div>,
        {
          duration: 5000,
          icon: "💰"
        }
      );

      // Reset form
      setAmount("");
      setNote("");
      setHashSubmissionTime(null);
      setFinalityTime(null);
    }
  }, [
    isConfirmed,
    receipt,
    hashSubmissionTime,
    amount,
    note,
    chainId,
    addTip,
    selectedRecipient,
    loadingToastId
  ]);

  const simulateTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0 || !address || !publicClient) {
      toast.error("Please enter a valid amount first");
      return;
    }

    setIsSimulating(true);
    setSimulationError("");

    const loadingToast = toast.loading("Simulating transaction...");

    try {
      await publicClient.call({
        account: address,
        to: currentRecipientAddress as `0x${string}`,
        value: parseEther(amount)
      });

      toast.dismiss(loadingToast);
      toast.success("Simulation successful! Transaction is ready to send.");
      setSimulationError("");
    } catch (error: unknown) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error instanceof Error ? error.message : "Simulation failed";
      setSimulationError(errorMessage);
      toast.error(`Simulation failed: ${errorMessage}`);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleSend = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setFinalityTime(null);

    // Show loading toast that stays until confirmation
    const loadingToast = toast.loading(
      <div>
        <div className="font-semibold">Transaction submitted! ⏳</div>
        <div className="text-sm opacity-90">Waiting for confirmation...</div>
      </div>,
      { duration: Infinity }
    );

    sendTransaction({
      to: currentRecipientAddress as `0x${string}`,
      value: parseEther(amount)
    });

    // Store the loading toast ID to dismiss it later
    setLoadingToastId(loadingToast);
  };

  const handleCustomAddress = () => {
    if (customAddress && customAddress.length === 42) {
      setSelectedRecipient({
        address: customAddress,
        name: "Custom Address",
        description: "Custom recipient address",
        category: "custom"
      });
      setShowRecipientSelector(false);
      toast.success("Custom address set!");
    } else {
      toast.error("Please enter a valid Ethereum address");
    }
  };

  const isValidAmount = amount && parseFloat(amount) > 0;
  const canSend = isValidAmount && !isSending;

  return (
    <div className="flex flex-col gap-6 p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Send Tip</h2>
      </div>

      {/* Recipient Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300">
          Recipient
        </label>

        <div className="relative">
          <button
            onClick={() => setShowRecipientSelector(!showRecipientSelector)}
            className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-left hover:bg-slate-700/70 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {selectedRecipient.avatar || "👤"}
              </span>
              <div className="flex-1">
                <p className="text-white font-medium">
                  {selectedRecipient.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {selectedRecipient.description}
                </p>
                <p className="text-slate-500 text-xs font-mono">
                  {selectedRecipient.address.slice(0, 6)}...
                  {selectedRecipient.address.slice(-4)}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {showRecipientSelector && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl z-10 max-h-64 overflow-y-auto">
              {RECIPIENTS.map((recipient) => (
                <button
                  key={recipient.address}
                  onClick={() => {
                    setSelectedRecipient(recipient);
                    setShowRecipientSelector(false);
                  }}
                  className="w-full p-3 hover:bg-slate-700/50 transition-colors duration-200 border-b border-slate-700 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{recipient.avatar || "👤"}</span>
                    <div className="text-left">
                      <p className="text-white font-medium">{recipient.name}</p>
                      <p className="text-slate-400 text-sm">
                        {recipient.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}

              {/* Custom Address Input */}
              <div className="p-3 border-t border-slate-700">
                <p className="text-slate-300 text-sm mb-2">
                  Or enter custom address:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="0x..."
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400"
                  />
                  <button
                    onClick={handleCustomAddress}
                    className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 text-sm font-medium transition-all duration-200"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Amount (AVAX)
          </label>
          <input
            id="amount"
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
            placeholder="0.001"
          />
        </div>

        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Note (optional)
          </label>
          <input
            id="note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
            placeholder="Thanks for the help!"
          />
        </div>
      </div>

      {preview && (
        <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-xl">
          <p className="text-sm text-slate-300 font-medium mb-1">Preview:</p>
          <p className="text-white">{preview}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={simulateTransaction}
          disabled={!isValidAmount || isSimulating}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200"
        >
          {isSimulating ? "Simulating..." : "Test Transaction"}
        </button>

        <button
          onClick={handleSend}
          disabled={!canSend}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200"
        >
          {isSending ? "Sending..." : "Send Tip"}
        </button>
      </div>

      {simulationError && (
        <div className="p-4 bg-red-900/30 border border-red-600/50 rounded-xl">
          <p className="text-sm text-red-300 font-medium mb-1">
            Simulation Error:
          </p>
          <p className="text-red-200">{simulationError}</p>
        </div>
      )}

      {isSending && (
        <div className="p-4 bg-blue-900/30 border border-blue-600/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="text-sm text-blue-300 font-medium">
                Transaction submitted!
              </p>
              <p className="text-blue-200 text-sm">
                Waiting for confirmation...
              </p>
              <p className="text-blue-300 text-xs mt-1">
                This usually takes 5-10 seconds
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
