import React, { useState } from 'react';
import BatchTransferComponent from './BatchTransferComponet';
import ScheduledBatchTransferComponent from './ScheduledBatchTransferComponent';
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
              Tab 1
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`py-2 px-4 rounded-lg mr-2 transition-colors duration-200 ${
                activeTab === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              Tab 2
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`py-2 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === 2 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              Tab 3
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
                {/* Tab content for Tab 3 */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateDisDropSection;
