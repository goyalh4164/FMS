"use client";
// import { DataRows as Data } from "@/utils/Data";

import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";

// import { headers as column_heading } from "@/utils/Data";
import { useState } from "react";
import styles from "./page.module.css";
import { useUser } from "../context/UserContext";
import KeyPoint from "@/components/KeyPoint/KeyPoint";
import CardButton from "@/components/CardButton/CardButton";
import axios from "axios";
import { root } from "@/server-config";
import VisitTracker from "@/components/VisitTracker/VisitTracker";

export default function Table() {
  const {
    excelDownloadPath,
    fmsTable,
    model1Path,
    model1SW,
    model1CL,
    model2Path,
    model2SW,
    model2CL,
    prefix,
    reference,
  } = useUser();

  const { HEADERS: column_heading, DATA_ROWS_AFTER_COLORING: Data } = fmsTable;
  console.log(excelDownloadPath);
  console.log("column_heading : ", column_heading, "Data : ", Data);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [];

  for (let i = 0; i < column_heading.length; i++) {
    let obj = {};
    obj.accessorKey = column_heading[i];
    obj.header = column_heading[i];
    columns.push(obj);
  }

  const table = useReactTable({
    data: Data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleDownloadExcel = async () => {
    const query = `${root}/getFile?path=${excelDownloadPath}`;
  try {
    console.log("Query: ", query);
    const response = await axios.get(query, {
      responseType: "blob",
    });
    console.log("[handleDownloadExcel] File Response :" , response)
    const FileUrl = response.config.url;
    const splittedUrl = FileUrl.split('/')
    const filename = splittedUrl[splittedUrl.length-1]
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // Set your desired file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {
    const errorMessage = e.response?.data?.message;
    console.log("Error from getExcelFile : ", e);
    console.log("Error Message from getExcelFile : ", errorMessage);
  }
  };

  return (
    <div style={{ overflowX: "auto"}}>
      <VisitTracker page={"result"} />
      <div className="key_Point_Container">
        {model1Path && (
          <KeyPoint mainPoint="Model 1 Path " description={model1Path} />
        )}
        {model1SW && (
          <KeyPoint mainPoint="Model 1 SW " description={model1SW} />
        )}
        {
          <KeyPoint
            mainPoint="Model 1 CL "
            description={model1CL == 0 ? "Latest" : model1CL}
          />
        }
        {model2Path && (
          <KeyPoint mainPoint="Model 2 Path " description={model2Path} />
        )}
        {model2SW && (
          <KeyPoint mainPoint="Model 2 SW " description={model2SW} />
        )}
        {model2CL != null && (
          <KeyPoint
            mainPoint="Model 2 CL "
            description={model2CL == 0 ? "Latest" : model2CL}
          />
        )}
        {prefix && <KeyPoint mainPoint="Prefix " description={prefix} />}
        {reference && (
          <KeyPoint mainPoint="Reference " description={reference} />
        )}
      </div>
      <div className={styles.search_and_download_container}>
        <input
          className={styles.searchInput}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          placeholder="Search FMS KEY..."
        />
        <div>
          <CardButton label={"Download Excel"} buttonColor={"green"} onClick={handleDownloadExcel} />
        </div>
      </div>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "sans-serif",
          fontSize: "14px",
          backgroundColor:"white"
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const overrideColor = row.original.colors.includes(
                  cell.column.id
                )
                  ? "lightpink"
                  : "light-red";

                return (
                  <td
                    key={cell.id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: overrideColor,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
