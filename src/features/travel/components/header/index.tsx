"use client";
import { ArrowBack } from "@/components/icons/icons";
import { useRouter } from "next/navigation";

import React from "react";

const HeaderDetails = () => {
  const router = useRouter();
  return (
    <div
      className="relative h-[41.5rem] w-full bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/interlaken.svg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="max-w-[144rem] mx-auto relative z-10 top-[24.3rem] left-[5.6rem]">
        <div className="flex gap-[3rem] items-center ">
          <button onClick={() => router.push("/travel-pick")}>
            <ArrowBack />
          </button>
          <span className="text-[#ffffff] text-[4.6rem] font-montserrat font-[900]">
            Interlaken, Switzerland
          </span>
        </div>{" "}
      </div>
    </div>
  );
};

export default HeaderDetails;
