import { useWindowDimensions } from '@/utils/windowSize';
import React from 'react';
import { BsCheck } from 'react-icons/bs';
import Backdrop from '../Backdrop';
import Confetti from 'react-confetti';
import { useRouter } from 'next/router';

const SuccessModal = ({ onClose }) => {
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className='w-[550px] min-h-[300px] font-Poppins text-[#EDEDEF] font-semibold text-2xl bg-[black] p-10 rounded-2xl fixed top-[50%] left-[50%] shadow-2xl -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-900'>
        <p className='text-center mb-7'>Successfull!</p>

        <div className='flex justify-center items-center min-h-[200px] flex-col'>
          <BsCheck
            size={90}
            className='p-2 rounded-full bg-purple-800 text-purple-300'
          />

          <p className='text-sm font-normal mt-5 text-purple-300'>
            Wohooooooo! You've successfully created an automated job 🎉
          </p>

          <button
            onClick={() => {
              router.push('/dashboard');
            }}
            className='text-sm bg-[#362a7d] font-medium py-3 px-6 rounded-xl mt-4 text-purple-200 hover:bg-purple-900'>
            Go to Dashboard
          </button>
        </div>
      </div>

      <Confetti
        height={height}
        width={width}
      />
    </div>
  );
};

export default SuccessModal;
