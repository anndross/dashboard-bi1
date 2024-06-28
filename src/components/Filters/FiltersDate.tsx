"use client";
import { useContext } from "react";
import { DatePicker } from "../DatePicker";
import { SelectHero } from "../Select";
import FiltersContext from "@/app/estoque/context";
import { DateRangePickerValue } from "@tremor/react";
import { format } from "date-fns";

export function FiltersDate() {
  const { filters, setFilters } = useContext(FiltersContext);

  function updateDate(rangeDate: DateRangePickerValue) {
    const mappedRangeDate = {
      from: rangeDate.from || rangeDate.to,
      to: rangeDate.to || rangeDate.from,
    };
    console.log(`mappedRangeDate`, mappedRangeDate);

    if (!mappedRangeDate.from && !mappedRangeDate.to) {
      const filtersWithoutDate: any = filters;

      delete filtersWithoutDate.StartDate;
      delete filtersWithoutDate.EndDate;

      console.log(`filtersWithoutDate`, filtersWithoutDate);

      setFilters((prev: any) => {
        const filtersWithoutDate: any = { ...prev };

        delete filtersWithoutDate.StartDate;
        delete filtersWithoutDate.EndDate;

        return filtersWithoutDate;
      });
    } else {
      console.log(`mappedRangeDate`, mappedRangeDate);

      setFilters((prev: any) => ({
        ...prev,
        ...(mappedRangeDate.from && {
          StartDate: format(mappedRangeDate.from, "yyyy-MM-dd"),
        }),
        ...(mappedRangeDate.to && {
          EndDate: format(mappedRangeDate.to, "yyyy-MM-dd"),
        }),
      }));
    }
  }

  return (
    <div className="shrink">
      <DatePicker onValueChange={updateDate} />
    </div>
  );
}
