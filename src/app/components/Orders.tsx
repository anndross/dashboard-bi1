"use client";
import { TableHero } from "@/components/Table";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";
import { ExportButton } from "./ExportButton";

type ordersType = { headerCells: []; rowsCells: [] };

export function Orders() {
  const { filters } = useContext(FiltersContext);

  const [orders, setOrders] = useState<ordersType>({
    headerCells: [],
    rowsCells: [],
  });

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch(
          "https://dashboard-bi1.vercel.app/api/orders",
          {
            method: "POST",
            body: JSON.stringify(filters),
          }
        );
        const { data, error } = await res.json();

        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [filters]);

  const { headerCells, rowsCells } = orders;

  return (
    <div className="w-full bg-white p-4 rounded-md border h-[100vh] border-gray-200 flex items-center flex-col justify-start col-span-full">
      <div className="w-full flex gap-8 justify-between items-center mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="uppercase text-sm text-zinc-700 font-semibold">
            pedidos
          </h2>
        </div>
        <ExportButton
          title="pedidos"
          worksheetname="tabelaPedidos"
          headerCells={headerCells}
          rowsCells={rowsCells}
        />
      </div>
      <TableHero
        heightCells="h-56"
        headerCells={headerCells}
        rowsCells={rowsCells}
      />
    </div>
  );
}
