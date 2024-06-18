export async function POST(request: Request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
  const body = await request.json()

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch("https://dashboard-bi1.vercel.app/api/user-data");

  const userData = await response.json();

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_Stocks",
    params: {
      CalendarYear: "2024",
      User: userData.data.user,
      ...body
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

    const res = await fetch(
      "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
      requestOptions
    ).then((data) => data.json());

    const { results } = res;

    const data = (() => {
      const allBranchsWithStock = results.reduce(
        (acc: any, currentValue: any) => {
          acc[currentValue["Área"]] =
            currentValue["Qtde Estoque"] + (acc[currentValue["Área"]] || 0);

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

      const categories = data.map((e) => e.name).filter((e) => e.length);

      return { data, categories };
    })();

    return Response.json({ data });
  } catch(err) {
    return Response.json({ error: `something went wrong: ${err}` });
  }
}