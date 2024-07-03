"use client";
import { DonutChartHero } from "@/components/DonutChart";
// import { Legend } from "@/components/Legend";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";
import { Legend } from "@tremor/react";

type stocksSubsidiaryType = { data: []; categories: [] };

export function StockBySubsidiary() {
  const { filters } = useContext(FiltersContext);

  const [stocksSubsidiary, setStocksSubsidiary] =
    useState<stocksSubsidiaryType>({ data: [], categories: [] });

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch(
          "https://dashboard-bi1.vercel.app/api/stocks-subsidiary",
          {
            method: "POST",
            body: JSON.stringify(filters),
          }
        );
        const { data, error } = await res.json();

        if (data) {
          setStocksSubsidiary(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [filters]);

  const { data, categories } = stocksSubsidiary;

  const colorsYellow = Array(10)
    .fill("yellow")
    .map((e, i, arr) => {
      if (i === arr.length - 1) {
        return `${e}-${100 * i + 50}`;
      }
      return `${e}-${100 * (i + 1)}`;
    });

  const colorsLime = Array(8)
    .fill("lime")
    .map((e, i, arr) => {
      if (i === arr.length - 1) {
        return `${e}-${100 * i + 250}`;
      }
      return `${e}-${100 * (i + 1) + 200}`;
    });

  return (
    <div className="flex items-center justify-start w-full h-full">
      <DonutChartHero
        className="w-52"
        variant="donut"
        data={data}
        colors={[...colorsYellow, ...colorsLime]}
      />
      <Legend
        className="w-full"
        categories={categories}
        colors={[...colorsYellow, ...colorsLime]}
      />
    </div>
  );
}
