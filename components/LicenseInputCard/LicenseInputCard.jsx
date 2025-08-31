"use client";
import { useState, useEffect } from "react";
import SelectInput from "../SelectInput/SelectInput";
import RadioGroup from "../RadioGroup/RadioGroup";
import TextInput from "../TextInput/TextInput";
import SmoothWrapper from "../SmoothWrapper/SmoothWrapper";
import styles from "./LicenseInputCard.module.css";

export default function LicenseInputCard({ Heading, index, onDataChange }) {
  const [branch, setBranch] = useState("");
  const [chipset, setChipset] = useState("");
  const [prefix, setPrefix] = useState("");
  const [reference, setReference] = useState("");
  const [changelistType, setChangelistType] = useState("latest");
  const [changelistNumber, setChangelistNumber] = useState("");

  const [loadingChipset, setLoadingChipset] = useState(false);
  const [loadingPrefix, setLoadingPrefix] = useState(false);
  const [loadingReference, setLoadingReference] = useState(false);

  // Handle Branch blur → triggers chipset load
  const handleBranchBlur = (value) => {
    setBranch(value);
    setLoadingChipset(true);
    setChipset("");
    setPrefix("");
    setReference("");
    setTimeout(() => setLoadingChipset(false), 1500);
  };

  // Handle Chipset change → triggers prefix + reference load
  const handleChipsetChange = (value) => {
    setChipset(value);

    setLoadingPrefix(true);
    setLoadingReference(true);

    setPrefix("");
    setReference("");

    setTimeout(() => setLoadingPrefix(false), 1200);
    setTimeout(() => setLoadingReference(false), 1500);
  };

  const handlePrefixChange = (value) => setPrefix(value);
  const handleReferenceChange = (value) => setReference(value);

  // Final Card Data
  const cardData = {
    branch,
    chipset,
    prefix,
    reference,
    changelistType,
    changelistNumber: changelistType === "specific" ? changelistNumber : null,
  };

  // Notify parent whenever cardData changes
  useEffect(() => {
    onDataChange?.(index, cardData);
  }, [branch, chipset, prefix, reference, changelistType, changelistNumber]);

  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h1>{Heading}</h1>
      </div>

      {/* Branch */}
      <TextInput
        id={`branch-${index}`}
        label="Branch"
        placeholder="Enter Branch"
        defaultValue={branch}
        onBlur={handleBranchBlur}
      />

      {/* Chipset */}
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

      {/* Prefix */}
      <SelectInput
        id={`prefix-${index}`}
        label="Prefix"
        value={prefix}
        onChange={handlePrefixChange}
        loading={loadingPrefix}
        disabled={!chipset}
        options={[
          { value: "prefix1", label: "Prefix 1" },
          { value: "prefix2", label: "Prefix 2" },
          { value: "prefix3", label: "Prefix 3" },
        ]}
      />

      {/* Reference */}
      <SelectInput
        id={`reference-${index}`}
        label="Reference"
        value={reference}
        onChange={handleReferenceChange}
        loading={loadingReference}
        disabled={!chipset}
        options={[
          { value: "ref1", label: "Reference 1" },
          { value: "ref2", label: "Reference 2" },
          { value: "ref3", label: "Reference 3" },
        ]}
      />

      {/* Changelist */}
      <RadioGroup
        name={`changelist-${index}`}
        value={changelistType}
        onChange={setChangelistType}
        options={[
          { id: `latest-cl-${index}`, label: "Latest Changelist", value: "latest" },
          { id: `specific-cl-${index}`, label: "Specific Changelist", value: "specific" },
        ]}
      />

      {/* Show specific changelist input */}
      <SmoothWrapper show={changelistType === "specific"}>
        <TextInput
          id={`changelist-number-${index}`}
          label="Changelist"
          placeholder="Enter Changelist"
          value={changelistNumber}
          onChange={setChangelistNumber}
        />
      </SmoothWrapper>
    </div>
  );
}
