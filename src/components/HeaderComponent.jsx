import React, {useState, useEffect} from 'react';
// import Web3 from 'web3';
const { ethers } = require("ethers");

const HeaderComponent = () => {
  const [api, setApi] = useState();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const provider = window.ethereum;
  const ethprovider = new ethers.BrowserProvider(window.ethereum);
//  const web3 = new Web3(provider);
  const signer = ethprovider.getSigner();


  const onConnect = async () => {
    const _chainId = await provider.request({ method : "eth_chainId"});
    if (_chainId.toString() !== "0x253" ){
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x253' }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x253',
                  chainName: 'Mandala',
                  rpcUrls: ['https://eth-rpc-mandala.aca-staging.network'],
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }
        }
      }
    }
    if(!connected) {
      provider.request({method:'eth_requestAccounts'})
      .then(res=>{
        if(res){
          setAccount(res);
          setConnected(true);
        }
      })
    } else {
      setConnected(false);
      setAccount("");
    }
  }

  useEffect(() => {
    (async () => {
      await onConnect();
    })();
  }, []);

  return (
    <header className="bg-black text-white font-poppins pt-4">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="font-semibold text-lg">
          Disdrop
        </div>
        <button onClick={onConnect} className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-full transform transition-transform duration-200 hover:scale-105">
          { connected ? account.slice(0,5) : "Connect Wallet" }
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
