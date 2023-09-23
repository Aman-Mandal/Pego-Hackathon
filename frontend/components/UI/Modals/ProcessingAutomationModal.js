import React, { useState } from 'react';
import Backdrop from '../Backdrop';
import Loader from '../Loader';
import { BsCheck } from 'react-icons/bs';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import LIT from '@/components/LIT/LIT';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ens } from '@/components/ENS';
import { useAccount } from 'wagmi';

const ProcessingAutomationModal = ({ onClose, loading, createJobHandler }) => {
  const [pkpWallet, setPkpWallet] = useState(null);

  const { address } = useAccount();

  const handler = async () => {
    await createJobHandler(address, pkpWallet);
  };

  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className='w-[550px] min-h-[300px] font-Poppins text-[#EDEDEF] font-semibold text-2xl bg-[black] p-10 rounded-2xl fixed top-[50%] left-[50%] shadow-2xl -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-900'>
        <p className='text-center mb-7'>Processing Automation...</p>

        {loading ? (
          <Loader inComp={true} />
        ) : (
          <div className='flex flex-col justify-center items-center gap-4'>
            <AiOutlineDeploymentUnit
              color='white'
              size={80}
            />

            {!(address || pkpWallet) ? (
              <>
                <LIT setPkpWallet={setPkpWallet} />
                <p className='text-xs text-center text-white font-normal'>
                  Powered by LIT Pkps
                </p>
                <p className='text-center'>or</p>
                <ConnectButton />
              </>
            ) : (
              <button
                className='bg-[#362a7d] text-lg mt-4 px-5 py-2 rounded-md font-medium'
                onClick={handler}>
                Create Job
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingAutomationModal;
