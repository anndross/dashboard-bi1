import { DonutChartHero } from "@/components/DonutChart";
import { Legend } from "@/components/Legend";
// import { Legend } from "@/components/Legend";

async function GetStockBySubsidiary() {
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

  const res = await fetch(
    "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
    requestOptions
  ).then((data) => data.json());

  const { results } = res;

  const stockBySubsidiary = (() => {
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

    const categories = data.map((e) => e.name).filter(e => e.length);

    return { data, categories };
  })();

  return stockBySubsidiary;
}

export async function StockBySubsidiary() {
  const { data, categories } = await GetStockBySubsidiary();
  return (
    <div className="flex items-center justify-start w-full h-full">
      <div className="w-60">
        <DonutChartHero variant="donut" data={data} />
      </div>
      <Legend
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
