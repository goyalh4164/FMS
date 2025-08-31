"use client";
import styles from "./SmoothWrapper.module.css";

export default function SmoothWrapper({ show, children }) {
  return (
    <div className={`${styles.wrapper} ${show ? styles.show : ""}`}>
      {children}
    </div>
  );
}
