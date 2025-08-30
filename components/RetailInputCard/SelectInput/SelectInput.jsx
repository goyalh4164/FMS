import styles from "../RetailInputCard.module.css";
import Spinner from "@/components/LoadingSpinner/SmallSpinner/SmallSpinner";

function SelectInput({ id, label, options }) {
  return (
    <div className={styles.input_group_container}>
      <div className={styles.input_label_container}>
        <label htmlFor={id}>{label}</label>
      </div>
      <div className={styles.user_input_container}>
        <select id={id}>
          <option value="">Select {label}</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Spinner />
      </div>
      <div>
      </div>
    </div>
  );
}

export default SelectInput;
