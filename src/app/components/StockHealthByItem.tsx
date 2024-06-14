"use client";
import { TableHero } from "@/components/Table";
import { useEffect, useState } from "react";

type stocksHealthType = { headerCells: []; rowsCells: [] };

export function StockHealthByItem() {
  const [stocksSubsidiary, setStocksSubsidiary] = useState<stocksHealthType>({
    headerCells: [],
    rowsCells: [],
  });

  useEffect(() => {
    async function getData() {
      const res: any = await fetch("http://localhost:3000/api/stocks-health");
      const { data } = await res.json();

      setStocksSubsidiary(data);
    }

    getData();
  }, []);

  const { headerCells, rowsCells } = stocksSubsidiary;

  return (
    <TableHero
      heightCells="h-28"
      headerCells={headerCells}
      rowsCells={rowsCells}
    />
  );
}
