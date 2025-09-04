"use client";
import React from "react";
import styles from "./styles.module.scss";
import Button from "../btn";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  function handleClick() {
    return true;
  }

  const socialMedia = [
    { img: "assets/footer/twitter.svg", name: "twitter" },
    { img: "assets/footer/instagram.svg", name: "intagram" },
    { img: "assets/footer/facebook.svg", name: "facebook" },
    { img: "assets/footer/linkedin.svg", name: "linkedin" },
  ];

  const LegalLinks = ["FAQ", "Privacy Policy", "Terms of service"];

  return (
    <footer>
      <div className={styles.footerSection}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.text}>
            <p className={`font-opensans ${styles.text1}`}>
              Let’s embark on your next adventure{" "}
            </p>
            <p className={`font-montserrat ${styles.text2}`}>
              Get exclusive offers <br /> delivered to your inbox!
            </p>
          </div>
          <div className={styles.inputField}>
            <input
              placeholder="Enter your Email"
              className={`font-opensans ${styles.input}`}
            />
            <div className={styles.btn}>
              <Button rounded Label={"Subscribe"} onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#011718]">
        <div className={styles.finalFooter}>
          <div className={styles.footerNav}>
            <div className={styles.footerMenu}>
              <div>
                <Image
                  src={"assets/footer/travelly.svg"}
                  alt={"travelly.svg"}
                  width={114}
                  height={26}
                  className={styles.travelly}
                />
                <p className={`font-opensans ${styles.menuItem1}`}>
                  Travelly 2025, All right reserved
                </p>
              </div>
              <div className={`font-opensans ${styles.menus}`}>
                <div className={styles.menu}>
                  {" "}
                  <Link href="/" className={styles.menuItem1}>
                    How It’s works
                  </Link>
                  <Link href="/" className={styles.menuItem2}>
                    About Us
                  </Link>
                </div>
                <div className={styles.menu}>
                  <Link href="/" className={styles.menuItem1}>
                    Popular destination
                  </Link>
                  <Link href="/" className={styles.menuItem2}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.socialMedia}>
              {socialMedia.map((social, index) => (
                <Image
                  src={social.img}
                  alt={social.name}
                  width={22.5}
                  height={22.5}
                  className={styles.socialIcon}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className={styles.legalLinks}>
            {LegalLinks.map((links, index) => (
              <Link
                href="/"
                key={index}
                className="text-[1.6rem] text-white font-opensans"
              >
                {links}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
