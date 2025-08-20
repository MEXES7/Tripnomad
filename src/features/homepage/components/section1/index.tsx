"use client";

import React from "react";
import styles from "./styles.module.scss";
import Button from "@/components/btn";
import { useModalStore } from "@/store/modalStore";

// import Image from "next/image";

const Section1 = () => {
  const openModal = useModalStore((state) => state.openModal);

  // function handleClick() {
  //   return openModal("custom");
  // }

  return (
    <section id="section1" className={styles.heroSection}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.text1}>
          Explore the{" "}
          <div className={styles.decorative_span}>
            <span className={styles.decorative_text}>World</span>
            <img
              src="/assets/homepage/line 1.png"
              className={styles.decorative_line}
            />
          </div>{" "}
          with{" "}
          <div className={styles.decorative_span}>
            <span className={styles.decorative_text}>Budget</span>
            <img
              src="/assets/homepage/line 1.png"
              className={styles.decorative_line}
              alt="line"
            />
          </div>{" "}
          Friendly Travel Options
        </h1>
        <div className={styles.content2}>
          <p className={styles.text2}>
            Get personalized travel bundles based on your budget, passport, and
            travel dates in second. We will find affordable, visa-friendly trips
            tailored just for you.
          </p>
        </div>
        <div className={styles.btn}>
          <Button
            Label={"Plan My Trip"}
            onClick={() => openModal("planTrip")}
          />{" "}
        </div>
      </div>
    </section>
  );
};

export default Section1;
