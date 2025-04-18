
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChainIcon } from '@/components/ui/ChainIcon';
import { getTokenByAddress } from '@/data/mockTokens';
import { useState, useEffect } from 'react';
import { IToken } from '@/types/token';
import { ChevronLeft, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import TokenActions from '@/components/tokens/TokenActions';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const TokenDetail = () => {
  const { address } = useParams<{ address: string }>();
  const [token, setToken] = useState<IToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to get token details
    const fetchToken = async () => {
      setIsLoading(true);
      try {
        // For demo, we're using mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundToken = address ? getTokenByAddress(address) : null;
        
        if (foundToken) {
          setToken(foundToken);
        } else {
          toast.error("Token not found");
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        toast.error("Failed to load token details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchToken();
  }, [address]);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const getBlockExplorerLink = (token: IToken) => {
    switch (token.chain) {
      case 'ethereum':
        return `https://etherscan.io/token/${token.address}`;
      case 'bsc':
        return `https://bscscan.com/token/${token.address}`;
      case 'solana':
        return `https://solscan.io/token/${token.address}`;
      case 'base':
        return `https://basescan.org/token/${token.address}`;
      case 'arbitrum':
        return `https://arbiscan.io/token/${token.address}`;
      default:
        return '#';
    }
  };

  const getChainName = (chain: string) => {
    switch (chain) {
      case 'ethereum':
        return 'Ethereum';
      case 'bsc':
        return 'Binance Smart Chain';
      case 'solana':
        return 'Solana';
      case 'base':
        return 'Base';
      case 'arbitrum':
        return 'Arbitrum';
      default:
        return chain;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 w-40 bg-muted rounded mb-4"></div>
          <div className="h-12 w-64 bg-muted rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Token Not Found</h1>
        <p className="mb-8 text-muted-foreground">The token you're looking for doesn't exist or you don't have permission to view it.</p>
        <Button asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const formattedTotalSupply = parseFloat(token.totalSupply) / 10**token.decimals;
  const formattedBalance = token.balance ? parseFloat(token.balance) / 10**token.decimals : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center">
          <ChevronLeft size={18} className="mr-1" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="flex items-center">
          {token.logo ? (
            <img
              src={token.logo}
              alt={token.symbol}
              className="h-16 w-16 mr-4 rounded-full"
            />
          ) : (
            <div className="h-16 w-16 mr-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
              {token.symbol.substring(0, 2).toUpperCase()}
            </div>
          )}
          
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl font-bold mr-2">{token.name}</h1>
              <ChainIcon chain={token.chain} size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg text-muted-foreground">{token.symbol}</p>
              <Badge variant="outline" className="text-xs">
                {getChainName(token.chain)}
              </Badge>
              {token.hasMintAuthority === false && (
                <Badge className="bg-yellow-600">No mint authority</Badge>
              )}
              {token.isFrozen && (
                <Badge className="bg-blue-600">Frozen</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Token Information</CardTitle>
            <CardDescription>Basic details about this token</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Contract Address</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm truncate">{token.address}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => copyToClipboard(token.address, "Address copied to clipboard")}
                >
                  <Copy size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => window.open(getBlockExplorerLink(token), '_blank')}
                >
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Decimals</p>
                <p>{token.decimals}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p>{formatDistanceToNow(token.createdAt, { addSuffix: true })}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Supply</p>
                <p>{formattedTotalSupply.toLocaleString()} {token.symbol}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Balance</p>
                <p>{formattedBalance ? formattedBalance.toLocaleString() : 0} {token.symbol}</p>
              </div>
            </div>

            {token.metadata && (
              <div>
                <p className="text-sm text-muted-foreground">Metadata</p>
                <div className="mt-1 p-3 bg-muted/50 rounded-md">
                  <p className="text-sm">{token.metadata.description || "No description"}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Actions</CardTitle>
            <CardDescription>Operations you can perform on this token</CardDescription>
          </CardHeader>
          <CardContent>
            <TokenActions token={token} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenDetail;
