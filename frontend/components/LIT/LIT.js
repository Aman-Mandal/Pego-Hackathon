import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import * as LitJsSdk_blsSdk from "@lit-protocol/bls-sdk";
import * as LitJsSdk_authHelpers from "@lit-protocol/auth-helpers";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
const RELAY_API_URL = "https://relay-server-staging.herokuapp.com";
const API_KEY = process.env.NEXT_PUBLIC_LIT_API_KEY;
import { utils } from "ethers";
import Loader from "../UI/Loader";
export default function LIT(props) {
  const [started, setStarted] = useState(false);

  const handleLoggedInToGoogle = async (credentialResponse) => {
    try {
      setStarted(true);
      const requestId = await mintPkpWithRelayer(credentialResponse);
      await pollRequestUntilTerminalState(requestId);
      await handleStoreEncryptionConditionNodes(credentialResponse);
      setStarted(false);
    } catch (e) {
      console.log(e);
      setStarted(false);
    }
  };

  const mintPkpWithRelayer = async (credentialResponse) => {
    const mintRes = await fetch(`${RELAY_API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: credentialResponse.credential,
      }),
    });

    if (mintRes.status < 200 || mintRes.status >= 400) {
      return null;
    } else {
      const resBody = await mintRes.json();
      return resBody.requestId;
    }
  };
  const pollRequestUntilTerminalState = async (requestId) => {
    if (!requestId) {
      return;
    }

    const maxPollCount = 20;
    for (let i = 0; i < maxPollCount; i++) {
      const getAuthStatusRes = await fetch(
        `${RELAY_API_URL}/auth/status/${requestId}`,
        {
          headers: {
            "api-key": API_KEY,
          },
        }
      );

      if (getAuthStatusRes.status < 200 || getAuthStatusRes.status >= 400) {
        return;
      }

      const resBody = await getAuthStatusRes.json();

      if (resBody.error) {
        // exit loop since error
        return;
      } else if (resBody.status === "Succeeded") {
        return;
      }

      // otherwise, sleep then continue polling
      // await new Promise((r) => setTimeout(r, 1));
    }

    // at this point, polling ended and still no success, set failure status
  };

  async function getLitNodeClient() {
    const litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: "serrano",
    });
    await litNodeClient.connect();

    return litNodeClient;
  }

  async function hashBytes({ bytes }) {
    const hashOfBytes = await crypto.subtle.digest("SHA-256", bytes);
    const hashOfBytesStr = LitJsSdk.uint8arrayToString(
      new Uint8Array(hashOfBytes),
      "base16"
    );
    return hashOfBytesStr;
  }

  async function getSessionSigs(
    litNodeClient,
    encryptedSymmetricKey,
    authMethod
  ) {
    let authenticatedPkpPublicKey;
    let authSignature;

    // this will be fired if auth is needed. we can use this to prompt the user to sign in
    const authNeededCallback = async ({ resources, expiration, statement }) => {
      console.log("authNeededCallback fired");

      // Generate authMethod.
      const authMethods = [authMethod];

      // Get AuthSig
      const { authSig, pkpPublicKey } = await litNodeClient.signSessionKey({
        authMethods,
        statement,
        expiration:
          expiration ||
          new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
        resources: resources,
      });

      authSignature = authSig;
      authenticatedPkpPublicKey = pkpPublicKey;

      return authSig;
    };

    const hashedEncryptedSymmetricKeyStr = await hashBytes({
      bytes: new Uint8Array(encryptedSymmetricKey),
    });

    // Construct the LitResource
    const litResource =
      new LitJsSdk_authHelpers.LitAccessControlConditionResource(
        hashedEncryptedSymmetricKeyStr
      );

    // Get the session sigs
    const sessionSigs = await litNodeClient.getSessionSigs({
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      chain: "ethereum",
      resourceAbilityRequests: [
        {
          resource: litResource,
          ability:
            LitJsSdk_authHelpers.LitAbility.AccessControlConditionDecryption,
        },
      ],
      switchChain: false,
      authNeededCallback,
    });

    return {
      sessionSigs,
      authenticatedPkpPublicKey: authenticatedPkpPublicKey,
      authSignature: authSignature,
    };
  }
  async function handleStoreEncryptionConditionNodes(credentialResponse) {
    // get the user a session with it
    const litNodeClient = await getLitNodeClient();

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      "this is a secret message"
    );

    // key parameter - encrypt symmetric key then hash it
    const encryptedSymmetricKey = LitJsSdk_blsSdk.wasmBlsSdkHelpers.encrypt(
      LitJsSdk.uint8arrayFromString(litNodeClient.subnetPubKey, "base16"),
      symmetricKey
    );

    // get the session sigs
    const { sessionSigs, authenticatedPkpPublicKey, authSignature } =
      await getSessionSigs(
        litNodeClient,
        encryptedSymmetricKey,
        litNodeClient.generateAuthMethodForGoogleJWT(
          credentialResponse.credential
        )
      );

    const pkpEthAddress = publicKeyToAddress(authenticatedPkpPublicKey);

    const unifiedAccessControlConditions =
      getUnifiedAccessControlConditions(pkpEthAddress);

    // store the decryption conditions
    await litNodeClient.saveEncryptionKey({
      unifiedAccessControlConditions,
      symmetricKey,
      encryptedSymmetricKey,
      sessionSigs, // Not actually needed for storing encryption condition.
      chain: "ethereum",
    });

    await walletSetup(authSignature, authenticatedPkpPublicKey);

    return {
      encryptedSymmetricKey,
      encryptedString,
      authenticatedPkpPublicKey,
    };
  }

  function getUnifiedAccessControlConditions(pkpEthAddress) {
    return [
      {
        conditionType: "evmBasic",
        contractAddress: "",
        standardContractType: "",
        chain: "mumbai",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: pkpEthAddress || "0x3c3CA2BFFfffE532aed2923A34D6c1F9307F8076",
        },
      },
    ];
  }

  function publicKeyToAddress(publicKey) {
    return utils.computeAddress(`0x${publicKey}`);
  }

  async function walletSetup(authSig, pkpPublicKey) {
    try {
      const pkpEthersWallet = new PKPEthersWallet({
        controllerAuthSig: authSig,
        pkpPubKey: pkpPublicKey,
        rpc: "https://rpc.ankr.com/filecoin_testnet",
      });

      await pkpEthersWallet.init();

      props.setPkpWallet(pkpEthersWallet);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="px-6 py-2">
        {started ? (
          <Loader inComp={true} />
        ) : (
          <GoogleLogin
            onSuccess={handleLoggedInToGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
            clientId="260356816232-qm10ch3k345h9jh2uhh7ma71f3m00pvo.apps.googleusercontent.com"
          />
        )}
      </div>
    </>
  );
}
