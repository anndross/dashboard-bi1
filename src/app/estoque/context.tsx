"use client";
import { createContext } from "react";

const FiltersContext = createContext({
  filters: [],
  setFilters: (filters: any) => {},
});

export default FiltersContext;
