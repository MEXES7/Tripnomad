"use client";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Image src="/assets/logo.svg" alt="logo" width={165} height={98} />
      <div className={`font-inter ${styles.navLinks}`}>
        <Link href="/">How its works</Link>
        <Link href="/">Testimonial</Link>
        <Link href="/">Popular Trips</Link>
        <Link href="/">Contact us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
