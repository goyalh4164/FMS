import styles from "./ToolDescriptionCard.module.css";
export default function ToolDescriptionCard({ Heading, Description }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading_container}>
          <h1>{Heading}</h1>
        </div>
        <div className={styles.description_container}>
          <p>{Description}</p>
        </div>
      </div>
    </>
  );
}
