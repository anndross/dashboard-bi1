"use client";
import { DonutChartHero } from "@/components/DonutChart";
import { Legend } from "@/components/Legend";
import { useEffect, useState } from "react";

type stocksSubsidiaryType = { data: []; categories: [] };

export function StockBySubsidiary() {
  const [stocksSubsidiary, setStocksSubsidiary] =
    useState<stocksSubsidiaryType>({ data: [], categories: [] });

  useEffect(() => {
    async function getData() {
      const res: any = await fetch(
        "https://dashboard-bi1.vercel.app/api/stocks-subsidiary"
      );
      const { data } = await res.json();

      setStocksSubsidiary(data);
    }

    getData();
  }, []);

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
