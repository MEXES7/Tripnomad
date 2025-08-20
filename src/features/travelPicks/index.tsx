/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import React from "react";

import TravelCard from "./components/travel-card";
import Header from "./components/header";

const TravelPicks = () => {
  return (
    <div>
      <Header />
      <TravelCard />
    </div>
  );
};

export default TravelPicks;
