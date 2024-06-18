"use client";
import { TableHero } from "@/components/Table";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";

type stocksHealthType = { headerCells: []; rowsCells: [] };

export function StockHealthByItem() {
  const { filters } = useContext(FiltersContext);

  const [stocksSubsidiary, setStocksSubsidiary] = useState<stocksHealthType>({
    headerCells: [],
    rowsCells: [],
  });

  useEffect(() => {
    async function getData() {
      const res: any = await fetch(
        "https://dashboard-bi1.vercel.app/api/stocks-health",
        {
          method: "POST",
          body: JSON.stringify(filters),
        }
      );
      const { data, error } = await res.json();

      if (data) {
        setStocksSubsidiary(data);
      }
    }

    getData();
  }, [filters]);

  const { headerCells, rowsCells } = stocksSubsidiary;

  return (
    <TableHero
      heightCells="h-28"
      headerCells={headerCells}
      rowsCells={rowsCells}
    />
  );
}
