"use client";
import {
  DateRangePicker as DatePickerComponent,
  DateRangePickerProps,
} from "@tremor/react";

export function DatePicker({ ...props }: DateRangePickerProps) {
  return (
    <div className="max-w-60">
      <DatePickerComponent
        placeholder="Selecione uma data"
        selectPlaceholder="Período"
        defaultValue={{ from: new Date(), to: new Date() }}
        {...props}
      />
    </div>
  );
}
