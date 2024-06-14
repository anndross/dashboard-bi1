  export async function GET() {
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
    };

    const { results } = await fetch(
      "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
      requestOptions
    ).then((data) => data.json());

    const tempItems: { [productCode: number]: number } = {};

    const { items, stock } = results.reduce(
      (acc: any, currentValue: any) => {
        acc.stock += currentValue["Qtde Estoque"];

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

    const data = { items, stock };

    return Response.json({ data })
  }