import styles from "../RetailInputCard.module.css";

function RadioGroup({ name, options }) {
  return (
    <div className={styles.input_group_container}>
      {options.map((opt, index) => (
        <div key={index} className={styles.input_label_container}>
          <label htmlFor={opt.id}>{opt.label}</label>
          <input type="radio" id={opt.id} name={name} value={opt.value} />
        </div>
      ))}
    </div>
  );
}
export default RadioGroup;
