import { normalizeString } from "@/utils";
import { getUserPayload } from "../utils/getSessionPayload";

export async function POST(request: Request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const initialValue = 0

  const occurrenceByStockHealth: { [key: string]: number } = {
    "PARADO (+6m)": initialValue,
    "SAUDÁVEL": initialValue,
    "SEM VENDA": initialValue,
    "ZERADO": initialValue,
    "FIM SUPEIOR 1 MES": initialValue,
    "FIM RECENTE": initialValue
  }

  try {
    const body = await request.json()

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const user = await getUserPayload()

    const raw = JSON.stringify({
      procedure: "p.SM_Dash_Stocks",
      params: {
        User: user!.user,
        ...body
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

    results.forEach((obj: any) => {
      occurrenceByStockHealth[normalizeString(obj["Saúde Estoque"])] += 1
    })

    const occurrenceByStockHealthArray = Object.keys(occurrenceByStockHealth).map(e => {
      if (body?.Stocks_Health?.length && body?.Stocks_Health.some((status: string) => e !== status)) {
        return {
          name: e,
          value: NaN
        }
      }

      return {
        name: e,
        value: occurrenceByStockHealth[e]
      }
    })

    const occurrenceByStockHealthArrayFilteredByValue = occurrenceByStockHealthArray.filter(e => {
      return (!Number.isNaN(e.value))
    })

    console.log({ occurrenceByStockHealthArray, occurrenceByStockHealthArrayFilteredByValue })

    return Response.json({ data: occurrenceByStockHealthArrayFilteredByValue })
  } catch (error) {
    return Response.json({ error })
  }
}