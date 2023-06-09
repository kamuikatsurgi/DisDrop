import React, { useState, useEffect } from 'react';
import abi from '../assets/contract_abi.json';
import CustomDateTimePicker from './CustomDateTimePicker';
const { ethers } = require("ethers");

const ScheduledBatchTransferComponent = () => {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const disContract = new ethers.Contract(ethers.getAddress("0x26Baf3e72eb317bE940336b09A9d2eD73a74BF84"), abi.abi, signer);

  const tokAbi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]

  const [tokenAddress, setTokenAddress] = useState('');
  const [walletAmountPairs, setWalletAmountPairs] = useState([{ wallet: '', amount: 0 }]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalAmount, setTotalAmount] = useState('');
  const [custom, setCustom] = useState(false);
  const [customAddr, setCustomAddr] = useState("");

  const onTransfer = async () => {
    //    console.log(walletAmountPairs);
        let currDate = new Date();
        let total = 0;
        let addrsTemp = [];
        let amtsTemp = [];
    
        if(tokenAddress){
          for(const i in walletAmountPairs) {
            try { 
              if(ethers.getAddress(walletAmountPairs[i].wallet)) {
                addrsTemp.push(ethers.getAddress(walletAmountPairs[i].wallet));
              }
              if(walletAmountPairs[i].amount > 0) {
                amtsTemp.push(walletAmountPairs[i].amount);
                total += walletAmountPairs[i].amount;
              }
              else {
                alert(`Amount cannot be zero for the address : ${walletAmountPairs[i].wallet}`);
              }
    
            }
            catch (error) {
              alert(`"${walletAmountPairs[i].wallet}" is not a valid address, make sure to enter correct wallet addresses`);
            }
          }
        }
    
    //    console.log(addrsTemp);
    //    console.log(amtsTemp);
        if(addrsTemp.length == walletAmountPairs.length && addrsTemp.length == amtsTemp.length && total == totalAmount && Math.ceil(Math.abs(selectedDate - currDate) / 15000) > 0) {
          let consent = window.confirm("Do you want to proceed with the drop? Make sure all the details are correct!");
          if(consent){
            let contract = new ethers.Contract(ethers.getAddress(tokenAddress), tokAbi, signer);
            const approv = await contract.approve(ethers.getAddress("0x26Baf3e72eb317bE940336b09A9d2eD73a74BF84"), totalAmount);
            await approv.wait();
            const tx = await disContract.scheduled_dispersal(ethers.getAddress(tokenAddress), addrsTemp, amtsTemp, Math.ceil(Math.abs(selectedDate - currDate) / 15000));
            await tx.wait();
            console.log(tx);
          }
        }
        else {
          alert("Make sure that all the details are correct and the sum of amount matches with the total amounts");
        }
      }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const addWalletAmountPair = () => {
    setWalletAmountPairs([...walletAmountPairs, { wallet: '', amount: 0 }]);
  };

  const logKeyPairs = () => {
    console.log(walletAmountPairs);
    console.log(selectedDate);
    let currDate = new Date();
    console.log(Math.ceil(Math.abs(selectedDate - currDate) / 15000));
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

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
    })();
  }, []);  

  return (
    <section className="bg-black py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-white">Timed Batch Token Transfer</h2>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <label htmlFor="transfer-date" className="block text-lg font-semibold mb-2 text-white">
            Transfer Date
          </label>
        <div>          
        <CustomDateTimePicker value={selectedDate} onChange={handleDateChange} />
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
            <option value="0x0000000000000000000100000000000000000082">Kusama (KSM)</option>
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
            Total Amount (Inc. Decimals)
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
                  onClick={onTransfer}
                  className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Execute
                </button>
              </div>
            </div>
          </div>
        </section>
);
};

export default ScheduledBatchTransferComponent;        
