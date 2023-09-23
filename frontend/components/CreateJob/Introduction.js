import Image from 'next/image';
import React from 'react';
import { AiFillCheckCircle, AiOutlineDeploymentUnit } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';
import { GiCrossedChains, GiPartyPopper } from 'react-icons/gi';

const Helper = ({ icon, title, subtitle }) => {
  return (
    <div className='flex items-center gap-6 my-8 font-Poppins'>
      <>{icon}</>
      <div>
        <h2 className='text-white font-medium mb-1'>{title}</h2>
        <p className='text-[#737682] text-sm'>{subtitle}</p>
      </div>
    </div>
  );
};

const data = [
  {
    id: 's1',
    icon: (
      <AiFillCheckCircle
        // color="#1e1e1e"
        className='text-[#443592] '
        size={35}
      />
    ),
    title: 'Select Automation Type',
    subtitle: 'Select between Time based & custom logic',
  },
  {
    id: 's2',
    icon: (
      <SiHiveBlockchain
        className='text-[#443592] '
        size={35}
      />
    ),
    title: 'Enter contract details',
    subtitle: 'Enter smartcontract address and abi',
  },
  {
    id: 's3',
    icon: (
      <GiCrossedChains
        className='text-[#443592] '
        size={35}
      />
    ),
    title: 'Enter Function and parameters',
    subtitle: 'Choose the function to automate and input params',
  },
  {
    id: 's4',
    icon: (
      <AiOutlineDeploymentUnit
        // color="#1e1e1e"
        size={35}
        className='text-[#443592]'
      />
    ),
    title: 'Enter basic job details',
    subtitle: 'Enter name, admin address, etc stuffs ',
  },
  {
    id: 's5',
    icon: (
      <GiPartyPopper
        // color="#1e1e1e"
        size={35}
        className='text-[#443592]'
      />
    ),
    title: 'Success',
    subtitle: 'Wohooo! Automation is done successfully ',
  },
];

const Introduction = ({ setPage, page }) => {
  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1);
  };

  return (
    <div className='bg-[#181818] font-Poppins  rounded-xl w-[550px] h-fit border-gray-900 shadow-md border px-10 py-8'>
      <h2 className='text-lg font-semibold text-white'>
        Create automation jobs
      </h2>
      {data.map((item) => (
        <Helper
          key={item.id}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}

      <button
        onClick={nextPageHandler}
        className='py-3 w-full bg-[#443592] border-gray-900 border text-white rounded-xl mt-4 hover:bg-[#362a7d]'>
        Get Started
      </button>

    </div>
  );
};

export default Introduction;
