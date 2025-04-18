
import { ChainType, IToken } from '@/types/token';

// Mock tokens for demonstration
export const mockTokens: IToken[] = [
  {
    id: '1',
    address: '0x1234567890123456789012345678901234567890',
    chain: 'ethereum',
    name: 'Demo Token',
    symbol: 'DEMO',
    decimals: 18,
    totalSupply: '1000000000000000000000000',
    balance: '5000000000000000000000',
    createdAt: Date.now() - 1000000,
    isOwner: true,
    hasMintAuthority: true,
  },
  {
    id: '2',
    address: '0x2345678901234567890123456789012345678901',
    chain: 'bsc',
    name: 'Pancake Token',
    symbol: 'CAKE',
    decimals: 18,
    totalSupply: '5000000000000000000000000',
    balance: '2500000000000000000000',
    createdAt: Date.now() - 2000000,
    isOwner: true,
    hasMintAuthority: false,
  },
  {
    id: '3',
    address: 'So1ana12345Token67890AddressExample123455789',
    chain: 'solana',
    name: 'Solana Example',
    symbol: 'SOL',
    decimals: 9,
    totalSupply: '100000000000',
    balance: '50000000000',
    createdAt: Date.now() - 3000000,
    isOwner: true,
    hasMintAuthority: true,
    isFrozen: false,
    metadata: {
      name: 'Solana Example',
      symbol: 'SOL',
      description: 'An example Solana token',
      image: 'https://example.com/image.png',
    },
  },
  {
    id: '4',
    address: '0x3456789012345678901234567890123456789012',
    chain: 'base',
    name: 'Base Chain Token',
    symbol: 'BASE',
    decimals: 18,
    totalSupply: '10000000000000000000000',
    balance: '1000000000000000000000',
    createdAt: Date.now() - 4000000,
    isOwner: true,
    hasMintAuthority: true,
  },
  {
    id: '5',
    address: '0x4567890123456789012345678901234567890123',
    chain: 'arbitrum',
    name: 'Arbitrum Token',
    symbol: 'ARB',
    decimals: 18,
    totalSupply: '1000000000000000000000000',
    balance: '750000000000000000000',
    createdAt: Date.now() - 5000000,
    isOwner: true,
    hasMintAuthority: true,
  },
];

export const getTokensForChain = (chain: ChainType | null): IToken[] => {
  if (!chain) return [];
  return mockTokens.filter(token => token.chain === chain);
};

export const getTokenByAddress = (address: string): IToken | undefined => {
  return mockTokens.find(token => token.address === address);
};
