"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "@/components/btn";

const slides = [
  {
    image: "/assets/homepage/section3/thailand.jpg",
    text: "Thailand",
  },
  {
    image: "/assets/homepage/section3/europe.jpg",
    text: "Europe",
  },
  {
    image: "/assets/homepage/section3/usa.jpg",
    text: "USA",
  },
  {
    image: "/assets/homepage/section3/asia.jpg",
    text: "Asia",
  },
];

// Create extended array with clones for seamless loop
const extendedSlides = [
  ...slides,
  ...slides,
  ...slides,
  ...slides,
  ...slides,
  ...slides,
  ...slides,
  ...slides,
  ...slides,
];

const Section3 = () => {
  const [index, setIndex] = useState(0);

  function handleClick() {
    return true;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === extendedSlides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTranslateX = (index: number) => {
    let translateX = 0;
    for (let i = 0; i < index; i++) {
      translateX += 373;
    }
    return translateX;
  };

  return (
    <section id="section 3" className={styles.section3}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        {/* Text display area - changes with the slider */}
        <div className={styles.textSection}>
          <p className={styles.headerText}>Popular Destinations</p>
          <div className={styles.textContainer}>
            {" "}
            <h2
              key={index} // This forces re-render and animation restart
              className={styles.slideText}
              // style={{
              //   transition: isTransitioning
              //     ? "transform 0.5s ease-in-out"
              //     : "none",
              // }}
            >
              {extendedSlides[index].text}
            </h2>
            <p className={styles.details}>
              Plan, book and embark on your dream adventures with our expert
              guidance and tailored experience.
            </p>
          </div>
          <Button
            className={styles.button}
            onClick={handleClick}
            Label={"Explore Now"}
          />
        </div>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            <div
              className={styles.slidesWrapper}
              style={{ transform: `translateX(-${getTranslateX(index)}px)` }}
            >
              {extendedSlides.map((src, i) => {
                const position =
                  (i - index + extendedSlides.length) % extendedSlides.length;
                const isInFirstPosition = position === 0;
                return (
                  <div
                    key={i}
                    // className={styles.slide}
                    className={`${styles.slide} ${
                      isInFirstPosition ? styles.large : ""
                    }`}
                    // // style={{ transform: `translateX(-${index * 100}%)` }}
                  >
                    <Image
                      src={src.image}
                      alt={`Image ${i}`}
                      fill
                      priority={i < 3}
                      className={styles.image}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
