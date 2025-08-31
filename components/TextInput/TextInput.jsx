import styles from "./TextInput.module.css";

function TextInput({
  id,
  label,
  placeholder = "",
  value,            // for controlled input
  defaultValue,     // for uncontrolled input
  onChange,         // optional
  onBlur,           // optional
}) {
  return (
    <div className={styles.input_group_container}>
      <div className={styles.input_label_container}>
        <label htmlFor={id}>{label}</label>
      </div>
      <div className={styles.user_input_container}>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange && onChange(e.target.value)}
          onBlur={(e) => onBlur && onBlur(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TextInput;
