import { Filters } from "@/components/Filters";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { StockAndSales } from "../components/StockAndSales";
import { StockBySubsidiary } from "../components/StockBySubsidiary";
import { StockByCategory } from "../components/StockByCategory";
import { StockHealthByItem } from "../components/StockHealthByItem";
import { Orders } from "../components/Orders";

export default async function HomePage() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  return (
    <>
      <div className="w-full h-12 bg-white px-10 flex items-center justify-end">
        <Filters.Root>
          <Filters.Label>filtrar por:</Filters.Label>

          <Filters.Date />
          <Filters.Product />
          <Filters.Area />
          <Filters.Category />
        </Filters.Root>
      </div>

      <main className="grid lg:grid-cols-2 p-6 gap-3 grid-cols-1">
        <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex col-span-full items-center flex-col justify-start">
          <Suspense fallback={<Loading />}>
            <StockAndSales />
          </Suspense>
        </div>

        <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start">
          <div className="w-full flex gap-8 justify-start">
            <div className="flex flex-col gap-2">
              <h2 className="uppercase text-sm text-zinc-700 font-semibold">
                Estoque por categoria
              </h2>
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <StockByCategory />
          </Suspense>
        </div>
        <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start">
          <div className="w-full flex gap-8 justify-start">
            <div className="flex flex-col gap-2">
              <h2 className="uppercase text-sm text-zinc-700 font-semibold">
                Estoque por filial
              </h2>
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <StockBySubsidiary />
          </Suspense>
        </div>

        <div className="w-full bg-white p-4 h-[100vh] rounded-md border border-gray-200 flex items-center col-span-full flex-col justify-start">
          <div className="w-full flex gap-8 justify-start">
            <div className="flex flex-col gap-2">
              <h2 className="uppercase text-sm text-zinc-700 font-semibold">
                saúde de estoque por item
              </h2>
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <StockHealthByItem />
          </Suspense>
        </div>

        <div className="w-full bg-white p-4 rounded-md border h-[100vh] border-gray-200 flex items-center flex-col justify-start col-span-full">
          <div className="w-full flex gap-8 justify-start">
            <div className="flex flex-col gap-2">
              <h2 className="uppercase text-sm text-zinc-700 font-semibold">
                pedidos
              </h2>
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <Orders />
          </Suspense>
        </div>
      </main>
    </>
  );
}
