"use client";
import { Button } from "@tremor/react";
import { useState } from "react";
import * as XLSX from "xlsx";

export function ExportButton({
  headerCells,
  rowsCells,
  title,
  worksheetname,
}: any) {
  const [loading, setLoading] = useState(false);

  const onGetExportProduct = async () => {
    try {
      setLoading(true);
      // Check if the action result contains data and if it's an array
      if (
        headerCells &&
        Array.isArray(headerCells) &&
        rowsCells &&
        Array.isArray(rowsCells)
      ) {
        const data = rowsCells.reduce(
          (acc: any, cell: string[], index: number) => {
            const object = headerCells.reduce(
              (acc: any, key: string, index: number) => {
                acc[key] = cell[index];

                return acc;
              },
              {}
            );

            acc.push(object);
            return acc;
          },
          []
        );

        const dataToExport = data.map((pro: any) => pro);

        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);

        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };

  return (
    <Button variant="secondary" onClick={() => onGetExportProduct()}>
      <span className="relative">{loading ? "Carregando..." : "Exportar"}</span>
    </Button>
  );
}
