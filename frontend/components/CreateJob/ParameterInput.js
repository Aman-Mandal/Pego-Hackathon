import React, { useState } from 'react';

const ParameterInput = ({ input, setFormData, formData, index }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setFormData((prevFormData) => {
      const updatedParams = [...prevFormData.inputParams];
      updatedParams[index] = inputValue;
      return {
        ...prevFormData,
        inputParams: updatedParams,
      };
    });
  };

  return (
    <>
      <label className='flex-[0.35] text-sm text-purple-800'>
        {input.type}
      </label>
      <input
        required
        onChange={handleInputChange}
        className='flex-[0.65] py-2 px-2 border rounded bg-[#232327] border-gray-900 text-sm outline-none'
        type='text'
        placeholder={input.name}
      />
    </>
  );
};

export default ParameterInput;
