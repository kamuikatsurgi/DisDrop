import React from 'react';

const FeatureSectionComponent = () => {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-16 h-16 my-4 mx-auto'>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 5C10.6716 5 10 5.67157 10 6.5V8H6.5C5.67157 8 5 8.67157 5 9.5V17.5C5 18.3284 5.67157 19 6.5 19H12.5C13.3284 19 14 18.3284 14 17.5V16H17.5C18.3284 16 19 15.3284 19 14.5V6.5C19 5.67157 18.3284 5 17.5 5H11.5ZM13 16H11.5C10.6716 16 10 15.3284 10 14.5V9H6.5C6.22386 9 6 9.22386 6 9.5V17.5C6 17.7761 6.22386 18 6.5 18H12.5C12.7761 18 13 17.7761 13 17.5V16ZM11 6.5C11 6.22386 11.2239 6 11.5 6H17.5C17.7761 6 18 6.22386 18 6.5V14.5C18 14.7761 17.7761 15 17.5 15H11.5C11.2239 15 11 14.7761 11 14.5V6.5Z" fill="#F6F5FF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.5C12 8.22386 12.2239 8 12.5 8H16.5C16.7761 8 17 8.22386 17 8.5C17 8.77614 16.7761 9 16.5 9H12.5C12.2239 9 12 8.77614 12 8.5Z" fill="#F6F5FF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10.5C12 10.2239 12.2239 10 12.5 10H14.5C14.7761 10 15 10.2239 15 10.5C15 10.7761 14.7761 11 14.5 11H12.5C12.2239 11 12 10.7761 12 10.5Z" fill="#F6F5FF"/>
        </svg>
      ),
      title: 'Single Transaction',
      description: 'Distribute tokens to multiple addresses in a single transaction, saving time and effort.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-16 h-16 my-4 mx-auto'>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.06693 15.147C4.65272 14.4295 4.89854 13.5122 5.61597 13.0979L7.80841 11.8321C8.04755 11.6941 8.35335 11.776 8.49142 12.0152C8.62949 12.2543 8.54755 12.5601 8.30841 12.6982L6.11597 13.964C5.87683 14.102 5.79489 14.4078 5.93296 14.647L7.19876 16.8394C7.38577 17.1633 7.79994 17.2743 8.12384 17.0873L13.2213 14.1443C13.5452 13.9573 13.6561 13.5431 13.4691 13.2192L11.7033 10.1608L12.5694 9.66076L14.3352 12.7192C14.7983 13.5214 14.5235 14.5472 13.7213 15.0103L8.62384 17.9533C7.82164 18.4165 6.79588 18.1416 6.33274 17.3394L5.06693 15.147Z" fill="#F6F5FF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.66454 10.9448C9.2014 10.1426 9.47625 9.11685 10.2784 8.6537L15.3759 5.7107C16.1781 5.24755 17.2038 5.52241 17.667 6.3246L18.9328 8.51703C19.347 9.23447 19.1012 10.1519 18.3837 10.5661L16.1913 11.8319C15.9522 11.9699 15.6464 11.888 15.5083 11.6489C15.3702 11.4097 15.4522 11.1039 15.6913 10.9658L17.8837 9.70005C18.1229 9.56197 18.2048 9.25618 18.0668 9.01703L16.801 6.8246C16.6139 6.5007 16.1998 6.38972 15.8759 6.57673L10.7784 9.51973C10.4545 9.70673 10.3436 10.1209 10.5306 10.4448L12.2964 13.5033L11.4303 14.0033L9.66454 10.9448Z" fill="#F6F5FF"/>
        </svg>
      ),
      title: 'Easy Integration',
      description: 'Easily integrate Disdrop with your existing applications and wallets, thanks to a simple and intuitive UI.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-16 h-16 my-4 mx-auto'>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.50235 7.98295C5.62019 14.017 10.1383 16.8072 12.0376 17.9403C13.1796 17.422 14.7386 16.2719 16.0431 14.5979C17.3876 12.8723 18.4366 10.6225 18.4972 7.98264C17.6467 7.34413 15.4145 6 12 6C8.58496 6 6.35255 7.34457 5.50235 7.98295ZM4.68303 7.35469C5.47366 6.70661 8.00284 5 12 5C15.9972 5 18.5263 6.70661 19.317 7.35469C19.4328 7.44966 19.5 7.59157 19.5 7.74138C19.5 10.7559 18.3216 13.3007 16.8319 15.2125C15.3486 17.1161 13.5301 18.4265 12.1857 18.9642C12.0409 19.0222 11.8773 19.0092 11.7435 18.9292C11.6977 18.9018 11.6494 18.8731 11.5985 18.8428C9.7213 17.7264 4.5 14.6212 4.5 7.74138C4.5 7.59157 4.56717 7.44966 4.68303 7.35469Z" fill="#F6F5FF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8536 9.14645C15.0488 9.34171 15.0488 9.65829 14.8536 9.85355L11.8536 12.8536C11.6583 13.0488 11.3417 13.0488 11.1464 12.8536L9.64645 11.3536C9.45118 11.1583 9.45118 10.8417 9.64645 10.6464C9.84171 10.4512 10.1583 10.4512 10.3536 10.6464L11.5 11.7929L14.1464 9.14645C14.3417 8.95118 14.6583 8.95118 14.8536 9.14645Z" fill="#F6F5FF"/>
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