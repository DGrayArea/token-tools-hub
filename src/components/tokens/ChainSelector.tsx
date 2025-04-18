
import { ChainType } from '@/types/token';
import { ChainIcon } from '@/components/ui/ChainIcon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWallet } from '@/context/WalletContext';

interface ChainSelectorProps {
  selectedChain: ChainType;
  onSelectChain: (chain: ChainType) => void;
}

const chains: { value: ChainType; label: string }[] = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'bsc', label: 'BSC' },
  { value: 'solana', label: 'Solana' },
  { value: 'base', label: 'Base' },
  { value: 'arbitrum', label: 'Arbitrum' },
];

const ChainSelector = ({ selectedChain, onSelectChain }: ChainSelectorProps) => {
  const { currentChain, switchChain } = useWallet();

  const handleChainChange = (chain: ChainType) => {
    onSelectChain(chain);
    if (chain !== currentChain && chain !== 'solana') {
      switchChain(chain);
    }
  };

  return (
    <Tabs value={selectedChain} onValueChange={(value) => handleChainChange(value as ChainType)} className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
        {chains.map((chain) => (
          <TabsTrigger
            key={chain.value}
            value={chain.value}
            className="flex items-center gap-2 px-4 py-2"
          >
            <ChainIcon chain={chain.value} size="sm" />
            <span>{chain.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ChainSelector;
