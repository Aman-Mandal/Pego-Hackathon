import { fetchBeacon, HttpChainClient, HttpCachingChain } from "drand-client";
import { ethers } from "ethers";
export async function randomNumber(decimals) {
  const chainHash =
    "8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce";
  const publicKey =
    "868f005eb8e6e4ca0a47c8a77ceaa5309a47978a7c71bc5cce96366b5d7a569937c529eeda66c7293784a9402801af31";

  const options = {
    disableBeaconVerification: false,
    noCache: false,
    chainVerificationParams: { chainHash, publicKey },
  };

  const chain = new HttpCachingChain("https://api.drand.sh", options);
  const client = new HttpChainClient(chain, options);
  const theLatestBeacon = await fetchBeacon(client);
  console.log(theLatestBeacon.randomness);

  // Convert hexadecimal to decimal using ethers.js
  const decimalNumber = ethers.BigNumber.from(
    "0x" + theLatestBeacon.randomness
  ).toString();

  return (decimalNumber % decimals) + 1;
}
