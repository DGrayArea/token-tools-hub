
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { ChainType } from '@/types/token';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
  currentChain: ChainType | null;
  balance: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchChain: (chain: ChainType) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const chainIdMap: Record<string, ChainType> = {
  '0x1': 'ethereum',
  '0x38': 'bsc',
  '0x2105': 'base',
  '0xa4b1': 'arbitrum',
};

const chainTypeToId: Record<ChainType, string> = {
  'ethereum': '0x1',
  'bsc': '0x38',
  'solana': 'solana',
  'base': '0x2105',
  'arbitrum': '0xa4b1',
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [currentChain, setCurrentChain] = useState<ChainType | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  // Check if window.ethereum is available
  const hasMetaMask = typeof window !== 'undefined' && window.ethereum;

  // Mock connection for demo purposes
  const connectWallet = async () => {
    if (!hasMetaMask) {
      toast.error("MetaMask not detected! Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      setAddress(accounts[0]);
      setChainId(chainId);
      setCurrentChain(chainIdMap[chainId] || null);
      setIsConnected(true);
      
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setChainId(null);
    setCurrentChain(null);
    setBalance(null);
    toast.info("Wallet disconnected");
  };

  const switchChain = async (chain: ChainType) => {
    // Solana needs separate handling
    if (chain === 'solana') {
      toast.info("Switching to Solana requires a Solana wallet");
      return;
    }
    
    if (!hasMetaMask || !isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainTypeToId[chain] }],
      });
      
      // The chainChanged event handler will update the state
    } catch (error: any) {
      if (error.code === 4902) {
        toast.error(`${chain} network needs to be added to your wallet`);
      } else {
        toast.error(`Failed to switch to ${chain}`);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (hasMetaMask) {
      // Initial check
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            window.ethereum
              .request({ method: 'eth_chainId' })
              .then((chainId: string) => {
                setAddress(accounts[0]);
                setChainId(chainId);
                setCurrentChain(chainIdMap[chainId] || null);
                setIsConnected(true);
              });
          }
        })
        .catch(console.error);

      // Setup event listeners
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(chainId);
        setCurrentChain(chainIdMap[chainId] || null);
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [hasMetaMask]);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        chainId,
        currentChain,
        balance,
        connectWallet,
        disconnectWallet,
        switchChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
