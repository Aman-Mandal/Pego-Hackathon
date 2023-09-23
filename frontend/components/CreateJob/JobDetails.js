import React, { useState } from "react";
import { BackendUri } from "@/lib/constants";
import ProcessingAutomationModal from "../UI/Modals/ProcessingAutomationModal";
import NextButtons from "../UI/NextButtons";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { useAccount } from "wagmi";
import { registerKeeper } from "@/utils";
import { getWalletClient } from "@wagmi/core";
import { ethers } from "ethers";
import { keeperABI } from "@/constants";
import SuccessModal from "@/components/UI/Modals/SuccessModal";

const JobDetails = ({ setPage, page, formData, setFormData }) => {
  const [cronTime, setCronTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTimeType, setSelectedTimeType] = useState("custom");
  const [customTime, setCustomTime] = useState(0);

  const previousPageHandler = () => {
    if (formData.automationType === "time") {
      setPage((currPage) => currPage - 1);
    } else if (formData.automationType === "custom") {
      setPage((currPage) => currPage - 2);
    }
  };
  const submitHandler = () => {
    setShowModal(true);
  };

  const createJobHandler = async (address, pkpWallet) => {
    setLoading(true);
    try {
      if (formData.automationType === "time") {
        console.log('here');
        const data = await fetch(`${BackendUri}/job/timebased`, {
          method: "POST",
          body: JSON.stringify({
            name: formData.jobName,
            contractAddress: formData.contractAddress,
            functionName: formData.function.name,
            ABI: formData.contractAbi,
            scheduledBy: address ? address : pkpWallet.address,
            params: formData.inputParams,
            scheduledTime: customTime,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await data.json();
        console.log(response);
      } else if (formData.automationType === "custom") {
        const encodedData = ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32);
        console.log(formData);
        const data = await fetch(`${BackendUri}/job/custom`, {
          method: "POST",
          body: JSON.stringify({
            name: formData.jobName,
            contractAddress: formData.contractAddress,
            value: Number(formData.amount),
            data: encodedData,
            scheduledBy: address ? address : pkpWallet.address,
            ABI: formData.contractAbi,
            scheduledTime: customTime, ///this needs to be manual time like 4 hrs later or so - done
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await data.json();
        console.log('response', response);
      }
      await registerKeeper(
        formData.contractAddress,
        formData.amount,
        pkpWallet
      );

      setLoading(false);
      setShowModal(false);
      setSuccessModal(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedTimeType(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="text-white w-[600px] font-Poppins bg-[#181818] py-10 px-10 rounded-xl border border-gray-900 shadow-md">
        <h2 className="text-2xl font-semibold mb-7">Job details</h2>

        <div className="flex flex-col ">
          {formData.automationType === "time" ? (
            <>
              <label className="text-sm text-gray-400">
                Choose time format
              </label>
              <select
                onChange={handleSelectChange}
                class="bg-[#232327] outline-none border border-gray-900 mb-4  py-3 px-2 text-white text-sm rounded-lg "
              >
                <option value={"custom"} selected>
                  Custom date & time
                </option>
                <option value={"cron"}>Cron Time</option>
              </select>

              {selectedTimeType === "cron" ? (
                <>
                  <label className="text-sm text-gray-400">
                    Cron expression
                  </label>
                  <input
                    onChange={(e) => {
                      setCronTime(e.target.value);
                      setFormData({ ...formData, cronTime: e.target.value });
                    }}
                    required
                    value={cronTime}
                    type="text"
                    placeholder="* * * * *"
                    className="bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-4"
                  />
                  <div className="flex gap-4 flex-wrap">
                    <p
                      onClick={() => {
                        setCronTime("*/15 * * * *");
                        setFormData({ ...formData, cronTime: "*/15 * * * *" });
                      }}
                      className="text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800"
                    >
                      Every 15 mins
                    </p>
                    <p
                      onClick={() => {
                        setCronTime("0 * * * *");
                        setFormData({ ...formData, cronTime: "0 * * * *" });
                      }}
                      className="text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800"
                    >
                      Every hour
                    </p>
                    <p
                      onClick={() => {
                        setCronTime("0 * * * *");
                        setFormData({ ...formData, cronTime: "0 * * * *" });
                      }}
                      className="text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800"
                    >
                      First of every month
                    </p>
                    <p
                      onClick={() => {
                        setCronTime("30 */2 * * 1-5");
                        setFormData({
                          ...formData,
                          cronTime: "30 */2 * * 1-5",
                        });
                      }}
                      className="text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800"
                    >
                      30 mins past every two hours on every weekday
                    </p>
                    <p
                      onClick={() => {
                        setCronTime("0 8,16 * * 1,3,5");
                        setFormData({
                          ...formData,
                          cronTime: "0 8,16 * * 1,3,5",
                        });
                      }}
                      className="text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800"
                    >
                      Monday, Wednesday, Friday at 8:00 & 16:00
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <label className="text-sm text-gray-400 mt-4">
                    Custom date & time
                  </label>
                  <input
                    onChange={(e) => {
                      const timeString = e.target.value;
                      const date = new Date(timeString);
                      setCustomTime(date.getTime());
                    }}
                    type="datetime-local"
                    className="bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-4"
                  />
                </>
              )}
            </>
          ) : null}

          <label className="text-sm text-gray-400 mt-4">Job name</label>
          <input
            required
            onChange={(event) => {
              setFormData({ ...formData, jobName: event.target.value });
            }}
            value={formData.jobName}
            type="text"
            placeholder=""
            className="bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-6"
          />

          <label className="text-sm text-gray-400">Amount</label>
          <input
            required
            onChange={(event) => {
              setFormData({ ...formData, amount: event.target.value });
            }}
            value={formData.amount}
            type="text"
            placeholder=""
            className="bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-4"
          />
          <p className="mb-6 text-gray-400 text-sm ml-2">
            This amount will be used as gas fee for running this job
          </p>

          <div className="flex gap-2 items-start">
            <input
              required
              onChange={(event) => {
                setFormData({
                  ...formData,
                  notification: event.target.checked,
                });
              }}
              value={formData.notification}
              type="checkbox"
              className="bg-[#232327] h-4 w-4 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-10"
            />
            <label>Enable notifications for task automation</label>
          </div>
        </div>
      </div>
      {/* <div className='flex items-center justify-between mt-4'> */}
      <NextButtons
        previousPageHandler={previousPageHandler}
        nextPageHandler={submitHandler}
      />
      {/* <BsArrowLeftShort
          onClick={previousPageHandler}
          size={45}
          className={`${'bg-[#271E5D] text-purple-300 hover:bg-[#443592]'}  rounded-full p-1 cursor-pointer`}
        /> */}
      {/* {address ? (
          <button
            onClick={submitHandler}
            className='bg-[#271E5D] text-purple-300 hover:bg-[#443592] rounded-full p-2 cursor-pointer'>
            create Job
          </button>
        ) : (
          <ConnectButton />
        )} */}
      {/* </div> */}

      {showModal && (
        <ProcessingAutomationModal
          createJobHandler={createJobHandler}
          onClose={() => setShowModal(false)}
          loading={loading}
        />
      )}

      {successModal && <SuccessModal onClose={() => setSuccessModal(false)} />}
    </div>
  );
};

export default JobDetails;
