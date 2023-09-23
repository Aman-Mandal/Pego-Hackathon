import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useRouter } from "next/router";
import { ens } from "../ENS";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [ensName, setEnsName] = useState("");

  useEffect(() => {
    const fetchEns = async () => {
      const { ensName } = await ens(address);
      setEnsName(ensName);
    };
    fetchEns();
  }, [address]);

  return (
    <nav
      className={`flex justify-between px-20 py-4 border-b border-gray-900 ${
        router.pathname === "/" ? "bg-white" : "bg-[#18181A]"
      }`}
    >
      <p
        onClick={() => {
          router.push("/");
        }}
        className={`font-semibold font-Poppins text-2xl cursor-pointer ${
          router.pathname === "/" ? "text-black" : "text-[#EDEDEF]"
        }`}
      >
        PegoCall.
      </p>
      <div className="flex gap-8 items-center font-Poppins">
        <p
          onClick={() => {
            router.push("/");
          }}
          className={`${
            router.pathname === "/" ? "text-black" : "text-[#EDEDEF]"
          } cursor-pointer`}
        >
          Home
        </p>

        <p
          onClick={() => {
            router.push("/create");
          }}
          className={`${
            router.pathname === "/" ? "text-black" : "text-[#EDEDEF]"
          } cursor-pointer`}
        >
          Create Job
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className={`flex items-center justify-center font-Poppins gap-2 py-2 px-4 ${
            router.pathname === "/" ? "bg-black " : "bg-[#443592]"
          }  rounded-xl text-[#EDEDEF]`}
        >
          {router.pathname === "/dashboard" ? (
            <p>
              {ensName
                ? ensName
                : `${address?.slice(0, 5)}...${address?.slice(
                    address?.length - 3
                  )}`}
            </p>
          ) : (
            "Go to Dashboard"
          )}

          <span>
            <BsArrowRightShort size={22} />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
