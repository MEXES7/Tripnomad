"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const Section4 = () => {
  const profilePic = [
    {
      imgPro: "/assets/homepage/person1.jpg",
      topPro: "121",
      leftPro: "181",
      imgFlag: "/assets/homepage/canada-flag.svg",
      topFlag: "187",
      leftFlag: "216",
    },
    {
      imgPro: "/assets/homepage/person2.jpg",
      topPro: "323",
      leftPro: "268",
      imgFlag: "/assets/homepage/canada-flag.svg",
      topFlag: "389",
      leftFlag: "296",
    },
    {
      imgPro: "/assets/homepage/person3.jpg",
      topPro: "453",
      leftPro: "503",
      imgFlag: "/assets/homepage/canada-flag.svg",
      topFlag: "521",
      leftFlag: "531",
    },
    {
      imgPro: "/assets/homepage/person4.jpg",
      topPro: "211",
      leftPro: "543",
      imgFlag: "/assets/homepage/canada-flag.svg",
      topFlag: "279",
      leftFlag: "559",
    },
    {
      imgPro: "/assets/homepage/person5.jpg",
      topPro: "373",
      leftPro: "768",
      imgFlag: "/assets/homepage/canada-flag.svg",
      topFlag: "441",
      leftFlag: "796",
    },
    {
      imgPro: "/assets/homepage/person6.jpg",
      topPro: "171",
      leftPro: "808",
      imgFlag: "/assets/homepage/canada-flag.svg",
      topFlag: "239",
      leftFlag: "836",
    },
  ];

  const reviews = [
    {
      id: "1",
      review:
        "  I have always been frustrated in searching for destinations only to realize i need a difficult visa. With Tripmatch, Everything felts soeasy.... ",
      user: "David Adeleke",
      country: "Nigeria",
    },
    {
      id: "2",
      review:
        "lorem ipsum asnvah fakjsiuear kjmsfbvikawr kajfbgvser akhvdiawrf akfbgiwr bkfiag adfkaru uigfaw bajdfua ahrjgfur ",
      user: "Malik Olaoye",
      country: "Nigeria",
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < reviews.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  return (
    <section className={styles.finalSection}>
      <div className={styles.reviews}>
        <p className={styles.review}>Reviews</p>
        <p className={styles.header}>What our people says about Travelly</p>
        <div key={reviews[current].id}>
          <p className={styles.content}>“{reviews[current].review}“</p>
          <p className={styles.name}>
            _ {reviews[current].user}, {reviews[current].country}
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={handlePrev}
            className={styles.button}
            disabled={current === 0}
          >
            <Image
              src={"/assets/homepage/section4/arrow-left.svg"}
              alt="prev"
              width={27}
              height={27}
            />
          </button>
          <button
            onClick={handleNext}
            className={styles.button}
            disabled={current === reviews.length - 1}
          >
            <Image
              src={"/assets/homepage/section4/arrow-right.svg"}
              alt="next"
              width={27}
              height={27}
            />
          </button>
        </div>
      </div>
      <div className={styles.map}>
        <div className={styles.mapImages}>
          {profilePic.map((pic, index) => (
            <div key={index}>
              <div
                style={{
                  position: "absolute",
                  top: `${pic.topPro}px`,
                  left: `${pic.leftPro}px`,
                  zIndex: "2",
                }}
                // key={index}
              >
                <Image
                  src={pic.imgPro}
                  alt="person"
                  width={80}
                  height={80}
                  className={styles.profilePic}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: `${pic.topFlag}px`,
                  left: `${pic.leftFlag}px`,
                  zIndex: "2",
                }}
              >
                <Image src={pic.imgFlag} alt="flag" width={24} height={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;
