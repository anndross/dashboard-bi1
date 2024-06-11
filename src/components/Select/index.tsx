import { Field, Select } from "@headlessui/react";
import {
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  // Select,
  SelectItem,
} from "@tremor/react";
import clsx from "clsx";

interface SelectHeroProps {
  variant: "select" | "search" | "multi";
  options: { value: string; label: string }[];
}

type SelectProps = Omit<SelectHeroProps, "variant">;



function SelectNormal({ options }: SelectProps) {
  return (
    <Field>
      <div className="relative">
        <Select
          defaultValue={options[0].value}
          className={clsx(
            "block w-full appearance-none rounded-lg border-0 border-none bg-white text-zinc-800",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            // Make the text of each option black on Windows
            "*:text-black"
          )}
        >
          {options.map((e) => (
            <option className="min-h-5" key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </Select>
        <i className="ri-arrow-down-s-line"></i>
      </div>
    </Field>
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
}
