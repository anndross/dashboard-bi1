"use client";
import { AreaChartHero } from "@/components/AreaChart";
import { useContext, useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import FiltersContext from "../estoque/context";

export function StockAndSales() {
  const { filters } = useContext(FiltersContext);

  const [salesQuantityAndStocksQuantity, setSalesQuantityAndStocksQuantity] =
    useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch(
          "https://dashboard-bi1.vercel.app/api/stocks-mov",
          {
            method: "POST",
            body: JSON.stringify(filters),
          }
        );
        const { data, error } = await res.json();

        if (data) {
          setSalesQuantityAndStocksQuantity(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log(`filters`, filters);
    getData();
  }, [filters]);
  console.log(`filters 1`, filters);

  return (
    <>
      {!salesQuantityAndStocksQuantity.length ? (
        <Loading />
      ) : (
        <AreaChartHero
          data={salesQuantityAndStocksQuantity}
          categories={["Quantidade em estoque", "Quantidade de vendas"]}
          colors={["yellow-500", "yellow-700"]}
          index="date"
        />
      )}
    </>
  );
}
