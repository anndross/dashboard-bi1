import { Filters } from "@/components/Filters";

export async function FiltersOptions() {
  async function GetFiltersOptions() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      procedure: "[p].[p_Filters]",
      params: {
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

    const res = await fetch(
      "https://prd-api01.bi1analytics.com.br:5000/api/beta/procedure/exec",
      requestOptions
    ).then((data) => data.json());

    const { results } = res;

    let optionClusterIndex = -1;

    const optionsArray = results.reduce((acc: any, currentValue: any) => {
      const value = currentValue.Value.length
        ? currentValue.Value
        : "Sem valor";

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

    return optionsArray;
  }

  const optionsArray = await GetFiltersOptions();

  return (
    <>
      {/* TODO: receber outro valor na key que não seja o index */}
      {optionsArray.map((options: any, index: number) => {
        return <Filters.Select key={index} options={options} />;
      })}
    </>
  );
}
