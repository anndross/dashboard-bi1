"use client";
import { numberFormat } from "@/utils/NumberFormat";
import { DonutChart, DonutChartProps } from "@tremor/react";

const datahero = [
  {
    name: "Noche Holding AG",
    value: 9800,
  },
  {
    name: "Rain Drop AG",
    value: 4567,
  },
  {
    name: "Push Rail AG",
    value: 3908,
  },
  {
    name: "Flow Steal AG",
    value: 2400,
  },
  {
    name: "Tiny Loop Inc.",
    value: 2174,
  },
  {
    name: "Anton Resorts Holding",
    value: 1398,
  },
];

interface DonutChartHeroProps extends DonutChartProps {
  data: {
    name: string;
    value: number;
  }[];
  variant: "donut" | "pie";
  onValueChange: DonutChartProps["onValueChange"];
}

export const DonutChartHero = ({
  data,
  variant,
  onValueChange,
  ...rest
}: DonutChartHeroProps) => (
  <DonutChart
    data={data}
    variant={variant}
    valueFormatter={numberFormat}
    onValueChange={onValueChange}
    {...rest}
  />
);
