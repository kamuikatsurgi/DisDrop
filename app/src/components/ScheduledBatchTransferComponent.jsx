import React, { useState } from 'react';
import BatchTransferComponent from './BatchTransferComponet';

const ScheduledBatchTransferComponent = () => {
  const [scheduledDateTime, setScheduledDateTime] = useState(new Date().toISOString().slice(0, 16));

  const handleScheduledTransfer = () => {
    // Handle the scheduled transfer logic here, e.g., call a smart contract method
    console.log('Scheduled transfer on:', scheduledDateTime);
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="scheduled-date-time" className="block text-lg font-semibold mb-2 text-white">
          Schedule Transfer
        </label>
        <input
          id="scheduled-date-time"
          type="datetime-local"
          value={scheduledDateTime}
          onChange={(e) => setScheduledDateTime(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 bg-black text-white"
        />
      </div>
      <button
        onClick={handleScheduledTransfer}
        className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Schedule Batch Transfer
      </button>
 
    <BatchTransferComponent />
    </>
  );
};

export default ScheduledBatchTransferComponent;
