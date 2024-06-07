import { DateRangePicker } from "@tremor/react";

export function DatePicker() {
  return (
    <div className="mx-auto max-w-md space-y-3">
      {/* <p className="text-center font-mono text-sm text-slate-500">
        Date Picker
      </p>
      <DatePicker /> */}
      {/* <p className="pt-6 text-center font-mono text-sm text-slate-500">
        Date Range Picker
      </p> */}
      <DateRangePicker className="mx-auto max-w-md" />
    </div>
  );
}
