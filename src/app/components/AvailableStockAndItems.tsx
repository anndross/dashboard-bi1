"use client";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";

type availableStocksType = { stock: number; items: number };
export function AvailableStockAndItems() {
  const { filters } = useContext(FiltersContext);

  const [availableStockAndItems, setAvailableStockAndItems] =
    useState<availableStocksType>({ stock: 0, items: 0 });

  useEffect(() => {
    async function getData() {
      const res: any = await fetch(
        "http://localhost:3000/api/avaliable-stock-and-items",
        {
          method: "POST",
          body: JSON.stringify(filters),
        }
      );
      const { data, error } = await res.json();

      if (data) {
        setAvailableStockAndItems(data);
      }
    }

    getData();
  }, [filters]);

  const { stock, items } = availableStockAndItems;

  return (
    <div className="w-full flex gap-8 justify-start">
      <div className="flex flex-col gap-2">
        <h2 className="uppercase text-sm text-zinc-700 font-semibold">
          Estoque disponível:
        </h2>
        <h3 className="font-bold text-2xl text-zinc-800">{stock}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase text-sm text-zinc-700 font-semibold">
          Itens:
        </h2>
        <h3 className="font-bold text-2xl text-zinc-800">{items}</h3>
      </div>
    </div>
  );
}
