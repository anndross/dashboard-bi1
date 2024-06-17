"use client";
import { useContext } from "react";
import { DatePicker } from "../DatePicker";
import { SelectHero } from "../Select";
import FiltersContext from "@/app/estoque/context";
import { DateRangePickerValue } from "@tremor/react";
import { format } from "date-fns";

export function FiltersDate() {
  const { setFilters } = useContext(FiltersContext);

  function updateDate(rangeDate: DateRangePickerValue) {
    setFilters((prev: any) => ({
      ...prev,
      ...(rangeDate.from && {
        StartDate: format(rangeDate.from, "yyyy-MM-dd"),
      }),
      ...(rangeDate.to && {
        EndDate: format(rangeDate.to, "yyyy-MM-dd"),
      }),
    }));
  }

  return <DatePicker onValueChange={updateDate} />;
}
