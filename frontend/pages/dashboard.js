import Job from '@/components/Job/Job';
import React, { useState, useEffect } from 'react';
import { BsArrowDownShort } from 'react-icons/bs';
import { useAccount } from 'wagmi';
import LIT from '@/components/LIT/LIT';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BackendUri } from '@/lib/constants';
const Dashboard = () => {
  const [jobData, setJobData] = useState([]);
  const [timeBasedJob, setTimeBasedJob] = useState([]);
  const [customJob, setCustomJob] = useState([]);
  const [pkpWallet, setPkpWallet] = useState(null);

  const { address } = useAccount();

  useEffect(() => {
    if (address || pkpWallet) {
      async function getJobs() {
        await getData();
      }

      getJobs();
    }
  }, [address, pkpWallet]);

  const getData = async () => {
    try {
      const walletAddress = address ? address : pkpWallet.address;

      const data = await fetch(`${BackendUri}/user/job/${walletAddress}`);

      const response = await data.json();

      console.log('response', response);
      setTimeBasedJob(response.response.timeBasedJobs);
      setCustomJob(response.response.customJobs);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=' min-h-[95vh] bg-[#1C1C1F]'>
      <div className='w-[95%] mx-auto py-10'>
        {!address && !pkpWallet ? (
          <div className='flex flex-col items-center gap-2 w-fit mx-auto mt-44 bg-black py-20 px-20 rounded-xl shadow-2xl '>
            <LIT setPkpWallet={setPkpWallet} />
            <p className='text-center text-gray-300'>or</p>
            <ConnectButton />
          </div>
        ) : (
          <div>
            <h2 className='text-xl flex items-center gap-3 font-semibold text-gray-400 font-Poppins '>
              My Automated Jobs <BsArrowDownShort size={25} />
            </h2>

            <div className='flex flex-col gap-5 mt-10 '>
              {timeBasedJob.length > 0 &&
                timeBasedJob.map((job) => (
                  <Job
                    automationType='timebased'
                    contractAddress={job.contractAddress}
                    functionName={job.functionName}
                    isExecuted={job.isExecuted}
                    scheduledTime={job.scheduledTime}
                    jobName={job.name}
                    schedulerAddress={job.scheduledBy}
                    registeredDate={job.scheduledAt}
                    noOfTimesExectued={0}
                    listOfTimesFuncExectued={[]}
                  />
                ))}

              {/* Isko delete kr dena */}
              {customJob.length > 0 &&
                customJob.map((job) => (
                  <Job
                    automationType='customLogic'
                    contractAddress={job.contractAddress}
                    // functionName="Proxy Call"
                    isExecuted={job.executionCount > 0 ? true : false}
                    scheduledTime={job.scheduledTime}
                    jobName={job.name}
                    schedulerAddress={job.scheduledBy}
                    registeredDate={job.scheduledAt}
                    noOfTimesExectued={job.executionCount}
                    listOfTimesFuncExectued={job.executionTimeline}
                  />
                ))}

              {!customJob.length && !timeBasedJob.length ? (
                <p className='text-center py-20 bg-[#161618] text-white font-semibold font-Poppins text-3xl rounded-2xl'>
                  No jobs available
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
