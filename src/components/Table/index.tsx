import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import Image from "next/image";
import { Badge } from "../Badge";
import { Tailwindest } from "tailwindest";
import { normalizeString } from "@/utils";

interface TableHeroProps {
  headerCells: string[];
  rowsCells: (string | number)[][];
  heightCells?: Tailwindest["height"];
}

function renderRelativeTag(element: any) {
  // Função para normalizar a string

  const mappedHealthElement = normalizeString(element);

  const mappedHealthStock: any = {
    "PARADO (+6m)": <Badge deltaType="unchanged">{mappedHealthElement}</Badge>,
    "PARADO (3-6m)": <Badge deltaType="unchanged">{mappedHealthElement}</Badge>,
    "SEM VENDA": (
      <Badge deltaType="moderateDecrease">{mappedHealthElement}</Badge>
    ),
    "FIM SUPEIOR 1 MES": (
      <Badge deltaType="moderateDecrease">{mappedHealthElement}</Badge>
    ),
    "FIM RECENTE": (
      <Badge deltaType="moderateDecrease">{mappedHealthElement}</Badge>
    ),
    SAUDÁVEL: <Badge deltaType="moderateIncrease">{mappedHealthElement}</Badge>,
  };

  // Retorna a tag correspondente, se existir
  if (typeof mappedHealthElement === "string") {
    if (mappedHealthStock[mappedHealthElement]) {
      return mappedHealthStock[mappedHealthElement];
    } else if (
      element.includes(".jpg") ||
      element.includes(".png") ||
      element.includes(".svg") ||
      element.includes(".webp") ||
      element.includes(".jpeg")
    ) {
      return <img src={element} width={100} height={100} alt="" title="" />;
    }

    return element;
  }
  return element;
}

export function TableHero({
  headerCells,
  rowsCells,
  heightCells,
}: TableHeroProps) {
  return (
    <Table className="relative w-full h-full overflow-auto">
      <TableHead>
        <TableRow>
          {headerCells.map((cell, index) => (
            <TableHeaderCell className="sticky top-0 z-10 bg-white" key={index}>
              {cell}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rowsCells.map((cells, index) => (
          <TableRow key={index}>
            {cells.map((cell, index) => (
              <TableCell
                className={`max-w-96 ${heightCells} text-wrap`}
                key={index}
              >
                {renderRelativeTag(cell)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
