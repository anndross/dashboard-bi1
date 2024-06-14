import { SelectHero } from "../Select";

interface FiltersSelectProps {
  options: {
    value: string;
    label: string;
  }[];
}
export function FiltersSelect({ options }: FiltersSelectProps) {
  return <SelectHero variant="multi" options={options} />;
}
