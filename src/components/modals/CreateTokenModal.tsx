import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import ChainSelector from "@/components/tokens/ChainSelector";
import { ChainType, TokenCreationParams } from "@/types/token";
import { useWallet } from "@/context/WalletContext";

interface CreateTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tokenData: TokenCreationParams) => void;
}

const CreateTokenModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateTokenModalProps) => {
  const { currentChain } = useWallet();
  const [chain, setChain] = useState<ChainType>(currentChain || "ethereum");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(18);
  const [totalSupply, setTotalSupply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !symbol || !totalSupply) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // For the demo, we're just simulating token creation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onCreate({
        name,
        symbol,
        decimals,
        totalSupply,
        chain,
        logo: logoUrl,
      });

      toast.success(`Successfully created ${name} (${symbol}) token`);
      handleClose();
    } catch (error) {
      console.error("Error creating token:", error);
      toast.error("Failed to create token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setSymbol("");
    setDecimals(18);
    setTotalSupply("");
    setLogoUrl("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Token</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new token on your selected
            blockchain.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="chain">Blockchain</Label>
            <ChainSelector selectedChain={chain} onSelectChain={setChain} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Token"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-right">
                Symbol
              </Label>
              <Input
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="TKN"
                maxLength={8}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="decimals">Decimals: {decimals}</Label>
            </div>
            <Slider
              id="decimals"
              min={0}
              max={18}
              step={1}
              value={[decimals]}
              onValueChange={(value) => setDecimals(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>9</span>
              <span>18</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalSupply">Total Supply</Label>
            <Input
              id="totalSupply"
              type="number"
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
              placeholder="1000000"
              required
            />
            <p className="text-xs text-muted-foreground">
              The actual amount will be:{" "}
              {totalSupply ? parseFloat(totalSupply) * 10 ** decimals : 0}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL (Optional)</Label>
            <Input
              id="logo"
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Token"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTokenModal;
