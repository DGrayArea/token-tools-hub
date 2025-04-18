
export type ChainType = 'ethereum' | 'bsc' | 'solana' | 'base' | 'arbitrum';

export interface IToken {
  id: string;
  address: string;
  chain: ChainType;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  balance?: string;
  createdAt: number;
  logo?: string;
  isOwner: boolean;
  hasMintAuthority?: boolean;
  isFrozen?: boolean; // Solana specific
  metadata?: {
    name?: string;
    symbol?: string;
    description?: string;
    image?: string;
  }; // Solana specific
}

export interface TokenCreationParams {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  chain: ChainType;
  logo?: string;
}
