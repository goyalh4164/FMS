import ToolDescriptionCard from "@/components/ToolDescriptionCard/ToolDescriptionCard";
import styles from "./page.module.css";
export default function Home() {
  const ToolsData = [
    {
      Heading: "Welcome to FMS tool",
      Description: "This tool helps you manage your files efficiently.",
    },
    {
      Heading: "Another Tool",
      Description: "This tool helps you do something else.",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Feature Config Comparator</h1>
      </div>
      <div className={styles.tools_container}>
        {ToolsData.map((tool, index) => (
          <ToolDescriptionCard
            key={index}
            Heading={tool.Heading}
            Description={tool.Description}
          />
        ))}
      </div>
    </div>
  );
}
