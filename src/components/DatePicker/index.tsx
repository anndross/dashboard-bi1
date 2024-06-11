'use client';
import { DateRangePicker as DatePickerComponent } from "@tremor/react";

export function DatePicker() {
  return (
    <div className="max-w-60">
      <DatePickerComponent
        placeholder="Selecione uma data"
        selectPlaceholder="Período"
        defaultValue={{ from: new Date(), to: new Date() }}
        onValueChange={(e) => console.log(e)}
      />
    </div>
  );
}
