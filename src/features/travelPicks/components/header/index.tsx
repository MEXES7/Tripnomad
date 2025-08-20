/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { formatDate } from "@/components/dateRangePicker";
import { ArrowBack } from "@/components/icons/icons";
import { useModalStore } from "@/store/modalStore";
import { useFormStore } from "@/store/planTripStore";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { formData } = useFormStore();
  const openModal = useModalStore((state) => state.openModal);

  const startDate = formatDate(formData.dateRange.start);
  const endDate = formatDate(formData.dateRange.end);
  return (
    <div className="relative bg-[#3B4D52] ">
      <div className="relative z-10 h-[25rem] max-w-[1440px] mx-auto  pt-[13rem] px-[6rem]  ">
        <div className="flex gap-11">
          <button onClick={() => window.history.back()}>
            <ArrowBack />
          </button>
          <h1 className="font-montserrat font-[900] text-[3rem] text-white">
            Here&apos;s Your Top Travel Pick
          </h1>
        </div>
        <div className="w-[131rem] h-[5rem] bg-white flex gap-[2rem] items-center px-[2rem]">
          <span className="border-[0.1rem] rounded-[1.2rem] border-black text-[1.4rem] p-[0.5rem] font-normal">
            Budget: {formData.budget}{" "}
          </span>{" "}
          <div className="flex border-[0.1rem] rounded-[1.2rem] border-black text-[1.4rem] p-[0.5rem] font-normal">
            Passport:{" "}
            <div className="flex gap-[1rem]">
              {formData.passport.map((img) => (
                <div key={img.name} className="flex">
                  <Image
                    src={img.flag}
                    alt="passport flag"
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                  <span>{img.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center border-[0.1rem] rounded-[1.2rem] border-black text-[1.4rem] p-[0.5rem] font-normal ">
            Visa:{" "}
            <Image
              src={formData.visaType?.flag!}
              alt="passport flag"
              width={16}
              height={16}
            />
          </div>
          <div className="flex items-center border-[0.1rem] rounded-[1.2rem] border-black text-[1.4rem] p-[0.5rem] font-normal">
            Travel from:{" "}
            <Image
              src={formData.departure?.flag!}
              alt="passport flag"
              width={16}
              height={16}
            />
          </div>
          <div className="flex border-[0.1rem] rounded-[1.2rem] border-black text-[1.4rem] p-[0.5rem] font-normal">
            Travel to:{" "}
            <Image
              src={formData.destination?.flag!}
              alt="passport flag"
              width={16}
              height={16}
            />
          </div>
          <div className="flex border-[0.1rem] rounded-[1.2rem] border-black text-[1.4rem] p-[0.5rem] font-normal">
            Date:{startDate} -{endDate}
          </div>
          <button onClick={() => openModal("planTrip")}>Edit Search</button>
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
