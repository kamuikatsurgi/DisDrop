import React from 'react';

const HeaderComponent = () => {
  return (
    <header className="bg-black text-white font-poppins pt-4">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="font-semibold text-lg">
          Disdrop
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-full transform transition-transform duration-200 hover:scale-105">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
