import {
  BoxIcon,
  ClockIcon,
  HomeIcon,
  LocationIcon,
  PlaneIcon,
} from "@/components/icons/icons";
import { useTripStore } from "@/store/tripStore";
import Image from "next/image";
import React from "react";

const TravelCard = () => {
  const { travels, setSelected } = useTripStore();
  return (
    <div className="bg-[#F8F8F8]">
      <div className="flex flex-col gap-[2rem]  justify-center px-[6rem] pt-[2rem] overflow-y-auto max-w-[1440px] mx-auto">
        <div className="flex items-start gap-[1.2rem] ">
          <LocationIcon />
          <div className="flex flex-col gap-[0.8rem]">
            <span className="font-montserrat font-semibold text-[2.4rem]">
              Switzerland, Jumeirah Villa
            </span>
            <span className="font-opensans font-normal text-[1.6rem] text-[#5D5D5D]">
              203 Villas available in switzerland
            </span>
          </div>
        </div>
        <div className="flex flex-wrap  gap-[2rem]  py-[2rem] gap-y-[2.4rem]">
          {travels.map((item) => (
            <div
              key={item.id}
              className="py-[2.4rem]  px-[1.8rem] bg-[#FFFFFF] border-[0.2rem] border-[#E4E7EC] rounded-[1rem]"
            >
              <div className="relative w-[38.1rem] h-[16.6rem]">
                <Image
                  src={item.image}
                  alt="travel image"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="flex h-[7.3rem] py-[1.6rem] justify-between border-b-[0.1rem]">
                <div className="flex gap-[1rem] items-center">
                  <Image src={item.flag} alt="flag" width={24} height={24} />{" "}
                  <span className="font-opensans font-normal text-[1.8rem] text-[#211408]">
                    {item.location}
                  </span>
                </div>
                <span className="font-opensans font-normal text-[1.8rem] text-[#211408]">
                  {item.visaRequirement}
                </span>
              </div>
              <div className="flex h-[7.3rem] py-[1.6rem] justify-between border-b-[0.1rem]">
                <div className="flex gap-[1.2rem] items-center">
                  <span>
                    <PlaneIcon />
                  </span>
                  <div className="flex flex-col gap-[0.4rem]">
                    <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                      Flight Estimate
                    </span>

                    <span className="font-[700] text-[1.2rem] font-opensans text-[#211408]">
                      {item.flight}
                    </span>
                  </div>
                </div>
                <div className="flex gap-[1.2rem] items-center">
                  <ClockIcon />
                  <div className="flex flex-col gap-[0.4rem]">
                    <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                      Date
                    </span>
                    <span className="font-[700] text-[1.2rem] font-opensans text-[#211408]">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex h-[7.3rem] py-[1.6rem] justify-between border-b-[0.1rem]">
                <div className="flex gap-[1.2rem] items-center">
                  <span>
                    <HomeIcon />
                  </span>
                  <div className="flex flex-col gap-[0.4rem]">
                    <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                      Accomodation
                    </span>
                    <span className="font-[700] text-[1.2rem] font-opensans text-[#211408]">
                      {item.accomodationFee}
                    </span>
                  </div>
                </div>
                <div className="flex gap-[1.2rem] items-center">
                  <BoxIcon />
                  <div className="flex flex-col gap-[0.4rem]">
                    <span className="font-opensans font-normal text-[1.4rem] text-[#211408] ">
                      Total Package
                    </span>
                    <span className="font-[700] text-[1.2rem] font-opensans text-[#211408]">
                      {item.total}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelected(item.id)}
                className="font-semibold font-urbanist text-[1.4rem] text-[#ffffff] py-[1.2rem] px-[4.8rem] bg-[#3AA5A8] w-full h-[4.9rem] rounded-[0.4rem]"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
