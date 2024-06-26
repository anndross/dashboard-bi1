"use client";
import { Field, Select } from "@headlessui/react";
import {
  MultiSelect,
  MultiSelectItem,
  MultiSelectProps,
  SearchSelect,
  SearchSelectItem,
  SearchSelectProps,
  // Select,
  SelectItem,
} from "@tremor/react";
import clsx from "clsx";
import { forwardRef, useEffect, useRef, useState } from "react";

interface SelectHeroProps {
  variant: "select" | "search" | "multi";
  options: { value: string; label: string }[];
  defaultValue?: string | string[];
  onValueChange?: () => void;
  value?: string | string[];
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

interface SelectSearchProps extends Omit<SearchSelectProps, "children"> {
  options: {
    value: string;
    label: string;
    DisplayName?: string;
  }[];
}

export const SelectSearch = forwardRef<HTMLDivElement, SelectSearchProps>(
  (props, ref) => {
    const [paginatedOptions, setPaginatedOptions] = useState(
      props.options.slice(0, 10)
    );

    const sentinelRef = useRef<HTMLDivElement>(null);

    // const sentinelRef = useRef<HTMLDivElement>(null);

    // console.log(`sentinelRef`, sentinelRef, props.options, paginatedOptions);

    // useEffect(() => {
    //   const observer = new IntersectionObserver((entries) => {
    //     console.log(entries);
    //   });

    //   if (sentinelRef.current) observer.observe(sentinelRef.current);
    // }, [sentinelRef]);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        console.log(entries);
      });

      if (sentinelRef.current) {
        observer.observe(sentinelRef.current);
        console.log("sentinel", sentinelRef);
      }
    }, [sentinelRef]);

    return (
      <SearchSelect {...props} className="w-48">
        {paginatedOptions.map((e, i) => (
          <SearchSelectItem key={e.value} value={e.value}>
            {e.label}
            {i === paginatedOptions.length - 1 && <div ref={sentinelRef} />}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    );
  }
);

SelectSearch.displayName = "SelectSearch";

interface SelectMultiProps extends Omit<MultiSelectProps, "children"> {
  options: {
    value: string;
    label: string;
    DisplayName?: string;
  }[];
}

export function SelectMulti({ options, ...props }: SelectMultiProps) {
  const [paginatedOptions, setPaginatedOptions] = useState(
    options.slice(0, 10)
  );

  return (
    <MultiSelect {...props} className="w-48">
      {paginatedOptions.map((e) => (
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
