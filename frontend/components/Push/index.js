import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = "5ccd21e637fdc56058a885258b6b2578224b2ebff2c6625ef06ded430875cce5"; // channel private key
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

export const sendNotification = async (address, title, msg) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3,
      identityType: 2,
      notification: {
        title: title,
        body: msg,
      },
      recipients: "eip155:5:" + address, // your address
      payload: {
        title: title,
        body: msg,
        cta: "",
        img: "",
      },
      channel: "eip155:5:0xe97E66C94383fD52Ee9f9dB8ADDcdd2682eA452c", // your channel address
      env: "staging",
    });
    console.log("apiResponse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};
