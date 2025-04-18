
import { useTheme } from '@/context/ThemeContext';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="w-full p-4 backdrop-blur-sm bg-background/50 dark:bg-background/50 border-b flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          TokenTools
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        {isConnected ? (
          <Button
            variant="outline"
            className="font-medium"
            onClick={disconnectWallet}
          >
            {formatAddress(address || '')}
          </Button>
        ) : (
          <Button onClick={connectWallet} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
