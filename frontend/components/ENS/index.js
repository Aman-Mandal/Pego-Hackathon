import { ethers } from "ethers";

export const ens = async (address) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth.llamarpc.com"
  );
  const ensName = await provider.lookupAddress(address);
  if (ensName == null) {
    return { ensName: null, ensAvatarUrl: null };
  }
  console.log(ensName);
  const ensAvatarUrl = await provider.getAvatar(ensName);
  console.log(ensName, ensAvatarUrl);
  return { ensName, ensAvatarUrl };
};
