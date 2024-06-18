"use client";
import { BarChartHero } from "@/components/BarChart";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";

export function StockByCategory() {
  const { filters } = useContext(FiltersContext);

  const [stocksCategory, setStocksCategory] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch(
          "https://dashboard-bi1.vercel.app/api/stocks-category",
          {
            method: "POST",
            body: JSON.stringify(filters),
          }
        );
        const { data, error } = await res.json();

        if (data) {
          setStocksCategory(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [filters]);

  return (
    <BarChartHero
      index="category"
      data={stocksCategory}
      categories={["Estoque"]}
    />
  );
}
