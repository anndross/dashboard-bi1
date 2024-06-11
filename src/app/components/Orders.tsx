import { TableHero } from "@/components/Table";

export async function Orders() {
  async function getOrders() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      procedure: "p.SM_Dash_OrdersItem",
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

    return { headerCells, rowsCells };
  }

  const { headerCells, rowsCells } = await getOrders();

  return <TableHero headerCells={headerCells} rowsCells={rowsCells} />;
}
