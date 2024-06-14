"use client";
import { TableHero } from "@/components/Table";
import { useEffect, useState } from "react";

type ordersType = { headerCells: []; rowsCells: [] };

export function Orders() {
  const [orders, setOrders] = useState<ordersType>({
    headerCells: [],
    rowsCells: [],
  });

  useEffect(() => {
    async function getData() {
      const res: any = await fetch("http://localhost:3000/api/orders");
      const { data } = await res.json();

      setOrders(data);
    }

    getData();
  }, []);

  const { headerCells, rowsCells } = orders;

  return (
    <TableHero
      heightCells="h-56"
      headerCells={headerCells}
      rowsCells={rowsCells}
    />
  );
}
