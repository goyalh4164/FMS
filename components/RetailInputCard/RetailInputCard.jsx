import styles from "./RetailInputCard.module.css";
import TextInput from "./TextInput/TextInput";
import SelectInput from "./SelectInput/SelectInput";
import RadioGroup from "./RadioGroup/RadioGroup";

export default function RetailInputCard({ Heading = "Default Heading" }) {
  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h1>{Heading}</h1>
      </div>
      <div className={styles.input_container}>
        <TextInput id="branch-path" label="Branch" placeholder="Enter Branch" />

        <SelectInput
          id="chipset"
          label="Chipset"
          options={[
            { value: "chipset1", label: "Chipset 1" },
            { value: "chipset2", label: "Chipset 2" },
            { value: "chipset3", label: "Chipset 3" },
          ]}
        />

        <SelectInput
          id="sw-model"
          label="S/W Model"
          options={[
            { value: "softwaremodel1", label: "Software Model 1" },
            { value: "softwaremodel2", label: "Software Model 2" },
            { value: "softwaremodel3", label: "Software Model 3" },
          ]}
        />

        <RadioGroup
          name="changelist"
          options={[
            {
              id: "latest-changelist",
              label: "Latest Changelist",
              value: "latest",
            },
            {
              id: "specific-changelist",
              label: "Specific Changelist",
              value: "specific",
            },
          ]}
        />

        <TextInput
          id="changelist-number"
          label="Changelist"
          placeholder="Enter Changelist"
        />
      </div>
    </div>
  );
}
