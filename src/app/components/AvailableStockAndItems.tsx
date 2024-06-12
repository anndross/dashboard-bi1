export async function AvailableStockAndItems() {
  async function GetAvailableStockAndItems() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      procedure: "p.SM_Dash_Stocks",
      params: {
        CalendarYear: "2024",
        User: "5",
      },
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
      cache: "no-store",
    };

    const { results } = await fetch(
      "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
      requestOptions
    ).then((data) => data.json());

    const tempItems: { [productCode: number]: number } = {};

    const { items, stock } = results.reduce(
      (acc: any, currentValue: any) => {
        acc.stock += currentValue.Stocks_Quantity;

        tempItems[currentValue.Products_Code] =
          1 + (tempItems[currentValue.Products_Code] || 0);

        acc.items = Object.values(tempItems).reduce(
          (a: any, b: any) => a + b,
          0
        );

        return acc;
      },
      {
        items: 0,
        stock: 0,
      }
    );

    return { items, stock };
  }

  const { stock, items } = await GetAvailableStockAndItems();

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
