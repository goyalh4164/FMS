"use client";
import { useState } from "react";
import SelectInput from "./SelectInput/SelectInput";
import RadioGroup from "./RadioGroup/RadioGroup";
import TextInput from "./TextInput/TextInput";
import styles from "./RetailInputCard.module.css";

// ✅ Main Card Component
export default function RetailInputCard({ Heading = "Default Heading" }) {
  const [branch, setBranch] = useState("");
  const [chipset, setChipset] = useState("");
  const [swModel, setSwModel] = useState("");
  const [changelistType, setChangelistType] = useState("latest");
  const [changelistNumber, setChangelistNumber] = useState("");

  const [loadingChipset, setLoadingChipset] = useState(false);
  const [loadingSWModel, setLoadingSWModel] = useState(false);

  // 👉 Branch onBlur → show spinner for chipset
  const handleBranchBlur = (value) => {
    setBranch(value);
    setLoadingChipset(true);
    setChipset(""); // reset chipset
    setSwModel(""); // reset sw model
    setTimeout(() => {
      setLoadingChipset(false);
    }, 1500); // simulate API call
  };

  // 👉 Chipset onChange → show spinner for S/W model
  const handleChipsetChange = (value) => {
    setChipset(value);
    setLoadingSWModel(true);
    setSwModel(""); // reset sw model
    setTimeout(() => {
      setLoadingSWModel(false);
    }, 1500);
  };

  // 👉 SW Model change
  const handleSWModelChange = (value) => {
    setSwModel(value);
  };

  // 👉 Final Card Data
  const cardData = {
    branch,
    chipset,
    swModel,
    changelistType,
    changelistNumber: changelistType === "specific" ? changelistNumber : null,
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h1>{Heading}</h1>
      </div>
      <TextInput
        id="branch-path"
        label="Branch"
        placeholder="Enter Branch"
        defaultValue={branch}
        onBlur={handleBranchBlur}
      />

      {/* Chipset Dropdown */}
      <SelectInput
        id="chipset"
        label="Chipset"
        value={chipset}
        onChange={handleChipsetChange}
        loading={loadingChipset}
        disabled={!branch}
        options={[
          { value: "chipset1", label: "Chipset 1" },
          { value: "chipset2", label: "Chipset 2" },
          { value: "chipset3", label: "Chipset 3" },
        ]}
      />

      {/* SW Model Dropdown */}
      <SelectInput
        id="sw-model"
        label="S/W Model"
        value={swModel}
        onChange={handleSWModelChange}
        loading={loadingSWModel}
        disabled={!chipset}
        options={[
          { value: "branch1", label: "Branch 1" },
          { value: "branch2", label: "Branch 2" },
          { value: "branch3", label: "Branch 3" },
        ]}
      />

      {/* Radio Buttons */}
      <RadioGroup
        name="changelist"
        value={changelistType}
        onChange={setChangelistType}
        options={[
          { id: "latest-cl", label: "Latest Changelist", value: "latest" },
          {
            id: "specific-cl",
            label: "Specific Changelist",
            value: "specific",
          },
        ]}
      />

      {/* Conditional Changelist Input */}
      {changelistType === "specific" && (
        <TextInput
          id="changelist-number"
          label="Changelist"
          placeholder="Enter Changelist"
          value={changelistNumber}
          onChange={setChangelistNumber}
        />
      )}

      {/* Debug output (Final Card Data) */}
      <pre
        style={{ marginTop: "20px", background: "#f9f9f9", padding: "10px" }}
      >
        {JSON.stringify(cardData, null, 2)}
      </pre>
    </div>
  );
}
