import {
  createTimeBasedJobRecord,
  readTimeBasedJobRecordByAddress,
  readTimeBasedJobRecord,
  createNewUser,
  addTimeBasedJobReference,
  getUserInfo,
} from "../helpers/polybaseQueries.js";
import { ethers } from "ethers";
import randomstring from "randomstring";
import Job from "../models/Job.js";
import Account from "../models/Account.js";

export const postJobHandler = async (req, res, next) => {
  const {
    name,
    contractAddress,
    functionName,
    ABI,
    scheduledBy,
    params,
    scheduledTime,
  } = req.body;

  try {
    const formattedContractAddress = ethers.utils.getAddress(contractAddress);
    const randomId = randomstring.generate() + formattedContractAddress;
    const formattedScheduledBy = ethers.utils.getAddress(scheduledBy);

    const response = await createTimeBasedJobRecord(
      randomId,
      name,
      formattedContractAddress,
      ABI,
      functionName,
      formattedScheduledBy,
      params,
      Number(scheduledTime / 1000),
      Math.floor(Date.now() / 1000)
    );

    if (response.data === null) {
      throw new Error("Creating a time based job failed!");
    }

    const account = await Account.findOne({ address: formattedScheduledBy });

    if (!account) {
      const response = await createNewUser(formattedScheduledBy);
      if (response.data === null) {
        throw new Error("Creating a new user failed!");
      }

      const newAccount = new Account({
        address: formattedScheduledBy,
      });

      await newAccount.save();
    }
    //yaha pr atak rha hai saying Add .signer() to populate ctx.publicKey, see: https://polybase.xyz/docs/authentication
    const userResponse = await addTimeBasedJobReference(
      formattedScheduledBy,
      randomId
    );
    if (userResponse.data === null) {
      throw new Error("Adding time based reference failed");
    }

    const newJob = new Job({
      jobType: "timeBased",
      polybaseId: response.data.id,
    });

    await newJob.save();

    res
      .status(201)
      .json({ success: true, message: "Time based job created successfully" });
  } catch (err) {
    next(err);
  }
};

export const getJobHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await readTimeBasedJobRecord(id);

    if (response.data === null) {
      return res
        .status(404)
        .json({ success: false, response: "No Job Found!" });
    }

    res.status(201).json({ success: true, response: response.data });
  } catch (err) {
    next(err);
  }
};

export const getTimeBasedJobByUser = async (req, res, next) => {
  const { userAddress } = req.params;
  try {
    const jobs = await readTimeBasedJobRecordByAddress(userAddress);

    res.status(200).json({ success: true, response: jobs });
  } catch (err) {
    next(err);
  }
};
