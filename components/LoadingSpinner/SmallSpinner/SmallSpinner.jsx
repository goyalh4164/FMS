import styles from "./SmallSpinner.module.css";

export default function SmallSpinner({ active }) {
  return (
    <div
      className={styles.spinner}
      style={{ visibility: active ? "visible" : "hidden" }}
    ></div>
  );
}
