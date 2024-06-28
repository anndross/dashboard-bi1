"use client";
import {
  DateRangePicker as DatePickerComponent,
  DateRangePickerProps,
} from "@tremor/react";

export function DatePicker({ ...props }: DateRangePickerProps) {
  return (
    <DatePickerComponent
      placeholder="Selecione uma data"
      selectPlaceholder="Período"
      {...props}
    />
  );
}
