import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
const Pego = {
  id: 123456,
  name: "Pego Testnet",
  network: "Pego",
  nativeCurrency: {
    decimals: 18,
    name: "Pego",
    symbol: "PG",
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.pegotest.net"],
    },
    default: {
      http: ["https://rpc.pegotest.net"],
    },
  },
  blockExplorers: {
    default: { name: "pegoscan", url: "https://scan.pegotest.net/" },
  },
};
const { chains, publicClient } = configureChains([Pego], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "PegoCall",
  projectId: "e80ea3e2c168b8cce2a31011beed0cb9",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#271E5D",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
