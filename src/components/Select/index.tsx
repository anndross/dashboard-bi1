import {
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";

interface SelectHeroProps {
  variant: "select" | "search" | "multi";
  options: { value: string; label: string }[];
}

type SelectProps = Omit<SelectHeroProps, "variant">;

function SelectNormal({ options }: SelectProps) {
  return (
    <Select defaultValue={options[0].value}>
      {options.map((e) => (
        <SelectItem key={e.value} value={e.value}>
          {e.label}
        </SelectItem>
      ))}
    </Select>
  );
}

function SelectSearch({ options }: SelectProps) {
  return (
    <SearchSelect defaultValue={options[0].value}>
      {options.map((e) => (
        <SearchSelectItem key={e.value} value={e.value}>
          {e.label}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
}

function SelectMulti({ options }: SelectProps) {
  return (
    <MultiSelect defaultValue={[options[0].value]}>
      {options.map((e) => (
        <MultiSelectItem key={e.value} value={e.value}>
          {e.label}
        </MultiSelectItem>
      ))}
    </MultiSelect>
  );
}

export function SelectHero({ variant = "select", options }: SelectHeroProps) {
  const mappedComponents = {
    select: <SelectNormal options={options} />,
    search: <SelectSearch options={options} />,
    multi: <SelectMulti options={options} />,
  };

  return mappedComponents[variant];

  return (
    <div className="mx-auto max-w-xs">
      <div className="mb-4 text-center font-mono text-sm text-slate-500">
        Select
      </div>
      <Select defaultValue="1">
        <SelectItem value="1">Option One</SelectItem>
        <SelectItem value="2">Option Two</SelectItem>
        <SelectItem value="3">Option Three</SelectItem>
      </Select>

      <div className="mb-4 mt-8 text-center font-mono text-sm text-slate-500">
        SearchSelect
      </div>
      <SearchSelect>
        <SearchSelectItem value="1">Option 1</SearchSelectItem>
        <SearchSelectItem value="2">Option 2</SearchSelectItem>
        <SearchSelectItem value="3">Option 3</SearchSelectItem>
      </SearchSelect>

      <div className="mb-4 mt-8 text-center font-mono text-sm text-slate-500">
        MultiSelect
      </div>
      <MultiSelect>
        <MultiSelectItem value="1">Option 1</MultiSelectItem>
        <MultiSelectItem value="2">Option 2</MultiSelectItem>
        <MultiSelectItem value="3">Option 3</MultiSelectItem>
      </MultiSelect>
    </div>
  );
}
