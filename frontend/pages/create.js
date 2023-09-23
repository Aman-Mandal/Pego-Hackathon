import Introduction from '@/components/CreateJob/Introduction';
import ContractDetails from '@/components/CreateJob/ContractDetails';
import React, { useState } from 'react';
import SelectType from '@/components/CreateJob/SelectType';
import SelectFunction from '@/components/CreateJob/SelectFunction';
import JobDetails from '@/components/CreateJob/JobDetails';

const Create = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    automationType: 'time',
    contractAddress: '',
    contractAbi: [],
    function: '',
    inputParams: [],
    cronTime: '',
    adminAddress: '',
    jobName: '',
    notification: false,
  });

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <Introduction
          setPage={setPage}
          page={page}
        />
      );
    } else if (page === 1) {
      return (
        <SelectType
          setPage={setPage}
          page={page}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (page === 2) {
      return (
        <ContractDetails
          setPage={setPage}
          page={page}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (page === 3) {
      return (
        <SelectFunction
          setPage={setPage}
          page={page}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (page === 4) {
      return (
        <JobDetails
          setPage={setPage}
          page={page}
          formData={formData}
          setFormData={setFormData}
        />
      );
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[95vh] bg-[#1C1C1F]'>
      <>{PageDisplay()}</>
    </div>
  );
};

export default Create;
