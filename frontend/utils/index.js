import { contractABI, contractAddress } from "@/constants";
import { waitForTransaction } from "@wagmi/core";
import { ethers } from "ethers";
import { writeContract } from "@wagmi/core";

export const getContract = async (signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};
export const registerKeeper = async (address, amount) => {
  try {
    const amountInWei = ethers.utils.parseEther(amount);
    const { hash } = await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "registerKeeper",
      args: [address, amountInWei],
      value: amountInWei,
    });
    await waitForTransaction({
      hash: hash,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deposit = async (address, amount) => {
  try {
    const amountInWei = ethers.utils.parseEther(amount);
    const { hash } = await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "deposit",
      args: [address],
      value: amountInWei,
    });
    await waitForTransaction({
      hash: hash,
    });
  } catch (err) {
    console.log(err);
  }
};

export const withdraw = async (address, amount) => {
  try {
    const amountInWei = ethers.utils.parseEther(amount);
    const { hash } = await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "deposit",
      args: [address, amountInWei],
      value: 0,
    });
    await waitForTransaction({
      hash: hash,
    });
  } catch (err) {
    console.log(err);
  }
};

export function convertEpochToLocalTime(epoch) {
  // convert epoch seconds to milliseconds
  const date = new Date(epoch * 1000);

  // options for date format
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // format the date
  return date.toLocaleString("en-US", options).replace(", ", " at ");
}
