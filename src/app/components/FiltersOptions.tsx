"use client";
import { Filters } from "@/components/Filters";
import { useContext, useEffect, useRef, useState } from "react";
import FiltersContext from "../estoque/context";
import { SelectHero, SelectMulti, SelectSearch } from "@/components/Select";
import ReactSelect from "react-select";

export function FiltersOptions() {
  const { filters, setFilters } = useContext(FiltersContext);

  const [optionsArray, setOptionsArray] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch(
          "https://dashboard-bi1.vercel.app/api/filters-options"
        );
        const { data, error } = await res.json();

        if (data) {
          setOptionsArray(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  return (
    <>
      {optionsArray.map((options: any, index: number) => (
        <div className="shrink w-48" key={index}>
          <ReactSelect
            isMulti
            onChange={(values) => {
              const mappedColumnWithValues = {
                [options[0].Column]: values.map((e: any) => e.value),
              };

              if (!values.length) {
                console.log(`values no tiene length`);
                setFilters((prev: any) => {
                  const filtersWithoutColumn: any = { ...prev };

                  delete filtersWithoutColumn[options[0].Column];

                  return filtersWithoutColumn;
                });
                console.log(`values no tiene length`, filters);
              } else {
                setFilters((prev: any) => ({
                  ...prev,
                  ...mappedColumnWithValues,
                }));
              }
            }}
            options={options}
            placeholder={options[0].DisplayName}
          />

          {/* <SelectMulti
            onValueChange={(values) => {
              const mappedColumnWithValues = {
                [options[0].Column]: values,
              };

              if (!values.length) {
                console.log(`values no tiene length`);
                setFilters((prev: any) => {
                  const filtersWithoutColumn: any = { ...prev };

                  delete filtersWithoutColumn[options[0].Column];

                  return filtersWithoutColumn;
                });
                console.log(`values no tiene length`, filters);
              } else {
                setFilters((prev: any) => ({
                  ...prev,
                  ...mappedColumnWithValues,
                }));
              }
            }}
            options={options}
            placeholder={options[0].DisplayName}
          /> */}
        </div>
      ))}
    </>
  );
}

// onValueChange={(selectedOption) => {
//   if (selectedOption.length) {
//     const mappedSelectedOption = {
//       [options[0].Column]: [
//         ...(filters[options[0].Column] ?? []),
//         selectedOption,
//       ],
//     };

//     setFilters((prev: any) => ({
//       ...prev,
//       ...mappedSelectedOption,
//     }));
//   } else {
//     const filtersWithoutColumn: any = filters;

//     delete filtersWithoutColumn[options[0].Column];

//     setFilters(filtersWithoutColumn);
//   }
// }}
