import Image from 'next/image';
import React, { useState } from 'react';
import { GiBreakingChain, GiAlarmClock } from 'react-icons/gi';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import NextButtons from '../UI/NextButtons';
// import polygonSvg from '../../public/assets/deploy/polygon.svg';

const SelectType = ({ setPage, page, formData, setFormData }) => {
  const [isCustomLogic, setIsCustomLogic] = useState(
    formData?.automationType && formData?.automationType === 'custom'
      ? true
      : false
  );
  const [isTimeBased, setIsTimeBased] = useState(
    formData?.automationType && formData?.automationType === 'time'
      ? true
      : false
  );

  const customLogicTypeHandler = () => {
    setIsTimeBased(false);
    setIsCustomLogic(true);
  };

  const timeBasedTypeHandler = () => {
    setIsCustomLogic(false);
    setIsTimeBased(true);
  };

  const nextPageHandler = () => {
    if (isCustomLogic) {
      setFormData({ ...formData, automationType: 'custom' });
    } else if (isTimeBased) {
      setFormData({ ...formData, automationType: 'time' });
    }
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  return (
    <div className='flex flex-col'>
      <div className='text-white w-[750px] bg-[#181818] py-10 px-10 rounded-xl border border-gray-900 shadow-md'>
        <h2 className='text-2xl font-semibold mb-7'>Select Automation Type</h2>

        <form className='flex flex-col '>
          <div className='flex gap-10 h-[250px]'>
            <div
              onClick={timeBasedTypeHandler}
              className={` ${
                isTimeBased ? 'bg-[#443592]' : 'bg-[#363636]'
              }  p-10 rounded-xl flex-[0.5] cursor-pointer`}>
              <div className='bg-[#171717] rounded-md p-4 w-fit mb-3'>
                <GiAlarmClock
                  className={`${isTimeBased && 'text-purple-300'}`}
                  size={20}
                />
              </div>

              <p className={`${isTimeBased && 'text-purple-300 '} font-medium`}>
                Time based
              </p>

              <p className='text-xs font-light mt-2 text-gray-300'>
                It uses a time schedule (CRON) to execute your smart contract
                function according to the schedule.
              </p>
            </div>

            <div
              onClick={customLogicTypeHandler}
              className={` ${
                isCustomLogic ? 'bg-[#281e5e]' : 'bg-[#363636]'
              } p-10 rounded-xl flex-[0.5] cursor-pointer`}>
              <div className='bg-[#171717] rounded-md p-4 w-fit mb-3'>
                <GiBreakingChain
                  size={20}
                  className={`${isCustomLogic ? 'text-purple-300' : ''}`}
                />
              </div>
              <p
                className={`${
                  isCustomLogic ? 'text-purple-300' : ''
                } font-medium`}>
                Custom Logic
              </p>
              <p className='text-xs font-light mt-2 text-gray-300'>
                Custom logic uses an Automation-compatible contract that you
                deployed to determine when to perform your task.
              </p>
            </div>
          </div>
        </form>
      </div>

      <NextButtons
        previousPageHandler={previousPageHandler}
        nextPageHandler={nextPageHandler}
      />
    </div>
  );
};

export default SelectType;
