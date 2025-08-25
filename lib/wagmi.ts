import { createConfig, http } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// NOTE: wagmi v2 expects a `transports` map keyed by chain id.
export const config = createConfig({
  chains: [avalanche, avalancheFuji],
  connectors: [injected()],
  transports: {
    [avalanche.id]: http(),
    [avalancheFuji.id]: http()
  },
  multiInjectedProviderDiscovery: true
});
