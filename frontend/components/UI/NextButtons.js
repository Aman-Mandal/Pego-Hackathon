import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const NextButtons = ({
  previousPageHandler,
  nextPageHandler,
  isPrevDisabled = false,
  isNextDisabled = false,
}) => {
  return (
    <div className='flex self-end gap-2 mr-1 mt-2'>
      <BsArrowLeftShort
        onClick={
          !isPrevDisabled
            ? previousPageHandler
            : () => {
                '';
              }
        }
        size={45}
        className={`${
          !isPrevDisabled
            ? 'bg-[#271E5D] text-purple-300 hover:bg-[#443592]'
            : 'bg-gray-500 text-gray-600 cursor-not-allowed'
        }  rounded-full p-1 cursor-pointer `}
      />

      <BsArrowRightShort
        onClick={
          !isNextDisabled
            ? nextPageHandler
            : () => {
                '';
              }
        }
        size={45}
        className={`${
          !isNextDisabled
            ? 'bg-[#271E5D] text-purple-300 hover:bg-[#443592]'
            : 'bg-gray-500 text-gray-600 cursor-not-allowed'
        }  rounded-full p-1 cursor-pointer `}
      />
    </div>
  );
};

export default NextButtons;
