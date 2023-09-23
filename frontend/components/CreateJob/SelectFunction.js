import React from 'react';
import { useState, useEffect } from 'react';
import NextButtons from '../UI/NextButtons';
import ParameterInput from './ParameterInput';

const SelectFunction = ({ setPage, page, formData, setFormData }) => {
  const [mutableFuncs, setMutableFuncs] = useState([]);
  const [selectedFun, setSelectedFun] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const parsedData = JSON.parse(formData.contractAbi);
    const funcs = parsedData.filter((fun) => {
      return (
        fun.stateMutability !== 'view' &&
        fun.stateMutability !== 'pure' &&
        fun.type === 'function'
      );
    });
    setMutableFuncs(funcs);
  }, []);

  const handleSelectChange = (event) => {
    const selectedFunction = mutableFuncs[event.target.value];
    setSelectedFun(selectedFunction);
  };

  const nextPageHandler = () => {
    setFormData({ ...formData, function: selectedFun });
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  return (
    <div className='flex flex-col'>
      <div className='text-white w-[600px] font-Poppins bg-[#181818] py-10 px-10 rounded-xl border border-gray-900 shadow-md'>
        <h2 className='text-2xl font-semibold mb-7'>
          Select Function to Automate
        </h2>

        <div className='flex flex-col '>
          <label className='text-sm text-gray-400 mb-1'>Function</label>
          <select
            onChange={handleSelectChange}
            class='bg-[#232327] outline-none border border-gray-900 mb-4  py-3 px-2 text-white text-sm rounded-lg '>
            <option selected>Select function here</option>
            {mutableFuncs.map((fun, index) => (
              <option
                key={index}
                value={index}>
                {fun.name}
              </option>
            ))}
          </select>

          {selectedFun?.inputs.length ? (
            <>
              <label className='text-sm text-gray-400 mb-3'>
                Input Parameters
              </label>

              {selectedFun.inputs?.map((input, index) => (
                <div className='flex mb-3 items-center'>
                  <ParameterInput
                    setFormData={setFormData}
                    formData={formData}
                    input={input}
                    index={index}
                  />
                </div>
              ))}
            </>
          ) : null}

          <div className='flex gap-2 items-start'>
            <input
              required
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
              value={checked}
              type='checkbox'
              className='bg-[#232327] h-4 w-4 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-10'
            />
            <label>Need a random number for executing this function</label>
          </div>
        </div>
      </div>

      <NextButtons
        isNextDisabled={
          !formData.inputParams.length &&
          !(selectedFun?.inputs.length == 0) &&
          !formData.function
        }
        nextPageHandler={nextPageHandler}
        previousPageHandler={previousPageHandler}
      />
    </div>
  );
};

export default SelectFunction;
