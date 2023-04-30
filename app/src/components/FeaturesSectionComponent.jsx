import React from 'react';

const FeatureSectionComponent = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12 my-4 mx-auto">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
        </svg>

      ),
      title: 'Single Transaction',
      description: 'Distribute tokens to multiple addresses in a single transaction, saving time and effort.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-500 mx-auto" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      title: 'Easy Integration',
      description: 'Easily integrate Disdrop with your existing applications and wallets, thanks to a simple and intuitive UI.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-500 mx-auto" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
     
     ),
     title: 'Secure',
     description: 'Disdrop ensures a secure token distribution process, using the latest security standards and practices.',
   },
];

return (
<section className="bg-black text-white py-10">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-semibold mb-6 text-center">Features</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{features.map((feature, index) => (
<div key={index} className="text-center">
<div className="text-center">
{feature.icon}
<h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
<p className="text-lg">{feature.description}</p>
</div>
</div>
))}
</div>
</div>
</section>
);
};

export default FeatureSectionComponent;   