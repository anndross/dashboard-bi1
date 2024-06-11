import { BarChartHero } from "@/components/BarChart";

async function GetStockByCategory() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_Stocks",
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

  const { results } = await fetch(
    "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
    requestOptions
  ).then((data) => data.json());

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

  return stockByCategory;
}

export async function StockByCategory() {
  const data = await GetStockByCategory();

  return <BarChartHero index="category" data={data} categories={["Estoque"]} />;
}
