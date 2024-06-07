import { AreaChartHero } from "@/components/AreaChart";
import { BarChartHero } from "@/components/BarChart";
import { DonutChartHero } from "@/components/DonutChart";
import { TableHero } from "@/components/Table";
import { Suspense } from "react";

async function getStockData() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_Stocksmov",
    params: {
      CalendarYear: "2024",
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    cache: "no-store",
  };

  const res = await fetch(
    "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const { results } = await res.json();

  const today = new Date();

  const todayWithoutHors = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

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

  const salesQuantityAndStocksQuantity = (() => {
    const salesQuantityAndStocksQuantityData = results.reduce(
      (acc: any, currentValue: any) => {
        acc[currentValue.Calendar_Date] = {
          "Quantidade em estoque":
            currentValue.Stocks_Quantity +
            (acc[currentValue.Calendar_Date]?.["Quantidade em estoque"] || 0),
          "Quantidade de vendas de estoque":
            currentValue.Stocks_Sales +
            (acc[currentValue.Calendar_Date]?.[
              "Quantidade de vendas de estoque"
            ] || 0),
        };
        return acc;
      },
      {}
    );

    const salesQuantityAndStocksQuantityEntries = Object.entries(
      salesQuantityAndStocksQuantityData
    );

    const mappedData = salesQuantityAndStocksQuantityEntries.map((e: any) => {
      return {
        date: e[0],
        ...e[1],
      };
    });

    return mappedData;
  })();

  return {
    salesQuantityAndStocksQuantity,
    // stockByBranch,
    // stockByCategory,
    // availableStock,
    // itemsTotal,
  };
}

async function getTableData() {
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_OrdersItem",
    params: {
      CalendarYear: "2024",
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    cache: "no-store",
  };

  const res = await fetch(
    "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const { results } = await res.json();

  const [headerPrototype] = results;

  const headerCells = Object.keys(headerPrototype);

  const rowsCells = results.map((e: any) => Object.values(e));

  return { headerCells, rowsCells };
}

async function getStockTableData() {
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_Stocks",
    params: {
      CalendarYear: "2024",
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    cache: "no-store",
  };

  const res = await fetch(
    "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const { results } = await res.json();

  const stockByBranch = (() => {
    const allBranchsWithStock = results.reduce(
      (acc: any, currentValue: any) => {
        acc[currentValue.Stores_Zone] =
          currentValue.Stocks_Quantity + (acc[currentValue.Stores_Zone] || 0);

        return acc;
      },
      {}
    );

    const data = Object.entries(allBranchsWithStock).map((e) => {
      return {
        name: e[0] as string,
        value: e[1] as number,
      };
    });

    const categories = data.map((e) => e.name);

    return { data, categories };
  })();

  const stockByCategory = (() => {
    const allCategoriesWithStock = results.reduce(
      (acc: any, currentValue: any) => {
        acc[currentValue.Products_Category] =
          currentValue.Stocks_Quantity + (acc[currentValue.Calendar_Date] || 0);

        return acc;
      },
      {}
    );

    const mappedData = Object.entries(allCategoriesWithStock).map((e) => {
      return {
        category: e[0] as string,
        Estoque: e[1] as number,
      };
    });

    return mappedData;
  })();

  const tempItems: any = {};

  const { items, stock } = results.reduce(
    (acc: any, currentValue: any) => {
      acc.stock += currentValue.Stocks_Quantity;

      tempItems[currentValue.Products_Code] =
        1 + (tempItems[currentValue.Products_Code] || 0);

      acc.items = Object.values(tempItems).reduce((a: any, b: any) => a + b, 0);

      return acc;
    },
    {
      items: 0,
      stock: 0,
    }
  );

  const [headerPrototype] = results;

  const headerCells = Object.keys(headerPrototype);

  const rowsCells = results.map((e: any) => Object.values(e));

  return {
    headerCells,
    rowsCells,
    stockByCategory,
    stockByBranch,
    items,
    stock,
  };
}

// async function fetchStocksMov() {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     procedure: "p.SM_Dash_Stocksmov",
//     params: {
//       CalendarYear: "2024",
//     },
//   });

//   const requestOptions: RequestInit = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
// cache: "no-store";
//     cache: "force-cache",
//   };

//   const res = await fetch(
//     "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
//     requestOptions
//   );

//   const data = await res.json();
//   return data;
// }

const LoadingFallback = () => (
  <div className="w-full h-60 flex items-center justify-center">
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

async function AreaChartHeroServer() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const [{ salesQuantityAndStocksQuantity }, { items, stock }] =
    await Promise.all([getStockData(), getStockTableData()]);

  return (
    <>
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

      <AreaChartHero
        data={salesQuantityAndStocksQuantity}
        categories={[
          "Quantidade em estoque",
          "Quantidade de vendas de estoque",
        ]}
        colors={["indigo", "rose"]}
        index="date"
      />
    </>
  );
}

const CustomLegend = ({ colors, categories }: any) => (
  <div className="flex flex-col gap-2 items-start">
    {categories.map((e: any, index: number) => {
      return (
        <div
          key={e}
          className="flex items-center justify-start gap-2 text-left"
        >
          <div
            className={`h-[6px] w-[6px] rounded-full bg-${colors[index]}-700`}
          ></div>
          <span className="text-zinc-700 text-sm whitespace-nowrap">{e}</span>
        </div>
      );
    })}
  </div>
);

async function DonutChartHeroServer() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const {
    stockByBranch: { data, categories },
  } = await getStockTableData();

  return (
    <div className="flex items-center justify-start space-x-6">
      <div className="w-60">
        <DonutChartHero variant="donut" data={data} />
      </div>
      <CustomLegend
        categories={categories}
        colors={[
          "blue",
          "cyan",
          "indigo",
          "violet",
          "fuchsia",
          "orange",
          "red",
          "pink",
          "indigo",
          "violet",
          "fuchsia",
          "orange",
          "red",
          "pink",
        ]}
      />
    </div>
  );
}

async function BarChartHeroServer() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { stockByCategory } = await getStockTableData();

  return (
    <BarChartHero
      index="category"
      data={stockByCategory}
      categories={["Estoque"]}
    />
  );
}

async function TableHeroStockServer() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { headerCells, rowsCells } = await getStockTableData();

  return <TableHero headerCells={headerCells} rowsCells={rowsCells} />;
}

async function TableHeroItemsServer() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { headerCells, rowsCells } = await getTableData();

  return <TableHero headerCells={headerCells} rowsCells={rowsCells} />;
}

export default async function Home() {
  return (
    <>
      <main className="grid lg:grid-cols-2 p-6 gap-3 grid-cols-1">
        <div className="w-full bg-white p-4 rounded-md border border-gray-200 flex items-center flex-col justify-start">
          <Suspense fallback={<LoadingFallback />}>
            <AreaChartHeroServer />
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
          <Suspense fallback={<LoadingFallback />}>
            <DonutChartHeroServer />
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
          <Suspense fallback={<LoadingFallback />}>
            <BarChartHeroServer />
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
          <Suspense fallback={<LoadingFallback />}>
            <TableHeroStockServer />
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
          <Suspense fallback={<LoadingFallback />}>
            <TableHeroItemsServer />
          </Suspense>
        </div>
      </main>
    </>
  );
}
