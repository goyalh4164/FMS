"use client";
import { useState } from "react";
import styles from "./page.module.css";
import RetailInputCard from "@/components/RetailInputCard/RetailInputCard";
import CardButton from "@/components/CardButton/CardButton";

export default function Retail() {
  const [numCards, setNumCards] = useState(2);
  const [cardsData, setCardsData] = useState([]);

  const handleDataChange = (index, data) => {
    setCardsData((prev) => {
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Retail Cards</h1>
        </div>
        <div className={styles.cards_container}>
          {Array.from({ length: numCards }).map((_, i) => (
            <RetailInputCard
              key={i}
              Heading={`Retail Card ${i + 1}`}
              index={i}
              onDataChange={handleDataChange}
            />
          ))}
        </div>
        <div className={styles.button_container}>
          <CardButton label={"Submit"} />
          <CardButton label={"Add Card"} onClick={() => setNumCards(numCards + 1)} />
        </div>
      </div>
    </>
  );
}
