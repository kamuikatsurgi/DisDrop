import React from 'react';

const HeroSectionComponent = () => {
  const dummyImageURL = 'https://via.placeholder.com/350x150'; // Replace with your desired URL

  return (
    <section className="bg-black text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 leading-loose">
            Disdrop: Token Distribution Made Easy
          </h1>
          <p className="text-lg mb-4">
            Disdrop simplifies the process of distributing tokens to multiple addresses in a single transaction. Connect your wallet and start distributing tokens today.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-full transform transition-transform duration-200 hover:scale-105">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <img src={dummyImageURL} alt="Disdrop illustration" className="w-full h-auto transition-opacity duration-200 hover:opacity-90" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionComponent;
