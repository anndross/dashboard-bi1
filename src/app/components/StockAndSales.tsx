"use client";
import { AreaChartHero } from "@/components/AreaChart";
import { useContext, useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import FiltersContext from "../estoque/context";

export function StockAndSales() {
  const { filters } = useContext(FiltersContext);
  console.log(`filters`, filters);

  const [salesQuantityAndStocksQuantity, setSalesQuantityAndStocksQuantity] =
    useState([]);

  useEffect(() => {
    async function getData() {
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
    }

    getData();
  }, [filters]);

  console.log(`salesQuantityAndStocksQuantity`, salesQuantityAndStocksQuantity);

  return (
    <>
      {!salesQuantityAndStocksQuantity.length ? (
        <Loading />
      ) : (
        <AreaChartHero
          data={salesQuantityAndStocksQuantity}
          categories={["Quantidade em estoque", "Quantidade de vendas"]}
          colors={["indigo", "rose"]}
          index="date"
        />
      )}
    </>
  );
}
