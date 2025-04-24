// import Dashboard from './Dashboard';

// const Index = () => {
//   return <Dashboard />;
// };

// export default Index;

import { useState } from "react";

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not found!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setWalletConnected(true);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  const switchToChain = async (chainIdHex) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
      return true;
    } catch (switchError) {
      // This error code means the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        alert(
          "This chain is not available in MetaMask. Please add it manually."
        );
      } else {
        console.error("Chain switch error:", switchError);
      }
      return false;
    }
  };

  const addTokenToMetaMask = async () => {
    if (!walletConnected) {
      alert("Connect wallet first");
      return;
    }
    const expectedChainId = "0x38"; // BSC Mainnet (for example)

    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (currentChainId !== expectedChainId) {
      const switched = await switchToChain(expectedChainId);
      if (!switched) return;
    }

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "BEP20",
          // chainId: "0x38",
          options: {
            address: "0x0bF837AbF358EAA51026aB763b21b5d3d203839F",
            symbol: "USDT",
            decimals: 18,
            image: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=040",
          },
        },
      });

      if (wasAdded) {
        console.log("Token added!");
      } else {
        console.log("User rejected token add.");
      }
    } catch (err) {
      console.error("Error adding token:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 space-y-4">
      <button
        onClick={connectWallet}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {walletConnected
          ? `Connected: ${account.slice(0, 6)}...`
          : "Connect Wallet"}
      </button>

      <button
        onClick={addTokenToMetaMask}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add Token to MetaMask
      </button>
    </div>
  );
};

export default Index;
