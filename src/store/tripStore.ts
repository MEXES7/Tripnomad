import { create } from "zustand";

interface Item {
  id: number;
  image: string;
  location: string;
  flag: string;
  visaRequirement: string;
  date: string;
  accomodationFee: string;
  total: string;
  flight: string;
}

interface TripStore {
  travels: Item[];
  selected: number | null;
  setTravels: (travels: Item[]) => void;
  setSelected: (itemId: number | null) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  travels: [
    {
      id: 1,
      image: "/assets/zurich.svg",
      location: "Zurich",
      flag: "/assets/zurich-flag.svg",
      visaRequirement: "Visa-free",
      date: "July 10 - July 11",
      accomodationFee: "$500,000",
      total: "$1.8,000,000 ",
      flight: "$1,200,000",
    },
    {
      id: 2,
      image: "/assets/geneva.svg",
      location: "Geneva",
      flag: "/assets/geneva-flag.svg",
      visaRequirement: "Visa-free",
      date: "July 10 - July 11",
      accomodationFee: "$500,000",
      total: "$1.8,000,000 ",
      flight: "$1,200,000",
    },
    {
      id: 3,
      image: "/assets/bern.svg",
      location: "Bern",
      flag: "/assets/bern-flag.svg",
      visaRequirement: "Visa-free",
      date: "July 10 - July 11",
      accomodationFee: "$500,000",
      total: "$1.8,000,000 ",
      flight: "$1,200,000",
    },
    {
      id: 4,
      image: "/assets/lucern.svg",
      location: "Lucern",
      flag: "/assets/lucern-flag.svg",
      visaRequirement: "Visa-free",
      date: "July 10 - July 11",
      accomodationFee: "$500,000",
      total: "$1.8,000,000 ",
      flight: "$1,200,000",
    },
    {
      id: 5,
      image: "/assets/interlaken.svg",
      location: "Interlaken",
      flag: "/assets/interlaken-flag.svg",
      visaRequirement: "Visa-free",
      date: "July 10 - July 11",
      accomodationFee: "$500,000",
      total: "$1.8,000,000 ",
      flight: "$1,200,000",
    },
    {
      id: 6,
      image: "/assets/zermatt.svg",
      location: "Zermatt",
      flag: "/assets/zermatt-flag.svg",
      visaRequirement: "Visa-free",
      date: "July 10 - July 11",
      accomodationFee: "$500,000",
      total: "$1.8,000,000 ",
      flight: "$1,200,000",
    },
  ],
  selected: null,
  setTravels: (travels) => set({ travels }),
  setSelected: (itemId) => set({ selected: itemId }),
}));
