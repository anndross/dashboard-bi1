export async function GET() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    procedure: "p.SM_Dash_OrdersItem",
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

  const res = await fetch(
    "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
    requestOptions
  ).then((data) => data.json());

  const { results } = res;
  /**
   * Será utilizado como exemplar das chaves do header da tabela
   */
  const [prototype] = results;

  const headerCells = Object.keys(prototype);

  /**
   * TODO: mapear os dados que recebo e retornar formatado para esses casos
   * imagem,
   * data,
   * monetário
   */
  const rowsCells = results.map((product: typeof prototype) =>
    Object.values(product)
  );

  const data = { headerCells, rowsCells }

  return Response.json({ data })
}