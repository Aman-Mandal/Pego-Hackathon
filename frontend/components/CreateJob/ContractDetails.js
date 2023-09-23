import React from 'react';
import NextButtons from '../UI/NextButtons';

const ContractDetails = ({ setPage, page, formData, setFormData }) => {
  
  const nextPageHandler = () => {
    if (formData.automationType === 'time') {
      setPage((currPage) => currPage + 1);
    } else if (formData.automationType === 'custom') {
      setPage((currPage) => currPage + 2);
    }
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  return (
    <div className='flex flex-col'>
      <div className='text-white w-[600px] font-Poppins bg-[#181818] py-10 px-10 rounded-xl border border-gray-900 shadow-md'>
        <h2 className='text-2xl font-semibold mb-7'>Enter Contract details</h2>

        <div className='flex flex-col '>
          <label className='text-sm text-gray-400'>Contract address</label>
          <input
            required
            onChange={(event) => {
              setFormData({ ...formData, contractAddress: event.target.value });
            }}
            value={formData.contractAddress}
            type='text'
            className='bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-10'
          />

          <label className='text-sm text-gray-400'>Contract ABI</label>
          <textarea
            required
            onChange={(event) => {
              setFormData({
                ...formData,
                contractAbi: event.target.value,
              });
            }}
            value={formData.contractAbi}
            placeholder='Paste your ABI here..'
            rows={12}
            className='bg-[#232327] py-2 text-sm px-2 border border-gray-900 rounded-md placeholder:text-gray-600 text-gray-300 my-1 outline-none max-h-[200px]'
          />
        </div>
      </div>
      <NextButtons
        isNextDisabled={!formData.contractAddress || !formData.contractAbi}
        nextPageHandler={nextPageHandler}
        previousPageHandler={previousPageHandler}
      />
    </div>
  );
};

export default ContractDetails;
