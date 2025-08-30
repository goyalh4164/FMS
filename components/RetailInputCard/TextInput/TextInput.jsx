import styles from "../RetailInputCard.module.css";

function TextInput({ id, label, placeholder }) {
  return (
    <div className={styles.input_group_container}>
      <div className={styles.input_label_container}>
        <label htmlFor={id}>{label}</label>
      </div>
      <div className={styles.user_input_container}>
        <input type="text" id={id} placeholder={placeholder} />
      </div>
    </div>
  );
}

export default TextInput;
