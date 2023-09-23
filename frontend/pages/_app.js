import '@rainbow-me/rainbowkit/styles.css';
import '@/styles/globals.css';
import Layout from '@/components/Layout/Layout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
const Calibration = {
  id: 314159,
  name: 'Filecoin Calibration',
  network: 'Filecoin',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: {
      http: ['https://rpc.ankr.com/filecoin_testnet'],
    },
    default: {
      http: ['https://rpc.ankr.com/filecoin_testnet'],
    },
  },
  blockExplorers: {
    default: { name: 'Filfox', url: 'https://calibration.filfox.info/en' },
  },
};
const { chains, publicClient } = configureChains(
  [Calibration],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'FVMCall',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId='260356816232-qm10ch3k345h9jh2uhh7ma71f3m00pvo.apps.googleusercontent.com'>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: '#271E5D',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </GoogleOAuthProvider>
  );
}
