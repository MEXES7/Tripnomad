"use client";
import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  Label: string;
  onClick: () => void;
  className?: string;
  rounded?: boolean;
}

const Button = ({
  Label,
  onClick,
  className = "",
  rounded = false,
}: ButtonProps) => {
  const radiusClass = rounded ? styles.rounded : styles.square;
  return (
    <button
      className={`font-urbanist ${styles.btn} ${radiusClass} ${className}`}
      onClick={onClick}
    >
      {Label}
    </button>
  );
};

export default Button;
