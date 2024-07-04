"use client";
import { Loading } from "@/components/Loading";
import { Suspense, useEffect, useState } from "react";
import { StockBySubsidiary } from "../components/StockBySubsidiary";
import { StockByCategory } from "../components/StockByCategory";
import { StockHealthByItem } from "../components/StockHealthByItem";
import { Orders } from "../components/Orders";
import { FiltersOptions } from "../components/FiltersOptions";
import { Filters } from "@/components/Filters";
import { StockAndSales } from "../components/StockAndSales";
import FiltersContext from "./context";
import { AvailableStockAndItems } from "../components/AvailableStockAndItems";
import { HealthQuantity } from "../components/HealthQuantity";

export default function StockPage() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const [filters, setFilters] = useState({});

  return (
    <>
      <FiltersContext.Provider value={{ filters, setFilters }}>
        <Filters.Root>
          <Filters.Label>filtrar por:</Filters.Label>

          <Filters.DatePicker />
          <FiltersOptions />
        </Filters.Root>
        <main className="grid lg:grid-cols-2 p-6 gap-3 grid-cols-1">
          <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex col-span-full items-center flex-col justify-start">
            <AvailableStockAndItems />

            <Suspense fallback={<Loading />}>
              <StockAndSales />
            </Suspense>
          </div>
          <div className="h-96 w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start">
            <div className="w-full flex gap-8 justify-start">
              <div className="flex flex-col gap-2">
                <h2 className="uppercase text-sm text-zinc-700 font-semibold">
                  Estoque por categoria
                </h2>
              </div>
            </div>
            <div className="w-full h-full overflow-y-scroll mt-5 pr-5">
              <Suspense fallback={<Loading />}>
                <StockByCategory />
              </Suspense>
            </div>
          </div>
          <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start">
            <div className="w-full flex gap-8 justify-start">
              <div className="flex flex-col gap-2">
                <h2 className="uppercase text-sm text-zinc-700 font-semibold">
                  Estoque por filial
                </h2>
              </div>
            </div>
            <div className="flex w-full h-full justify-between items-center gap-4">
              <Suspense fallback={<Loading />}>
                <StockBySubsidiary />
              </Suspense>

              <Suspense fallback={<Loading />}>
                <HealthQuantity />
              </Suspense>
            </div>
          </div>

          <StockHealthByItem />
          <Orders />
        </main>
      </FiltersContext.Provider>
    </>
  );
}
