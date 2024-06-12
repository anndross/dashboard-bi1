import { AreaChartHero } from "@/components/AreaChart";
import { AvailableStockAndItems } from "./AvailableStockAndItems";
import { format } from "date-fns";

async function GetStockAndSales() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_Stocksmov",
    params: {
      CalendarYear: "2024",
      User: "5",
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
  ).then((data) => data.json());

  const { results } = res;

  const salesQuantityAndStocksQuantity = (() => {
    const salesQuantityAndStocksQuantityData = results.reduce(
      (acc: any, currentValue: any) => {
        acc[currentValue.Calendar_Date] = {
          "Quantidade em estoque":
            currentValue.Stocks_Quantity +
            (acc[currentValue.Calendar_Date]?.["Quantidade em estoque"] || 0),
          "Quantidade de vendas":
            currentValue.QuantitySalesDay +
            (acc[currentValue.Calendar_Date]?.["Quantidade de vendas"] || 0),
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
        date: format(new Date(e[0]), "dd/MM/yyyy"),
        ...e[1],
      };
    });

    return mappedData;
  })();

  return salesQuantityAndStocksQuantity;
}

export async function StockAndSales() {
  const salesQuantityAndStocksQuantity = await GetStockAndSales();

  return (
    <>
      <AvailableStockAndItems />
      <AreaChartHero
        data={salesQuantityAndStocksQuantity}
        categories={["Quantidade em estoque", "Quantidade de vendas"]}
        colors={["indigo", "rose"]}
        index="date"
      />
    </>
  );
}
