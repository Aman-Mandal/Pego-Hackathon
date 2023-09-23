import Image from "next/image";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <section>
      <header className="flex mx-auto mt-3 h-[90vh] overflow-hidden ">
        <div className="flex-[0.4] px-20 flex flex-col justify-center">
          <h2 className="text-8xl font-Poppins font-medium leading-[105px]">
            All-in-one <br />
            automation <br />
            platform
          </h2>

          <p className="font-Poppins text-xl font-normal mt-10">
            Enabling Web3 developers to automate and operate smart contract
            functions with ease on{" "}
            <span className="text-[#6736F1] font-semibold">Pego Network</span>.
          </p>

          <button
            onClick={() => {
              router.push("/create");
            }}
            className="bg-[#1e1e1e] flex items-center justify-center gap-2 py-3 w-[230px] mt-10 text-white rounded-xl text-2xl"
          >
            Launch App{" "}
            <span>
              <BsArrowRightShort size={25} />
            </span>
          </button>
        </div>

        <div className="flex-[0.6]  ">
          <Image
            className="absolute -right-72 -z-10 top-10 -rotate-[20deg]"
            src="/svgs/hero.svg"
            height={1000}
            width={1000}
            alt="hero img"
          />
        </div>
      </header>
    </section>
  );
};

export default Header;
