"use client";
import { AreaChartHero } from "@/components/AreaChart";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

export function StockAndSales() {
  const [salesQuantityAndStocksQuantity, setSalesQuantityAndStocksQuantity] =
    useState([]);

  useEffect(() => {
    async function getData() {
      const res: any = await fetch(
        "https://dashboard-bi1.vercel.app/api/stocks-mov"
      );
      const { data } = await res.json();

      setSalesQuantityAndStocksQuantity(data);
    }

    getData();
  }, []);

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
