"use client";
import { Filters } from "@/components/Filters";
import { useContext, useEffect, useRef, useState } from "react";
import FiltersContext from "../estoque/context";
import { SelectHero, SelectSearch } from "@/components/Select";

export function FiltersOptions() {
  const { filters, setFilters } = useContext(FiltersContext);

  const [optionsArray, setOptionsArray] = useState([]);

  useEffect(() => {
    async function getData() {
      const res: any = await fetch(
        "https://dashboard-bi1.vercel.app/api/filters-options"
      );
      const { data, error } = await res.json();

      if (data) {
        setOptionsArray(data);
      }
    }

    getData();
  }, []);

  return (
    <>
      {optionsArray.map((options: any, index: number) => (
        <SelectSearch
          options={options}
          onValueChange={(selectedOption) => {
            if (selectedOption.length) {
              const mappedSelectedOption = {
                [options[0].Column]: selectedOption,
              };

              setFilters((prev: any) => ({
                ...prev,
                ...mappedSelectedOption,
              }));
            } else {
              const filtersWithoutColumn: any = filters;

              delete filtersWithoutColumn[options[0].Column];

              setFilters(filtersWithoutColumn);
            }
          }}
          key={index}
          placeholder={options[0].DisplayName}
          defaultValue={localStorage.getItem(options[0].Column) ?? ""}
        />
      ))}
    </>
  );
}
