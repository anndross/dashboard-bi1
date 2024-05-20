"use client";
import { FunnelChart } from "@tremor/react";

const chartdata = [
  { name: "opens", value: 200 },
  { name: "visitors", value: 351 },
  {
    name: "added to cart",
    value: 191,
  },
  { name: "orders", value: 10 },
];

export function FunnelChartHero() {
  return (
    <FunnelChart
      className="h-80"
      data={chartdata}
      onValueChange={(v) => console.log(v)}
    />
  );
}
