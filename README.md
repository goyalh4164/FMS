"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";

import styles from "./page.module.css";
import { useUser } from "../context/UserContext";
import KeyPoint from "@/components/KeyPoint/KeyPoint";
import CardButton from "@/components/CardButton/CardButton";
import VisitTracker from "@/components/VisitTracker/VisitTracker";
import { root } from "@/server-config";

export default function Table() {
  const {
    excelDownloadPath,
    fmsTable,
    model1CL,
    model2CL,
  } = useUser();

  const { HEADERS: column_heading, DATA_ROWS_AFTER_COLORING: Data } = fmsTable;

  const [globalFilter, setGlobalFilter] = useState("");

  const columns = column_heading.map((col) => ({
    accessorKey: col,
    header: col,
  }));

  const firstColumnId = column_heading[0];

  const table = useReactTable({
    data: Data,
    columns,
    state: {
      globalFilter,
      columnPinning: { left: [firstColumnId] },
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleDownloadExcel = async () => {
    try {
      const query = `${root}/getFile?path=${excelDownloadPath}`;
      const response = await axios.get(query, { responseType: "blob" });

      const filename = query.split("/").pop();
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename || "data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error("Excel download failed", e);
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <VisitTracker page="result" />

      {/* Fixed Header Section */}
      <div style={{ position: "sticky", top: 0, background: "#fff", zIndex: 5 }}>
        {model1CL != null && (
          <KeyPoint
            mainPoint="Model 1 CL"
            description={model1CL === 0 ? "Latest" : model1CL}
          />
        )}

        {model2CL != null && (
          <KeyPoint
            mainPoint="Model 2 CL"
            description={model2CL === 0 ? "Latest" : model2CL}
          />
        )}

        <input
          className={styles.searchInput}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search FMS KEY..."
        />

        <CardButton
          label="Download Excel"
          buttonColor="green"
          onClick={handleDownloadExcel}
        />
      </div>

      {/* Table */}
      <table style={{ minWidth: "1000px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => {
                const pinned = header.column.getIsPinned();
                return (
                  <th
                    key={header.id}
                    style={{
                      position: pinned ? "sticky" : "static",
                      left: pinned ? 0 : undefined,
                      zIndex: pinned ? 3 : 1,
                      background: "#f9f9f9",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const pinned = cell.column.getIsPinned();
                const highlight =
                  row.original?.colors?.includes(cell.column.id);

                return (
                  <td
                    key={cell.id}
                    style={{
                      position: pinned ? "sticky" : "static",
                      left: pinned ? 0 : undefined,
                      zIndex: pinned ? 2 : 1,
                      background: highlight ? "lightpink" : "white",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
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