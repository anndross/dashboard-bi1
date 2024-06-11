import { Filters } from "@/components/Filters";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { StockAndSales } from "./components/StockAndSales";
import { StockBySubsidiary } from "./components/StockBySubsidiary";
import { StockByCategory } from "./components/StockByCategory";
import { StockHealthByItem } from "./components/StockHealthByItem";
import { Orders } from "./components/Orders";

// async function getStockData() {
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   procedure: "p.SM_Dash_Stocksmov",
//   params: {
//     CalendarYear: "2024",
//   },
// });

// const requestOptions: RequestInit = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
//   cache: "no-store",
// };

// const res = await fetch(
//   "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
//   requestOptions
// );

// if (!res.ok) {
//   throw new Error("Something went wrong");
// }

// const { results } = await res.json();
// // return results;

// const today = new Date();

// const todayWithoutHors = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate()
// );

// const itemsAndStock = results.reduce((acc: any, currentValue: any) => {
//   const currentDate = parse(
//     "Thu, 06 Jun 2024 00:00:00 GMT",
//     "EEE, dd MMM yyyy HH:mm:ss 'GMT'",
//     new Date()
//   );

//   const currentDateWithoutHours = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     currentDate.getDate()
//   );

//   if (isSameDay(currentDateWithoutHours, todayWithoutHors)) {
//     acc.availableStock =
//       currentValue.Stocks_Quantity + (acc.availableStock || 0);

//     acc.items = {
//       [currentValue.Products_Code]:
//         1 + (acc.items?.[currentValue.Products_Code] || 0),
//     };

//     acc.itemsTotal = Object.values(acc.items).reduce(
//       (a: any, b: any) => a + b,
//       0
//     );
//   }
//   return acc;
// }, {});

// return;
// console.log(results);
// return results;

//   const { results } = JSON.parse(
//     readFileSync(path.resolve(process.cwd(), "src/data/stock.json"), "utf-8")
//   );

//   const salesQuantityAndStocksQuantity = (() => {
//     const salesQuantityAndStocksQuantityData = results.reduce(
//       (acc: any, currentValue: any) => {
//         acc[currentValue.Calendar_Date] = {
//           "Quantidade em estoque":
//             currentValue.Stocks_Quantity +
//             (acc[currentValue.Calendar_Date]?.["Quantidade em estoque"] || 0),
//           "Quantidade de vendas de estoque":
//             currentValue.Stocks_Sales +
//             (acc[currentValue.Calendar_Date]?.[
//               "Quantidade de vendas de estoque"
//             ] || 0),
//         };

//         return acc;
//       },
//       {}
//     );

//     const salesQuantityAndStocksQuantityEntries = Object.entries(
//       salesQuantityAndStocksQuantityData
//     );

//     const mappedData = salesQuantityAndStocksQuantityEntries.map((e: any) => {
//       return {
//         date: e[0],
//         ...e[1],
//       };
//     });

//     return mappedData;
//   })();

//   return {
//     salesQuantityAndStocksQuantity,
//   };
// }

// async function getTableData() {
//   const myHeaders = new Headers();

//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     procedure: "p.SM_Dash_OrdersItem",
//     params: {
//       CalendarYear: "2024",
//     },
//   });

//   const requestOptions: RequestInit = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//     cache: "no-store",
//   };

//   const res = await fetch(
//     "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
//     requestOptions
//   );

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   const { results } = await res.json();

//   const [headerPrototype] = results;

//   const headerCells = Object.keys(headerPrototype);

//   const rowsCells = results.map((e: any) => Object.values(e));

//   return { headerCells, rowsCells };
// }

// async function getStockTableData() {
//   const requestOptions: RequestInit = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       procedure: "p.SM_Dash_Stocks",
//       params: {
//         CalendarYear: "2024",
//       },
//     }),
//     redirect: "follow",
//     cache: "no-store",
//   };

//   const res = await fetch(
//     "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
//     requestOptions
//   );

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   const { results } = await res.json();

//   const stockByBranch = (() => {
//     const allBranchsWithStock = results.reduce(
//       (acc: any, currentValue: any) => {
//         acc[currentValue.Stores_Zone] =
//           currentValue.Stocks_Quantity + (acc[currentValue.Stores_Zone] || 0);

//         return acc;
//       },
//       {}
//     );

//     const data = Object.entries(allBranchsWithStock).map((e) => {
//       return {
//         name: e[0] as string,
//         value: e[1] as number,
//       };
//     });

//     const categories = data.map((e) => e.name);

//     return { data, categories };
//   })();

//   const stockByCategory = (() => {
//     const allCategoriesWithStock = results.reduce(
//       (acc: any, currentValue: any) => {
//         acc[currentValue.Products_Category] =
//           currentValue.Stocks_Quantity + (acc[currentValue.Calendar_Date] || 0);

//         return acc;
//       },
//       {}
//     );

//     const mappedData = Object.entries(allCategoriesWithStock).map((e) => {
//       return {
//         category: e[0] as string,
//         Estoque: e[1] as number,
//       };
//     });

//     return mappedData;
//   })();

//   const tempItems: any = {};

//   const { items, stock } = results.reduce(
//     (acc: any, currentValue: any) => {
//       acc.stock += currentValue.Stocks_Quantity;

//       tempItems[currentValue.Products_Code] =
//         1 + (tempItems[currentValue.Products_Code] || 0);

//       acc.items = Object.values(tempItems).reduce((a: any, b: any) => a + b, 0);

//       return acc;
//     },
//     {
//       items: 0,
//       stock: 0,
//     }
//   );

//   const [headerPrototype] = results;

//   const headerCells = Object.keys(headerPrototype);

//   const rowsCells = results.map((e: any) => Object.values(e));

//   return {
//     headerCells,
//     rowsCells,
//     stockByCategory,
//     stockByBranch,
//     items,
//     stock,
//   };
// }

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
        <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start">
          <Suspense fallback={<Loading />}>
            <StockAndSales />
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

        <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start max-h-96">
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

        <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start col-span-full max-h-96">
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
