import React, {useState, useEffect} from 'react';
import { WsProvider, ApiPromise } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

const NAME = "DisDrop";

const HeaderComponent = () => {
  const [api, setApi] = useState();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState({ address : ""});

  const onConnect = async () => {
    const extensions = await web3Enable(NAME);
    
    if(!extensions) {
      throw Error("NO_EXTENSIONS_FOUND");
    }
    
    const allAccs = await web3Accounts();
    setAccount(allAccs[0]);
    setConnected(true);
    console.log(allAccs[0]);
  }

  const setup = async () => {
    const wsProvider = new WsProvider("wss://mandala-rpc.aca-staging.network/ws");
    const api = await ApiPromise.create({provider : wsProvider});
    setApi(api);
  }

  useEffect(() => {
      setup();
  }, []);


  return (
    <header className="bg-black text-white font-poppins pt-4">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="font-semibold text-lg">
          Disdrop
        </div>
        <button onClick={ !connected ? onConnect : (()=>{})} className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-full transform transition-transform duration-200 hover:scale-105">
          { connected ? account.address.slice(0,10) + "..." : "Connect Wallet" }
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
