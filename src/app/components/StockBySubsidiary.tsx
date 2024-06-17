"use client";
import { DonutChartHero } from "@/components/DonutChart";
import { Legend } from "@/components/Legend";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";

type stocksSubsidiaryType = { data: []; categories: [] };

export function StockBySubsidiary() {
  const { filters } = useContext(FiltersContext);

  const [stocksSubsidiary, setStocksSubsidiary] =
    useState<stocksSubsidiaryType>({ data: [], categories: [] });

  useEffect(() => {
    async function getData() {
      const res: any = await fetch(
        "http://localhost:3000/api/stocks-subsidiary",
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

  const { data, categories } = stocksSubsidiary;

  return (
    <div className="flex items-center justify-start w-full h-full">
      <div className="w-60">
        <DonutChartHero variant="donut" data={data} />
      </div>
      <Legend
        categories={categories}
        colors={[
          "blue",
          "cyan",
          "indigo",
          "violet",
          "fuchsia",
          "orange",
          "red",
          "pink",
          "indigo",
          "violet",
          "fuchsia",
          "orange",
          "red",
          "pink",
        ]}
      />
    </div>
  );
}
