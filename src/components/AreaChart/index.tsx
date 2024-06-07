"use client";
import { numberFormat } from "@/utils/NumberFormat";
import { AreaChart } from "@tremor/react";
import { useEffect } from "react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    teste: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    teste: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    teste: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    teste: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    teste: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 3129,
  },
  {
    teste: "Jul 22",
    SemiAnalysis: 3490,
    "The Pragmatic Engineer": 1982,
  },
  {
    teste: "Aug 22",
    SemiAnalysis: 2903,
    "The Pragmatic Engineer": 2012,
  },
  {
    teste: "Sep 22",
    SemiAnalysis: 2643,
    "The Pragmatic Engineer": 2342,
  },
  {
    teste: "Oct 22",
    SemiAnalysis: 2837,
    "The Pragmatic Engineer": 2473,
  },
  {
    teste: "Nov 22",
    SemiAnalysis: 2954,
    "The Pragmatic Engineer": 3848,
  },
  {
    teste: "Dec 22",
    SemiAnalysis: 3239,
    "The Pragmatic Engineer": 3736,
  },
];

export interface AreaChartHeroProps {
  data: {
    index: string;
    categories: {
      [key: string]: string | number;
    };
  }[];
  colors: string[];
}

export function AreaChartHero({
  data = chartdata,
  index,
  categories,
  colors,
}: any) {
  // const mappedData = data.map((e) => {
  //   const b = Object.entries(e);
  //   b[1] = Object.entries(b[1][1])[0];

  //   return Object.fromEntries(b);
  // });

  return (
    <AreaChart
      className="h-80"
      data={data}
      index={index}
      categories={categories}
      colors={colors}
      // valueFormatter={numberFormat}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}
