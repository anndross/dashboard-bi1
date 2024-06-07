import { SelectHero } from "../Select";

export function FiltersCategory() {
  const options = [
    { value: "categoria 1", label: "Categoria" },
    { value: "categoria 2", label: "Categoria 2" },
    { value: "categoria 3", label: "Categoria 3" },
  ];

  return <SelectHero variant="select" options={options} />;
}
