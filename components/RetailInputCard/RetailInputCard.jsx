"use client";
import { useState, useEffect } from "react";
import SelectInput from "./SelectInput/SelectInput";
import RadioGroup from "./RadioGroup/RadioGroup";
import TextInput from "./TextInput/TextInput";
import styles from "./RetailInputCard.module.css";
import SmoothWrapper from "../SmoothWrapper/SmoothWrapper";

export default function RetailInputCard({
  Heading,
  index,
  onDataChange,
}) {
  const [branch, setBranch] = useState("");
  const [chipset, setChipset] = useState("");
  const [swModel, setSwModel] = useState("");
  const [changelistType, setChangelistType] = useState("latest");
  const [changelistNumber, setChangelistNumber] = useState("");

  const [loadingChipset, setLoadingChipset] = useState(false);
  const [loadingSWModel, setLoadingSWModel] = useState(false);

  const handleBranchBlur = (value) => {
    setBranch(value);
    setLoadingChipset(true);
    setChipset("");
    setSwModel("");
    setTimeout(() => setLoadingChipset(false), 1500);
  };

  const handleChipsetChange = (value) => {
    setChipset(value);
    setLoadingSWModel(true);
    setSwModel("");
    setTimeout(() => setLoadingSWModel(false), 1500);
  };

  const handleSWModelChange = (value) => setSwModel(value);

  // Final Card Data
  const cardData = {
    branch,
    chipset,
    swModel,
    changelistType,
    changelistNumber: changelistType === "specific" ? changelistNumber : null,
  };

  // Notify parent whenever cardData changes
  useEffect(() => {
    onDataChange?.(index, cardData);
  }, [branch, chipset, swModel, changelistType, changelistNumber]);

  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h1>{Heading}</h1>
      </div>

      <TextInput
        id={`branch-path-${index}`}
        label="Branch"
        placeholder="Enter Branch"
        defaultValue={branch}
        onBlur={handleBranchBlur}
      />

      <SelectInput
        id={`chipset-${index}`}
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

      <SelectInput
        id={`sw-model-${index}`}
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

      <RadioGroup
        name={`changelist-${index}`}
        value={changelistType}
        onChange={setChangelistType}
        options={[
          {
            id: `latest-cl-${index}`,
            label: "Latest Changelist",
            value: "latest",
          },
          {
            id: `specific-cl-${index}`,
            label: "Specific Changelist",
            value: "specific",
          },
        ]}
      />

      {(
        <SmoothWrapper show={changelistType === "specific"}>
          <TextInput
            id={`changelist-number-${index}`}
            label="Changelist"
            placeholder="Enter Changelist"
            value={changelistNumber}
            onChange={setChangelistNumber}
          />
        </SmoothWrapper>
      )}
    </div>
  );
}
