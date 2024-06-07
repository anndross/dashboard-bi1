import { SelectHero } from "../Select";

export function FiltersProduct() {
  const options = [
    { value: "produto 1", label: "Produto" },
    { value: "produto 2", label: "Produto 2" },
    { value: "produto 3", label: "Produto 3" },
  ];

  return <SelectHero options={options} variant="select" />;
}
