
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChainSelector from '@/components/tokens/ChainSelector';
import TokenGrid from '@/components/tokens/TokenGrid';
import CreateTokenModal from '@/components/modals/CreateTokenModal';
import { ChainType, IToken, TokenCreationParams } from '@/types/token';
import { getTokensForChain, mockTokens } from '@/data/mockTokens';
import { useWallet } from '@/context/WalletContext';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { isConnected, currentChain } = useWallet();
  const [selectedChain, setSelectedChain] = useState<ChainType>(currentChain || 'ethereum');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tokens, setTokens] = useState<IToken[]>(mockTokens);

  const filteredTokens = getTokensForChain(selectedChain);

  const handleCreateToken = (tokenData: TokenCreationParams) => {
    // In a real app, this would make an API call to create the token
    const newToken: IToken = {
      id: Date.now().toString(),
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      chain: tokenData.chain,
      name: tokenData.name,
      symbol: tokenData.symbol,
      decimals: tokenData.decimals,
      totalSupply: (parseFloat(tokenData.totalSupply) * 10 ** tokenData.decimals).toString(),
      balance: (parseFloat(tokenData.totalSupply) * 10 ** tokenData.decimals).toString(),
      createdAt: Date.now(),
      logo: tokenData.logo,
      isOwner: true,
      hasMintAuthority: true,
    };

    setTokens((prev) => [...prev, newToken]);
    setSelectedChain(tokenData.chain);
  };

  const onChainSelect = (chain: ChainType) => {
    setSelectedChain(chain);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Tokens</h1>
          <p className="text-muted-foreground">
            Manage your tokens across multiple blockchains
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {isConnected ? (
            <Button 
              onClick={() => setIsCreateModalOpen(true)} 
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            >
              <PlusCircle size={18} />
              Create Token
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => toast.info("Please connect your wallet first")}
            >
              Connect Wallet to Create
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <ChainSelector selectedChain={selectedChain} onSelectChain={onChainSelect} />
      </div>

      <TokenGrid tokens={filteredTokens} />

      <CreateTokenModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateToken} 
      />
    </div>
  );
};

export default Dashboard;
