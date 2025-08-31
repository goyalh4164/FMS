// components/CardButton/CardButton.js
"use client";

import styles from "./CardButton.module.css";

export default function CardButton({ onClick = () => {}, label }) {
  return (
    <div className={styles.custom_button} onClick={onClick}>
      {label}
    </div>
  );
}
