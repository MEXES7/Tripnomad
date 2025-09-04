/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { formatDate2 } from "@/components/dateRangePicker";
import { ArrowBack } from "@/components/icons/icons";
import { useModalStore } from "@/store/modalStore";
import { useFormStore } from "@/store/planTripStore";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { formData } = useFormStore();
  const openModal = useModalStore((state) => state.openModal);
  console.log(formData.dateRange.start);
  const startDate = formatDate2(formData.dateRange.start);
  const endDate = formatDate2(formData.dateRange.end);
  console.log(startDate, endDate);
  return (
    <div className="relative bg-[#3B4D52] ">
      <div className="relative z-10 h-[41.5rem] max-w-[1440px] mx-auto   px-[6.6rem]  ">
        <div className="flex gap-11 pt-[20.4rem]">
          <button onClick={() => window.history.back()}>
            <ArrowBack />
          </button>
          <h1 className="font-montserrat font-[900] text-[4.8rem] text-white">
            Here&apos;s Your Top Travel Pick
          </h1>
        </div>
        <div className="w-[132rem] h-[8.3rem] bg-white flex gap-[2.4rem] items-center p-[1rem]">
          <div className="flex justify-between items-center w-[110.4rem]">
            <span className="flex items-center border-[0.1rem] rounded-[1rem] border-[#DFDFDF] text-[1.4rem] text-[#5D5D5D] p-[0.5rem] font-opensans w-[15.1rem] h-[3.5rem] py-[0.8rem] px-[1.2rem] shadow-md">
              Budget: ${formData.budget}{" "}
            </span>{" "}
            <div className="flex items-center gap-[0.6rem] border-[0.1rem] rounded-[1rem] border-[#DFDFDF] text-[1.4rem] text-[#5D5D5D] p-[0.5rem] font-opensans w-[26.1rem] h-[3.5rem] py-[0.8rem] px-[1.2rem] shadow-md">
              Passport:{" "}
              <div className="flex gap-[1rem]">
                {formData.passport.map((img) => (
                  <div
                    key={img.name}
                    className="flex gap-[0.4rem] items-center"
                  >
                    <Image
                      src={img.flag}
                      alt="passport flag"
                      width={14}
                      height={14}
                      className="w-[1.4rem] h-[1.4rem] object-cover rounded-full  border-[0.2rem] border-[#8E6D4E]"
                    />
                    <span className="whitespace-nowrap">{img.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-[0.6rem] border-[0.1rem] rounded-[1rem] border-[#DFDFDF] text-[1.4rem] text-[#5D5D5D] p-[0.5rem] font-opensans w-[19.2rem] h-[3.5rem] py-[0.8rem] px-[1.2rem] shadow-md">
              Travel from:{" "}
              <div className="flex items-center gap-[0.4rem]">
                <Image
                  src={formData.departure?.flag || "no-image.svg"}
                  alt="passport flag"
                  width={16}
                  height={16}
                  className="w-[1.4rem] h-[1.4rem] object-cover rounded-full  border-[0.2rem] border-[#8E6D4E]"
                />
                <span>{formData.departure?.name}</span>
              </div>
            </div>
            <div className=" flex items-center gap-[0.6rem] border-[0.1rem] rounded-[1rem] border-[#DFDFDF] text-[1.4rem] text-[#5D5D5D] p-[0.5rem] font-opensans w-[19.2rem] h-[3.5rem] py-[0.8rem] px-[1.2rem] shadow-md">
              <span>Destination:</span>
              <div className="flex items-center gap-[0.4rem]">
                <Image
                  src={formData.destination?.flag! || "no-image.svg"}
                  alt="passport flag"
                  width={16}
                  height={16}
                  className="w-[1.4rem] h-[1.4rem] object-cover rounded-full  border-[0.2rem] border-[#8E6D4E]"
                />
                <span>{formData.destination?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-[0.6rem] border-[0.1rem] rounded-[1rem] border-[#DFDFDF] text-[1.4rem] text-[#5D5D5D] p-[0.5rem] font-opensans w-[26.1rem] h-[3.5rem] py-[0.8rem] px-[1.2rem] shadow-md">
              Date:{startDate} - {endDate}
              {/* Date: {formData.dateRange.start} */}
            </div>
          </div>

          <button
            onClick={() => openModal("planTrip")}
            className="bg-[#064244] w-[17.2rem] h-[4.9rem] py-[1.2rem] px-[4.8rem] font-semibold text-white font-urbanist text-[1.6rem] whitespace-nowrap border-[0.1rem] border-[#064244] rounded-[0.4rem]"
          >
            Edit Search
          </button>
        </div>
      </div>
      <Image
        src="/assets/overlay.svg"
        alt="overlay"
        fill
        className="object-cover z-20 pointer-events-none"
      />
    </div>
  );
};

export default Header;
