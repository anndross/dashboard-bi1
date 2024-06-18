export async function POST(request: Request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const body = await request.json()

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch("https://dashboard-bi1.vercel.app/api/user-data");

  const { data } = await response.json();

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_Stocks",
    params: {
      CalendarYear: "2024",
      User: data.user,
      ...body
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };

  try {
    const { results } = await fetch(
      "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
      requestOptions
    ).then((data) => data.json());

    const data = (() => {
      const allCategoriesWithStock = results.reduce(
        (acc: any, currentValue: any) => {
          acc[currentValue["Categoria"]] =
            currentValue["Qtde Estoque"] +
            (acc[currentValue["Últ. Pedido"]] || 0);

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



    return Response.json({ data });

  } catch(err) {
    return Response.json({ error: `something went wrong: ${err}` })
  }
}