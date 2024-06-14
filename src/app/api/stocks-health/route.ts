export async function GET() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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

  /**
   * Será utilizado como exemplar das chaves do header da tabela
   */
  const [prototype] = results;

  const headerCells = Object.keys(prototype);

  const rowsCells = results.map((product: typeof prototype) =>
    Object.values(product)
  );

  const data = { headerCells, rowsCells };

  return Response.json({ data }) 
}