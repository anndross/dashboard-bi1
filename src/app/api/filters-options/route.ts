import { getUserPayload } from "../utils/getSessionPayload";

export async function GET() {

  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const user = await getUserPayload()

    const raw = JSON.stringify({
      procedure: "[p].[p_Filters]",
      params: {
        User: user!.user,
      },
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
      cache: "no-store",
    };

    const res = await fetch(
      "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
      requestOptions
    ).then((data) => data.json());

    const { results } = res;

    let optionClusterIndex = -1;

    const data = results.reduce((acc: any, currentValue: any) => {
      const value = currentValue.Value

      const mappedCurrentValue = {
        ...currentValue,
        value: value,
        label: value,
      };

      if (
        currentValue.Filter !==
        acc[optionClusterIndex]?.[acc[optionClusterIndex]?.length - 1]?.Filter
      ) {
        acc.push([mappedCurrentValue]);

        optionClusterIndex++;

        return acc;
      } else {
        acc[optionClusterIndex].push(mappedCurrentValue);

        return acc;
      }
    }, []);

    return Response.json({ data });
  } catch (err) {
    return Response.json({ error: `something went wrong: ${err}` });
  }
}