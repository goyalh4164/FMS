"use client";
import { useState } from "react";
import styles from "./page.module.css";
import LicenseInputCard from "@/components/LicenseInputCard/LicenseInputCard";
import CardButton from "@/components/CardButton/CardButton";

export default function License() {
  const [numCards, setNumCards] = useState(2);
  const [cardsData, setCardsData] = useState([]);

  const handleDataChange = (index, data) => {
    setCardsData((prev) => {
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  };

  const handleSubmit = () => {
    console.log("Final License Cards Data:", cardsData);
    // here you can send data to API
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>License Cards</h1>
      </div>

      <div className={styles.cards_container}>
        {Array.from({ length: numCards }).map((_, i) => (
          <LicenseInputCard
            key={i}
            Heading={`License Card ${i + 1}`}
            index={i}
            onDataChange={handleDataChange}
          />
        ))}
      </div>

      <div className={styles.button_container}>
        <CardButton label="Submit" onClick={handleSubmit} />
        <CardButton label="Add Card" onClick={() => setNumCards(numCards + 1)} />
      </div>
    </div>
  );
}
