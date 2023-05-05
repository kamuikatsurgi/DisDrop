import React, { useState } from 'react';
import BatchTransferComponent from './BatchTransferComponet';
import ScheduledBatchTransferComponent from './ScheduledBatchTransferComponent';
import PriceTargetedTransferComponent from './PriceTargetedTransferComponent';
const CreateDisDropSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-black py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-white">Create a DisDrop</h2>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setActiveTab(0)}
              className={`py-2 px-4 rounded-lg mr-2 transition-colors duration-200 ${
                activeTab === 0 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}  
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M9.97.97a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 01-1.06-1.06l3-3zM9.75 6.75v6a.75.75 0 001.5 0v-6h3a3 3 0 013 3v7.5a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3h3z" />
  <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
</svg>


            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`py-2 px-4 rounded-lg mr-2 transition-colors duration-200 ${
                activeTab === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
</svg>

            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`py-2 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === 2 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
</svg>

            </button>
          </div>
          <div className="transition-opacity duration-200">
            {activeTab === 0 && (
              <div className={`${activeTab === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <BatchTransferComponent />
              </div>
            )}
            {activeTab === 1 && (
              <div className={`${activeTab === 1 ? 'opacity-100' : 'opacity-0'}`}>
                <ScheduledBatchTransferComponent />
              </div>
            )}
            {activeTab === 2 && (
              <div className={`${activeTab === 2 ? 'opacity-100' : 'opacity-0'}`}>
                <PriceTargetedTransferComponent />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateDisDropSection;
