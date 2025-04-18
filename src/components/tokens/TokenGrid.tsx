
import { IToken } from '@/types/token';
import TokenCard from './TokenCard';

interface TokenGridProps {
  tokens: IToken[];
  isLoading?: boolean;
}

const TokenGrid = ({ tokens, isLoading }: TokenGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-48 rounded-lg bg-muted animate-pulse-slow"></div>
        ))}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-10 w-10 text-muted-foreground"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-medium mb-2">No tokens found</h2>
        <p className="text-muted-foreground text-center max-w-md">
          You haven't created any tokens on this chain yet. Use the "+" button to create a new token.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {tokens.map((token) => (
        <TokenCard key={token.id} token={token} />
      ))}
    </div>
  );
};

export default TokenGrid;
