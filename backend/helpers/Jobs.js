import {
  getTimeBasedReadInstance,
  markJobAsExecuted,
  getCustomJobReadInstance,
  increaseExecutionCount,
} from "./polybaseQueries.js";
import { createPublicClient, createWalletClient, http } from "viem";
import { filecoinCalibration } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { sendNotification } from "../push/index.js";
import { keeperAddress, ABI } from "../lib/constant.js";
import { ethers } from "ethers";

export const getAllJobs = async (jobIdArray) => {
  try {
    const timeBasedJobs = jobIdArray.filter(
      (jobDetail) => jobDetail.jobType === "timeBased"
    );

    const pendingJobDetails = [];

    for (const singleJob of timeBasedJobs) {
      const readJobDataInstance = getTimeBasedReadInstance(
        singleJob.polybaseId
      );
      pendingJobDetails.push(readJobDataInstance);
    }

    const promiseResponse = await Promise.all(pendingJobDetails);

    const jobDetails = promiseResponse.map((response) => {
      return response.data;
    });

    return jobDetails;
  } catch (err) {
    console.log(err);
  }
};

export const filterJobs = (jobDetails) => {
  const filteredJobs = jobDetails.filter((job) => {
    return (
      job?.isExecuted === false &&
      job?.scheduledTime <= Math.floor(Date.now() / 1000)
    );
  });

  return filteredJobs;
};

export const executeJob = async (jobDetail) => {
  // const publicClient = createPublicClient({
  //     chain: filecoinCalibration,
  //     transport: http()
  // });
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://pegorpc.com"
    );
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contract = new ethers.Contract(
      jobDetail.contractAddress,
      JSON.parse(jobDetail.ABI),
      wallet
    );

    await contract[jobDetail.functionName](...jobDetail.params);
    // const walletClient = createWalletClient({
    //   account: privateKeyToAccount("0x" + process.env.PRIVATE_KEY),
    //   chain: filecoinCalibration,
    //   transport: http(),
    // });

    // await walletClient.writeContract({
    //   address: jobDetail.contractAddress,
    //   abi: JSON.parse(jobDetail.ABI),
    //   functionName: jobDetail.functionName,
    //   args: jobDetail.params,
    // });

    await markJobAsExecuted(jobDetail.id);

    sendNotification(
      jobDetail.scheduledBy,
      "Cron Job Executed",
      `Hey! The time based cron job ${jobDetail.name} you scheduled earlier has been executed successfully 🙌. All the information regarding your cron job are as follows :- ${jobDetail}`
    );
  } catch (err) {
    console.log("err is", err);
  }
};

export const executeScheduledJobs = async (jobIdArray) => {
  try {
    const allJobs = await getAllJobs(jobIdArray);

    const scheduledJobs = filterJobs(allJobs);

    for (const scheduledJob of scheduledJobs) {
      await executeJob(scheduledJob);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllCustomJobs = async (jobIdArray) => {
  const customJobs = await jobIdArray.filter(
    (jobDetail) => jobDetail.jobType === "custom"
  );

  const pendingJobDetails = [];

  for (const singleJob of customJobs) {
    const readJobDataInstance = getCustomJobReadInstance(singleJob.polybaseId);
    pendingJobDetails.push(readJobDataInstance);
  }

  const promiseResponse = await Promise.all(pendingJobDetails);

  const jobDetails = promiseResponse?.map((response) => {
    return response.data;
  });

  return jobDetails;
};

export const executeCustomJobs = async (jobIdArray) => {
  try {
    const allJobs = await getAllCustomJobs(jobIdArray);

    const publicClient = createPublicClient({
      chain: filecoinCalibration,
      transport: http(),
    });
    const walletClient = createWalletClient({
      account: privateKeyToAccount("0x" + process.env.PRIVATE_KEY),
      chain: filecoinCalibration,
      transport: http(),
    });

    for (const job of allJobs) {
      const isExecutionNeeded = await publicClient.readContract({
        address: job.contractAddress,
        abi: JSON.parse(job.ABI),
        functionName: "check",
      });

      if (isExecutionNeeded === true) {
        await walletClient.writeContract({
          address: job.contractAddress,
          abi: JSON.parse(job.ABI),
          functionName: "executeCall",
          args: [job.data],
        });

        await increaseExecutionCount(job.id, Date.now() / 1000);

        sendNotification(
          job.scheduledBy,
          "Cron Job Executed",
          `Hey the custom cron job ${job.name} that you scheduled earlier has been executed successfully 🙌. All the information regarding your cron job are as follows :- ${job}`
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};
