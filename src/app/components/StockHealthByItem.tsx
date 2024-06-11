import { TableHero } from "@/components/Table";

async function getStockHealth() {
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

  /**
   * Será utilizado como exemplar das chaves do header da tabela
   */
  const [prototype] = results;

  const headerCells = Object.keys(prototype);

  const rowsCells = results.map((product: typeof prototype) =>
    Object.values(product)
  );

  return { headerCells, rowsCells };
}

export async function StockHealthByItem() {
  const { headerCells, rowsCells } = await getStockHealth();

  return <TableHero headerCells={headerCells} rowsCells={rowsCells} />;
}
