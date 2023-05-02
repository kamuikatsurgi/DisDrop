import React, { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';

const ScheduledBatchTransferComponent = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [walletAmountPairs, setWalletAmountPairs] = useState([{ wallet: '', amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState('');
  const [transferDate, setTransferDate] = useState();
  const [custom, setCustom] = useState(false);
  const [customAddr, setCustomAddr] = useState("");

  const addWalletAmountPair = () => {
    setWalletAmountPairs([...walletAmountPairs, { wallet: '', amount: 0 }]);
  };

  const logKeyPairs = () => {
    console.log(walletAmountPairs);
  }

  const removeWalletAmountPair = (indexToRemove) => {
    setWalletAmountPairs(walletAmountPairs.filter((_, index) => index !== indexToRemove));
  };

  const updateWalletAmountPair = (indexToUpdate, newPair) => {
    setWalletAmountPairs(
      walletAmountPairs.map((pair, index) => (index === indexToUpdate ? newPair : pair))
    );
  };

  const distributeEqually = () => {
    const equallyDistributedAmount = totalAmount / walletAmountPairs.length;
    setWalletAmountPairs(
      walletAmountPairs.map((pair) => ({ ...pair, amount: equallyDistributedAmount }))
    );
  };

  return (
    <section className="bg-black py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-white">Timed Batch Token Transfer</h2>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <label htmlFor="transfer-date" className="block text-lg font-semibold mb-2 text-white">
            Transfer Date
          </label>
        <div>          
          <DateTimePicker
            label="Unlock Time"
            value={transferDate}
            onChange={(newValue) => setTransferDate(newValue)}
            />
        </div>

          <label htmlFor="token-address" className="block text-lg font-semibold mb-2 text-white">
            Token Address
          </label>
          <select
            id="token-address"
            value={tokenAddress}
            onChange={(e) => {
              if(e.target.value == "custom") {
                setCustom(true);
                setTokenAddress(e.target.value);
              } else {
                setCustom(false);
                setTokenAddress(e.target.value);
              }
            }}
            className="w-full mb-8 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
          >
            <option value="">Select a token</option>
            <option value="0x0000000000000000000100000000000000000000">Acala (ACA)</option>
            <option value="0x0000000000000000000100000000000000000001">Acala Dollar (aUSD)</option>
            <option value="0x0000000000000000000100000000000000000002">Polkadot (DOT)</option>
            <option value="0x0000000000000000000100000000000000000003">Liquid DOT (LDOT)</option>
            <option value="0x00000000000000000001000000000000000000AB">Kintsugi (KINT)</option>
            <option value="0x00000000000000000001000000000000000000aC">Kintsugi Bitcoin (KBTC)</option>
            <option value="custom">Custom</option>
          </select>

          {
            custom ?  
              <input
              id="custom-addr"
              type="text"
              value={customAddr}
              onChange={(e) => setCustomAddr(e.target.value)}
              className="w-full mb-8 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
              placeholder="Enter the token address"
              />
            : ""
          }

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
                className="w-1/2 p-2 border border-gray-700-rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
                placeholder="Wallet address"
                />
                <input
                type="number"
                value={pair.amount}
                onChange={(e) =>
                updateWalletAmountPair(index, { ...pair, amount: Number(e.target.value) })
                }
                className="w-1/3 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white mx-4"
                placeholder="Token amount"
                />
                <button
                onClick={() => removeWalletAmountPair(index)}
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                ×
                </button>
                </div>
                ))}      <div className="flex space-x-4">
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

export default ScheduledBatchTransferComponent;        
