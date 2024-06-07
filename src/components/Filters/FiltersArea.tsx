import { SelectHero } from "../Select";

export function FiltersArea() {
  const options = [
    { value: "Area 1", label: "Area" },
    { value: "Area 2", label: "Area 2" },
    { value: "Area 3", label: "Area 3" },
  ];
  return <SelectHero variant="select" options={options} />;
}
