import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const Section2 = () => {
  const steps = [
    {
      img: "/assets/homepage/checkbox.svg",
      header: "Tell us About Your Travel Plans",
      body: "Enter your budget, passport, country and travel dates. we will use them to unlock travel options that fit you perfectly ",
    },
    {
      img: "/assets/homepage/magnifying.svg",
      header: "We Find What Works For You",
      body: "Our smart system scans thousands of flights, stays, and visa requirements to find international trips you can actually take.",
    },
    {
      img: "/assets/homepage/map.svg",
      header: "Get Instantly Matched with Trips You Can Take",
      body: "Get international trips that matches your reality, budget, visa and timing- al in one place without no stress. ",
    },
  ];

  const imagesTop = [
    "/assets/homepage/photographers.jpg",
    "/assets/homepage/family.jpg",
  ];
  const imagesBottom = [
    "/assets/homepage/casual photographer.jpg",
    "/assets/homepage/man.jpg",
  ];

  return (
    <section className={styles.secondSection}>
      <div className={styles.texts}>
        <div className={styles.header}>
          <p className={styles.text1}>How it’s works?</p>
          <h1 className={styles.text2}>
            Plan your trip in 3 <br />
            simple steps
          </h1>
          <p className={styles.text3}>
            We simplify travel by finding visa-friendly <br /> destinations and
            ready-to-go trip bundles instantly.
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <img src={step.img} />{" "}
              <span>
                <h4 className={styles.header}>{step.header}</h4>
                <p className={styles.body}>{step.body}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.imagesContainer}>
        <div className={styles.images}>
          {imagesTop.map((img, index) => (
            <Image
              src={img}
              alt={`image ${index}`}
              width={369}
              height={334}
              key={index}
              className={
                index < 1 ? styles.customRadius1 : styles.customRadius2
              }
            />
          ))}
        </div>
        <div className={styles.images}>
          {imagesBottom.map((img, index) => (
            <Image
              src={img}
              alt={`image ${index}`}
              width={369}
              height={334}
              key={index}
              className={
                index < 1 ? styles.customRadius2 : styles.customRadius1
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
