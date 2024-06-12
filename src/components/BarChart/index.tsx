"use client";
import { numberFormat } from "@/utils";
import { BarChart } from "@tremor/react";

const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
  },
  {
    name: "Arachnids",
    "Number of threatened species": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
  },
];

export function BarChartHero({
  data = chartdata,
  index,
  categories,
  colors,
}: any) {
  return (
    <BarChart
      data={data}
      index={index}
      categories={categories}
      colors={colors}
      layout="vertical"
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
    />
  );
}
