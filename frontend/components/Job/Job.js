import { convertEpochToLocalTime } from '@/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { BsArrowDownShort } from 'react-icons/bs';

const Job = ({
  jobName,
  automationType,
  isExecuted,
  functionName,
  registeredDate,
  contractAddress,
  schedulerAddress,
  scheduledTime,
  noOfTimesExectued = 0,
  listOfTimesFuncExectued = [],
}) => {
  const [showList, setShowList] = useState(false);
  return (
    <div className='w-full bg-[#161618]  rounded-xl px-10 py-6'>
      <div className='flex justify-between items-center border-b border-[#2b2b2b] pb-2'>
        <div className='flex items-center gap-2'>
          <AiOutlineDeploymentUnit
            size={22}
            className='text-[#A09FA5]'
          />

          <p className='text-xl font-Poppins font-semibold text-[#EDEDEF]'>
            {jobName}
          </p>
        </div>

        {automationType === 'timebased' ? (
          <p className='bg-[#443592] text-purple-300 text-xs font-Poppins px-3 py-1 rounded-full'>
            Time based
          </p>
        ) : (
          <p className='bg-[#185160] text-blue-100 text-xs font-Poppins px-3 py-1 rounded-full'>
            Custom Logic
          </p>
        )}
      </div>

      <div className='py-4 flex flex-col gap-10 justify-between font-Poppins'>
        <div className='flex justify-between'>
          <div className='flex-[0.33] '>
            <p className='text-sm text-gray-400 font-semibold mb-2'>Status</p>

            {isExecuted ? (
              <p className='bg-green-600 font-semibold w-fit text-xs text-green-50 px-2 py-1 rounded-full'>
                Executed
              </p>
            ) : (
              <p className='bg-red-600 font-semibold w-fit text-xs text-red-50 px-2 py-1 rounded-full'>
                Not Executed
              </p>
            )}
          </div>

          {automationType === 'timebased' ? (
            <div className='flex-[0.33]'>
              <p className='text-sm text-gray-400 font-semibold mb-2'>
                Function
              </p>
              <p className='text-xl font-semibold text-[#EDEDEF]'>
                {functionName}
              </p>
            </div>
          ) : (
            <div className='flex-[0.33]'>
              <p className='text-sm text-gray-400 font-semibold mb-2'>
                No. of times executed
              </p>
              <p className='text-xl font-semibold text-[#EDEDEF]'>
                {noOfTimesExectued}
              </p>
            </div>
          )}

          <div className='flex-[0.33]'>
            <p className='text-sm text-gray-400 font-semibold mb-2'>
              Date Registered
            </p>

            <p className='text-xl font-semibold text-[#EDEDEF]'>
              {convertEpochToLocalTime(registeredDate)}
            </p>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex-[0.33]'>
            <p className='text-sm text-gray-400 font-semibold mb-2'>
              Contract Address
            </p>

            <div className='flex gap-2 items-center'>
              <Image
                src='/img.png'
                alt='img'
                height={20}
                width={30}
                className='rounded-md'
              />
              <p className='text-xl font-semibold text-[#EDEDEF]'>
                {contractAddress.slice(0, 5)}....
                {contractAddress.slice(contractAddress.length - 4)}
              </p>
            </div>
          </div>

          <div
            className={`${
              automationType === 'timebased' ? 'flex-[0.33]' : 'flex-[0.6667]'
            }`}>
            <p className='text-sm text-gray-400 font-semibold mb-2'>
              Scheduler Address
            </p>

            <div className='flex gap-2 items-center'>
              <Image
                src='/img2.png'
                alt='img'
                height={20}
                width={30}
                className='rounded-md'
              />
              <p className='text-xl font-semibold text-[#EDEDEF]'>
                {schedulerAddress.slice(0, 3)}....
                {schedulerAddress.slice(schedulerAddress.length - 4)}
              </p>
            </div>
          </div>

          {automationType === 'timebased' ? (
            <div className='flex-[0.33]'>
              <p className='text-sm text-gray-400 font-semibold mb-2'>
                Scheduled Time
              </p>

              <p className='text-xl font-semibold text-[#EDEDEF]'>
                {convertEpochToLocalTime(scheduledTime)}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {automationType !== 'timebased' ? (
        <div
          onClick={() => {
            setShowList(!showList);
          }}
          className='mt-4 '>
          <p className='bg-gray-700 cursor-pointer text-sm text-gray-200 font-semibold py-3 px-4 rounded-md w-full flex justify-between items-center'>
            Date & time when function executed
            <span>
              <BsArrowDownShort size={25} />
            </span>
          </p>

          {listOfTimesFuncExectued.length && showList ? (
            <div className='bg-black/30 mt-2 rounded-md'>
              {listOfTimesFuncExectued.map((time, index) => (
                <p className='flex gap-2 items-center py-3 px-3 text-lg font-Poppins font-semibold text-white'>
                  <span>{index + 1}.</span>
                  {convertEpochToLocalTime(time)}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Job;
