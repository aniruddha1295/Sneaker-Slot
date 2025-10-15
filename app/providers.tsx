"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
filecoinCalibration
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from "wagmi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const config = getDefaultConfig({
  appName: "Filecoin Starter Kit",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "58260584-0da0-4195-b86e-2736034f8961",
  chains: [
    filecoinCalibration
  ],
  ssr: true,
  transports: {
    [filecoinCalibration.id]: http(),
  },
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={filecoinCalibration}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
