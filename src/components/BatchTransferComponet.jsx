import React, { useState } from 'react';

const BatchTransferComponent = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [walletAmountPairs, setWalletAmountPairs] = useState([{ wallet: '', amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState('');

  const addWalletAmountPair = () => {
    setWalletAmountPairs([...walletAmountPairs, { wallet: '', amount: 0 }]);
  };

  const removeWalletAmountPair = (indexToRemove) => {
    setWalletAmountPairs(walletAmountPairs.filter((_, index) => index !== indexToRemove));
  };

  const updateWalletAmountPair = (indexToUpdate, newPair) => {
    setWalletAmountPairs(
      walletAmountPairs.map((pair, index) => (index === indexToUpdate ? newPair : pair))
    );
  };
  
  const logKeyPairs = () => {
    console.log(walletAmountPairs);
  }

  const distributeEqually = () => {
    const equallyDistributedAmount = totalAmount / walletAmountPairs.length;
    setWalletAmountPairs(
      walletAmountPairs.map((pair) => ({ ...pair, amount: equallyDistributedAmount }))
    );
    console.log(walletAmountPairs);
  };

  return (
<section className="bg-black py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-white">Batch Token Transfer</h2>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <label htmlFor="token-address" className="block text-lg font-semibold mb-2 text-white">
            Token Address
          </label>
          <select
            id="token-address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full mb-8 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
          >
            <option value="">Select a token</option>
            <option value="ACA">Acala (ACA)</option>
            <option value="AUSD">Acala Dollar (aUSD)</option>
            <option value="DOT">Polkadot (DOT)</option>
            <option value="LDOT">Liquid DOT (LDOT)</option>
          </select>

          <label htmlFor="total-amount" className="block text-lg font-semibold mb-2 text-white">
            Total Amount
          </label>
          <input
            id="total-amount"
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full mb-8 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
            placeholder="Enter the total amount to distribute"
          />

          {walletAmountPairs.map((pair, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                value={pair.wallet}
                onChange={(e) =>
                  updateWalletAmountPair(index, { ...pair, wallet: e.target.value })
                }
                className="w-1/2 m-2 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
                placeholder="Wallet address"
              />
              <input
                type="number"
                value={pair.amount}
                onChange={(e) =>
                  updateWalletAmountPair(index, { ...pair, amount: Number(e.target.value) })
                }
                className="w-1/2 m-2 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
                placeholder="Token amount"
                />
                <button
                onClick={() => removeWalletAmountPair(index)}
                className="text-red-600 m-2 text-2xl hover:text-red-800 transition-colors duration-200"
                >
                ×
                </button>
                </div>
                ))}
                
                <div className="flex space-x-4">
        <button
          onClick={addWalletAmountPair}
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Add Wallet & Amount Pair
        </button>
        <button
          onClick={distributeEqually}
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Distribute Equally
        </button>
        <button
          onClick={logKeyPairs}
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Debug
        </button>
      </div>
    </div>
  </div>
</section>
);
};

export default BatchTransferComponent;