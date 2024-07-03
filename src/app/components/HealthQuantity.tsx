"use client";
import { BarList } from "@/components/BarList";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";

export function HealthQuantity() {
  const { filters } = useContext(FiltersContext);

  const [healthOccurrence, setHealthOccurrence] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch(
          "https://dashboard-bi1.vercel.app/api/health-occurrence",
          {
            method: "POST",
            body: JSON.stringify(filters),
          }
        );
        const { data, error } = await res.json();

        if (data) {
          setHealthOccurrence(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [filters]);

  return <BarList data={healthOccurrence} />;
}
