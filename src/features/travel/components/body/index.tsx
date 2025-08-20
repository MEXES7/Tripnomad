import {
  ACIcon,
  BeachIcon,
  DiningIcon,
  GymIcon,
  SpaIcon,
  SwimIcon,
  WifiIcon,
} from "@/components/icons/icons";
import Image from "next/image";
import React, { JSX } from "react";

const travel = [
  {
    id: 1,
    firstImage: "/assets/airbnb-img-1.svg",
    secondImage: "/assets/airbnb-img-2.svg",
    thirdImage: "/assets/airbnb-img-2.svg",
    map: "/assets/airbnb-img-map.svg",
    bnbName: "B&B Inns in Interlaken, Switzerland ",
    address: "439 Nakia Avenue Apt.634",
    about:
      "Lorem ipsum dolor sit amet consectetur. Augue risus enim tortor gravida viverra arcu mi erat ac. Sit blandit suscipit maecenas mauris sed vel malesuada. Pellentesque blandit pharetra vitae quis integer nibh sed. Id feugiat sagittis et nunc ac turpis nam.",
    airlineName: "Turkish Airline",
    flightDuration: "8h 50m",
    date: "July 10-July 11",
    flightPrice: "$650",
    accomodation: "$400",
    other: "$400",
    total: "$1850",
    link: "https://verify.tripnomad360.com/",
    ratingAvg: 4,
    rating: 120,
    amenities: ["Pool", "Gym", "Beach", "Wifi", "AC", "Spa", "Dining"],
  },
];

const amenitiesIcons: Record<string, JSX.Element> = {
  Pool: <SwimIcon className="width-[1.6rem] h-[1.6rem]" />,
  Gym: <GymIcon />,
  Beach: <BeachIcon />,
  Wifi: <WifiIcon />,
  AC: <ACIcon />,
  Spa: <SpaIcon />,
  Dining: <DiningIcon />,
};

const TravelDetails = () => {
  return (
    <div className="bg-[#F8F8F8]">
      <div className="max-w-[1440px] mx-auto px-[6rem] pt-[5rem]  pb-[10rem]">
        {travel.map((item) => (
          <div key={item.id} className="flex flex-col gap-[2.8rem]">
            <div className="flex justify-between">
              <div className="relative w-[98.5rem] h-[46.6rem]">
                <Image
                  src={item.firstImage}
                  alt="image1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-[1.4rem]">
                <div className="relative w-[31.5rem] h-[22.6rem]">
                  <Image
                    src={item.secondImage}
                    alt="image1"
                    fill
                    className="object-cover"
                  />
                </div>{" "}
                <div className="relative w-[31.5rem] h-[22.6rem]">
                  <Image
                    src={item.thirdImage}
                    alt="image1"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-[2.6rem] w-[76.3rem]">
                <div className="flex flex-col gap-[1.2rem] border-b-[0.1rem] border-dashed pb-[2rem]">
                  <h1 className="font-opensans font-semibold text-[2.4rem]">
                    {item.bnbName}
                  </h1>
                  <span className="font-medium font-opensans text-[1.6rem] text-[#5D5D5D]">
                    {item.address}
                  </span>
                </div>
                <div className="flex flex-col gap-[1.2rem] border-b-[0.1rem] border-dashed pb-[2.8rem]">
                  <h2 className="font-medium font-opensans text-[1.6rem]">
                    About this accomodation
                  </h2>
                  <span className="font-normal font-opensans text-[1.4rem] text-[#5D5D5D]">
                    {item.about}
                  </span>
                </div>
                <div className="flex flex-col gap-[1.2rem] border-b-[0.1rem] border-dashed pb-[2.8rem]">
                  <h2 className="font-medium font-opensans text-[1.6rem]">
                    Amenties
                  </h2>
                  <div className="flex  gap-[2.2rem] ">
                    {item.amenities.map((a) => (
                      <div
                        key={a}
                        className="flex flex-col gap-[1rem] bg-[#E1E1E1] w-[7.1rem] h-[6rem] py-[1rem] px-[2.1rem] items-center rounded-[0.8rem]"
                      >
                        {amenitiesIcons[a]} <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[1.2rem]">
                  <h2 className="font-medium font-opensans text-[1.6rem]">
                    Map
                  </h2>
                  <div className="relative w-[76.3rem] h-[26.9rem]">
                    <Image src={item.map} alt="map" fill />
                  </div>
                </div>
              </div>
              <div className="bg-[#ffffff] border-[0.1rem] border-[#E4E7EC] py-[2.4rem] px-[1.2rem] flex flex-col gap-[2.9rem] w-[48.5rem]">
                <div className="flex flex-col gap-[3.2rem]">
                  <div className="flex flex-col gap-[3.2rem]">
                    <div className="flex flex-col gap-[1.2rem]">
                      <h1 className="p-[2rem] font-opensans font-semibold text-[2.4rem]">
                        Flight Details
                      </h1>
                      <div className="flex flex-col gap-[2.2rem]">
                        <div className="border-y-[0.1rem] border-dashed border-[#E4E7EC] flex justify-between py-[1.6rem] px-[2rem]">
                          <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                            Airline Name
                          </span>
                          <span className="font-opensans font-bold text-[#211408] text-[1.4rem]">
                            {item.airlineName}
                          </span>
                        </div>
                        <div className="border-y-[0.1rem] border-dashed border-[#E4E7EC] flex justify-between py-[1.6rem] px-[2rem]">
                          <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                            Flight Duration
                          </span>
                          <span className="font-opensans font-bold text-[#211408] text-[1.4rem]">
                            {item.flightDuration}
                          </span>
                        </div>
                        <div className="border-y-[0.1rem] border-dashed border-[#E4E7EC] flex justify-between py-[1.6rem] px-[2rem]">
                          <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                            Date
                          </span>
                          <span className="font-opensans font-bold text-[#211408] text-[1.4rem]">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[1.2rem]">
                      <div className="flex flex-col gap-[1.2rem]">
                        <h1 className="p-[2rem] font-opensans font-semibold text-[2.4rem]">
                          Budget Estimate
                        </h1>
                        <div className="flex flex-col gap-[2.2rem]">
                          <div className="border-y-[0.1rem] border-dashed border-[#E4E7EC] flex justify-between py-[1.6rem] px-[2rem]">
                            <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                              Flight Price
                            </span>
                            <span className="font-opensans font-bold text-[#211408] text-[1.4rem]">
                              {item.flightPrice}
                            </span>
                          </div>
                          <div className="border-y-[0.1rem] border-dashed border-[#E4E7EC] flex justify-between py-[1.6rem] px-[2rem]">
                            <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                              Accomodation
                            </span>
                            <span className="font-opensans font-bold text-[#211408] text-[1.4rem]">
                              {item.accomodation}
                            </span>
                          </div>
                          <div className="border-y-[0.1rem] border-dashed border-[#E4E7EC] flex justify-between py-[1.6rem] px-[2rem]">
                            <span className="font-opensans font-normal text-[1.4rem] text-[#211408]">
                              Other Expenses
                            </span>
                            <span className="font-opensans font-bold text-[#211408] text-[1.4rem]">
                              {item.other}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-y-[0.1rem] border-dashed border-[#E4E7EC] py-[1.6rem] px-[2rem] flex flex-col gap-[1.2rem]">
                    <span className="font-opensans font-semibold text-[1.6rem]">
                      Click link to book
                    </span>
                    <a className="font-opensans font-medium text-[#123EFF] text-[1.4rem] underline">
                      {item.link}
                    </a>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelDetails;
