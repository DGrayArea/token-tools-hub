
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IToken } from '@/types/token';
import { toast } from 'sonner';
import { ArrowDownToLine, ArrowUpToLine, Flame, Landmark, Truck } from 'lucide-react';

interface TokenActionsProps {
  token: IToken;
}

type ActionType = 'transfer' | 'burn' | 'mint' | 'swap' | 'airdrop' | 'freeze' | 'revoke' | 'updateMetadata';

const TokenActions = ({ token }: TokenActionsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metadataDescription, setMetadataDescription] = useState(token.metadata?.description || '');
  const [metadataImage, setMetadataImage] = useState(token.metadata?.image || '');

  const handleActionClick = (action: ActionType) => {
    setCurrentAction(action);
    setIsDialogOpen(true);
    setAmount('');
    setRecipient('');
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentAction(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      switch (currentAction) {
        case 'transfer':
          toast.success(`Successfully transferred ${amount} ${token.symbol} to ${recipient}`);
          break;
        case 'burn':
          toast.success(`Successfully burned ${amount} ${token.symbol}`);
          break;
        case 'mint':
          toast.success(`Successfully minted ${amount} ${token.symbol}`);
          break;
        case 'swap':
          toast.success(`Successfully swapped ${amount} ${token.symbol}`);
          break;
        case 'airdrop':
          toast.success(`Successfully airdropped ${token.symbol} to ${recipient}`);
          break;
        case 'freeze':
          toast.success(`Successfully toggled freeze status for ${token.symbol}`);
          break;
        case 'revoke':
          toast.success(`Successfully revoked authority for ${token.symbol}`);
          break;
        case 'updateMetadata':
          toast.success(`Successfully updated metadata for ${token.symbol}`);
          break;
      }

      handleDialogClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Transaction failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderDialogContent = () => {
    switch (currentAction) {
      case 'transfer':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Transfer Tokens</DialogTitle>
              <DialogDescription>
                Send {token.symbol} tokens to another address.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient" className="text-right">
                  Recipient
                </Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      case 'burn':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Burn Tokens</DialogTitle>
              <DialogDescription>
                Permanently destroy {token.symbol} tokens, reducing the total supply.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      case 'mint':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Mint Tokens</DialogTitle>
              <DialogDescription>
                Create new {token.symbol} tokens, increasing the total supply.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient" className="text-right">
                  Recipient
                </Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x... (leave empty for yourself)"
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      case 'swap':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Swap Tokens</DialogTitle>
              <DialogDescription>
                Swap {token.symbol} tokens for another token.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-center my-2">
                <div className="bg-muted rounded-full p-2">
                  <ArrowDownToLine size={18} />
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  Swap functionality is simulated for this demo.
                </p>
              </div>
            </div>
          </>
        );
      case 'airdrop':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Airdrop Tokens</DialogTitle>
              <DialogDescription>
                Airdrop {token.symbol} tokens to multiple addresses.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient" className="text-right">
                  Recipients
                </Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x123..., 0x456..., 0x789..."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount per address
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      case 'freeze':
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                {token.isFrozen ? 'Thaw Token' : 'Freeze Token'}
              </DialogTitle>
              <DialogDescription>
                {token.isFrozen
                  ? 'This will unfreeze the token, allowing transfers.'
                  : 'This will freeze the token, preventing transfers.'}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center">
                {token.isFrozen
                  ? `Are you sure you want to unfreeze ${token.symbol}?`
                  : `Are you sure you want to freeze ${token.symbol}?`}
              </p>
            </div>
          </>
        );
      case 'revoke':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Revoke Authority</DialogTitle>
              <DialogDescription>
                This action will permanently revoke mint authority for {token.symbol}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center font-semibold text-destructive">
                Warning: This action cannot be undone!
              </p>
              <p className="text-center mt-2">
                Are you sure you want to permanently revoke mint authority?
              </p>
            </div>
          </>
        );
      case 'updateMetadata':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Update Metadata</DialogTitle>
              <DialogDescription>
                Update the metadata for {token.symbol}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={metadataDescription}
                  onChange={(e) => setMetadataDescription(e.target.value)}
                  placeholder="Token description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  value={metadataImage}
                  onChange={(e) => setMetadataImage(e.target.value)}
                  placeholder="https://..."
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const evmActions = [
    { name: 'Transfer', action: 'transfer', icon: <ArrowUpToLine size={16} /> },
    { name: 'Burn', action: 'burn', icon: <Flame size={16} /> },
    ...(token.hasMintAuthority ? [{ name: 'Mint', action: 'mint', icon: <Landmark size={16} /> }] : []),
    { name: 'Airdrop', action: 'airdrop', icon: <Truck size={16} /> },
  ];

  const solanaActions = [
    { name: 'Transfer', action: 'transfer', icon: <ArrowUpToLine size={16} /> },
    { name: 'Burn', action: 'burn', icon: <Flame size={16} /> },
    ...(token.hasMintAuthority ? [{ name: 'Mint', action: 'mint', icon: <Landmark size={16} /> }] : []),
    { name: 'Freeze', action: 'freeze', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.9 4h6.2c2 0 3 0 3.9.5.8.4 1.5 1.1 2 2 .4.8.5 1.9.5 3.9v2.2c0 7.8 0 9.6-1 11.2a5.3 5.3 0 0 1-2.4 2.4c-1.6 1-3.4 1-11.2 1-7.8 0-9.6 0-11.2-1a5.3 5.3 0 0 1-2.4-2.4c-1-1.6-1-3.4-1-11.2v-2.2c0-2 0-3 .5-4 .4-.8 1.1-1.5 2-2 .8-.4 1.9-.5 3.9-.5h6.2Z"></path></svg> },
    { name: 'Revoke Auth', action: 'revoke', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v3"></path><path d="M18 21V8a1 1 0 0 0-1-1h-1"></path><path d="M13 7H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h11"></path><path d="M9 17h6"></path><path d="m16 10-3.5 3.5L11 12"></path></svg> },
    { name: 'Update Metadata', action: 'updateMetadata', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg> },
  ];

  const actions = token.chain === 'solana' ? solanaActions : evmActions;

  return (
    <>
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action.action}
            variant="outline"
            size="sm"
            className="flex-1 md:flex-grow-0 action-button"
            onClick={() => handleActionClick(action.action as ActionType)}
          >
            {action.icon}
            <span>{action.name}</span>
          </Button>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {renderDialogContent()}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Confirm'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TokenActions;
