"use client";
import mData from "@/utils/MockData";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function Table() {
  const columns = [
    { accessorKey: "branch", header: "Branch" },
    { accessorKey: "chipset", header: "Chipset" },
    { accessorKey: "swModel", header: "S/W Model" },
    { accessorKey: "changelistType", header: "Changelist Type" },
    { accessorKey: "changelistNumber", header: "Changelist Number" },
    {
      accessorKey: "releaseDate",
      header: "Release Date",
      cell: (info) => {
        const value = info.getValue();
        const today = new Date();
        const dateValue = new Date(value);

        // Row override first
        const rowColor = info.row.original.colors?.releaseDate;

        // Default highlight if date < today
        const bg = rowColor || (dateValue < today ? "yellow" : "transparent");

        return (
          <span
            style={{
              backgroundColor: bg,
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const value = info.getValue();

        // Row override first
        const rowColor = info.row.original.colors?.status;

        // Default logic if no override
        let color = "black";
        if (!rowColor) {
          if (value === "Completed") color = "green";
          else if (value === "Pending") color = "orange";
          else color = "red";
        }

        return <span style={{ color: rowColor || color }}>{value}</span>;
      },
    },
  ];

  const table = useReactTable({
    data: mData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "sans-serif",
          fontSize: "14px",
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
                const overrideColor =
                  row.original.colors?.[cell.column.id] || "transparent";

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
