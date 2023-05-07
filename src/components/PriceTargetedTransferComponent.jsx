import React, { useState, useEffect } from 'react';
import abi from '../assets/contract_abi.json';
const { ethers } = require("ethers");

const PriceTargetedTransferComponent = () => {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const disContract = new ethers.Contract("0x836BfA9A113b024B6F9fa001E8Ba2990addE6226", abi.abi, signer);

  const [tokenAddress, setTokenAddress] = useState('');
  const [walletAmountPairs, setWalletAmountPairs] = useState([{ wallet: '', amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

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

  const distributeEqually = () => {
    const equallyDistributedAmount = totalAmount / walletAmountPairs.length;
    setWalletAmountPairs(
      walletAmountPairs.map((pair) => ({ ...pair, amount: equallyDistributedAmount }))
    );
  };

  const logTransferData = () => {
    console.log({
      tokenAddress,
      walletAmountPairs,
      totalAmount,
      targetPrice,
    });
  };

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
    })();
  }, []);  

  return (
    <section className="bg-black py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-white">Price Targeted Token Transfer</h2>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <label htmlFor="token-address" className="block text-lg font-semibold mb-2 text-white">
            Token Address
          </label>
          <input
            id="token-address"
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full mb-8 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
            placeholder="Enter the token address"
          />

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
    
          <label htmlFor="target-price" className="block text-lg font-semibold mb-2 text-white">
            Target Price
          </label>
          <input
            id="target-price"
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="w-full mb-8 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
            placeholder="Enter the target price"
          />
    
    {walletAmountPairs.map((pair, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                value={pair.wallet}
                onChange={(e) =>
                  updateWalletAmountPair(index, { ...pair, wallet: e.target.value })
                }
                className="w-1/2 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
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
              onClick={logTransferData}
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

export default PriceTargetedTransferComponent;

