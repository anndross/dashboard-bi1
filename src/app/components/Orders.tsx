"use client";
import { TableHero } from "@/components/Table";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../estoque/context";

type ordersType = { headerCells: []; rowsCells: [] };

export function Orders() {
  const { filters } = useContext(FiltersContext);

  const [orders, setOrders] = useState<ordersType>({
    headerCells: [],
    rowsCells: [],
  });

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          body: JSON.stringify(filters),
        });
        const { data, error } = await res.json();

        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [filters]);

  const { headerCells, rowsCells } = orders;

  return (
    <TableHero
      heightCells="h-56"
      headerCells={headerCells}
      rowsCells={rowsCells}
    />
  );
}
