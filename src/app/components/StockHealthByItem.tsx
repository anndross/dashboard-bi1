"use client";
import { TableHero } from "@/components/Table";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";
import { ExportButton } from "./ExportButton";

type stocksHealthType = { headerCells: []; rowsCells: [] };

export function StockHealthByItem() {
  const { filters } = useContext(FiltersContext);

  const [stocksSubsidiary, setStocksSubsidiary] =
    useState<stocksHealthType | null>({
      headerCells: [],
      rowsCells: [],
    });

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch(
          "https://dashboard-bi1.vercel.app/api/stocks-health",
          {
            method: "POST",
            body: JSON.stringify(filters),
          }
        );
        const { data, error } = await res.json();

        if (data) {
          setStocksSubsidiary(data);
        } else {
          setStocksSubsidiary(null);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [filters]);

  const { headerCells, rowsCells } = stocksSubsidiary || {
    headerCells: [],
    rowsCells: [],
  };

  return (
    <div className="w-full bg-white p-4 h-[100vh] rounded-md border border-gray-200 flex items-center col-span-full flex-col justify-start">
      <div className="w-full flex gap-8 justify-between items-center mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="uppercase text-sm text-zinc-700 font-semibold">
            saúde de estoque por item
          </h2>
        </div>
        <ExportButton
          title="saudeDeEstoque"
          worksheetname="tabelaSaudeDeEstoque"
          headerCells={headerCells}
          rowsCells={rowsCells}
        />
      </div>
      {stocksSubsidiary ? (
        <TableHero
          heightCells="h-56"
          headerCells={headerCells}
          rowsCells={rowsCells}
        />
      ) : (
        <p className="text-xl text-zinc-700 m-auto">
          Não há dados com base no filtro selecionado
        </p>
      )}
    </div>
  );
}
