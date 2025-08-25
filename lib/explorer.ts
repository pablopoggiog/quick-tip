import { avalanche, avalancheFuji } from "wagmi/chains";

export function getExplorerUrl(hash: string, chainId: number): string {
  switch (chainId) {
    case avalanche.id:
      return `https://snowtrace.io/tx/${hash}`;
    case avalancheFuji.id:
      return `https://testnet.snowtrace.io/tx/${hash}`;
    default:
      return `https://snowtrace.io/tx/${hash}`;
  }
}
