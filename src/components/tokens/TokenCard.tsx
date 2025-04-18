
import { formatDistanceToNow } from 'date-fns';
import { ChainIcon } from '@/components/ui/ChainIcon';
import { IToken } from '@/types/token';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface TokenCardProps {
  token: IToken;
}

const TokenCard = ({ token }: TokenCardProps) => {
  return (
    <Link to={`/token/${token.address}`} className="block">
      <Card className="gradient-card bg-card h-full p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {token.logo ? (
              <img 
                src={token.logo} 
                alt={token.symbol} 
                className="h-8 w-8 mr-2 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 mr-2 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {token.symbol.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-bold">{token.name}</h3>
              <p className="text-sm text-muted-foreground">{token.symbol}</p>
            </div>
          </div>
          <ChainIcon chain={token.chain} />
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Total Supply</p>
            <p className="font-medium">
              {parseFloat(token.totalSupply) / 10**token.decimals} {token.symbol}
            </p>
          </div>
          
          {token.balance && (
            <div>
              <p className="text-xs text-muted-foreground">Your Balance</p>
              <p className="font-medium">
                {parseFloat(token.balance) / 10**token.decimals} {token.symbol}
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            Created {formatDistanceToNow(token.createdAt, { addSuffix: true })}
          </Badge>
          
          {token.hasMintAuthority === false && (
            <Badge className="bg-yellow-600">No mint authority</Badge>
          )}
          
          {token.isFrozen && (
            <Badge className="bg-blue-600">Frozen</Badge>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default TokenCard;
