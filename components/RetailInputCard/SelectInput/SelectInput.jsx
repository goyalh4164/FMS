import styles from "../RetailInputCard.module.css";
import SmallSpinner from "@/components/LoadingSpinner/SmallSpinner/SmallSpinner";

// ✅ Select Input with Spinner + Disabled State
function SelectInput({
  id,
  label,
  options,
  value,
  onChange,
  loading,
  disabled,
}) {
  return (
    <div className={styles.input_group_container}>
      <div className={styles.input_label_container}>
        <label htmlFor={id}>{label}</label>
      </div>
      <div className={styles.user_input_container}>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled || loading}
        >
          <option value="">Select {label}</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {<SmallSpinner active={loading} />}
      </div>
    </div>
  );
}

export default SelectInput;
