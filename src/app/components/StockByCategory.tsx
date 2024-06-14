"use client";
import { BarChartHero } from "@/components/BarChart";
import { useEffect, useState } from "react";

export function StockByCategory() {
  const [stocksCategory, setStocksCategory] = useState([]);

  useEffect(() => {
    async function getData() {
      const res: any = await fetch("http://localhost:3000/api/stocks-category");
      const { data } = await res.json();

      setStocksCategory(data);
    }

    getData();
  }, []);

  return (
    <BarChartHero
      index="category"
      data={stocksCategory}
      categories={["Estoque"]}
    />
  );
}
